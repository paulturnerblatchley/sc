/**
 * Gives its element focus
 ***/
app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }
});

/**
 * Creates an array of image objects for the uploadFile() function
 ************************/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var isMultiple = attrs.multiple;
          var modelSetter = model.assign;
          element.bind('change', function(){
            var img = [];
            angular.forEach(element[0].files, function (item) {
                var value = {
                    lastModified: item.lastModified,
                    name: item.name,
                    size: item.size,
                    type: item.type,
                    img: item
                };
                img.push(value);
            });
             scope.$apply(function(){
                if (isMultiple) {
                    modelSetter(scope, img);
                } else {
                    modelSetter(scope, img[0]);
                }
             });
          });
       }
    };
 }]);

/**
 * Checks if two given passwords match
 ***/
 app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);

/**
 * Allows the angular formatter to be used on input tags
 ***/
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue, "$", 0);
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber, "$", 0));
                return plainNumber;
            });
        }
    };
}]);

/**
 * Allows control over right click menu for element from scope
 ***/
app.directive('ngRightClick', ["$compile","$parse","$timeout", function($compile, $parse,$timeout) {
  return {
    restrict: 'A',
    controller: [
    '$scope',
    '$element',
    function ($scope,$element){
        // prevents default right click menu
        $scope.removeRightClickMenu = function(e){
          if(e !== undefined){
              e.stopPropagation();
              e.preventDefault();
          }
          var ul = document.querySelector(".ng-right-click-ul");
          var mask = document.querySelector(".ng-right-click-mask");
          ul.parentNode.removeChild(ul);
          mask.parentNode.removeChild(mask);
        }
      }
    ],
    link: function($scope,element,attrs) {
      // Reference to the container element
      var $this = angular.element(element)[0];
      $scope.$menuItems = $scope.$eval(attrs.menuItems);

      element.bind('contextmenu', function(event) {
        $scope.$apply(function() {
          event.preventDefault();

          if(attrs.ngRightClick !== undefined){
            var fn = $parse(attrs.ngRightClick);
            fn($scope, {$event:event});
          }

          //set the position to right-clicked parent as relative, so that if there is context menu, that becomes a child
          $this.style.position = "relative";

          //create a mask that should prevent any unwanted clicks on page, while menu is open
          var menuMask = "<div class='ng-right-click-mask' ng-click='removeRightClickMenu($event)'></div>";
          menuMask = angular.element(menuMask);

          //remove existing menus
          if(document.querySelector(".ng-right-click-ul") !== null){
            $scope.removeRightClickMenu();
          }

          //If user has provided right-click menu, render it
          if ($scope.$menuItems !== undefined) {
            //create a menu structure
            var menuItemsUL = "<ul class='ng-right-click-ul' style='visibility:hidden'></ul>";
            menuItemsUL = angular.element(menuItemsUL);

            //add custom class if supplied
            if(attrs.menuClass !== undefined){
                menuItemsUL.addClass(attrs.menuClass);
            }

            //create list elements from supplied list items
            var menuItemsLI = '<li ng-repeat="item in $menuItems" ng-click="item.callback();removeRightClickMenu($event)" ng-class="item.disabled? \'disabled\':\'\'">{{item.text}}</li>';
            menuItemsLI = angular.element(menuItemsLI);

            //Push LI element to UL menu.
            menuItemsUL.append(menuItemsLI);

            //set element offset right next to the clicked area
            var offsetX = event.screenX;
            var offsetY = element[0].offsetHeight;
            $timeout(function(){
              //if(element[0].offsetWidth < (event.screenX + menuItemsUL[0].offsetWidth) )
                  //offsetX = element[0].offsetWidth - (menuItemsUL[0].offsetWidth+20);
                  //menuItemsUL[0].style.left=offsetX+"px";

              //if(document.body.scrollHeight < (event.screenY + menuItemsUL[0].offsetHeight) )
                //offsetY = -(menuItemsUL[0].offsetHeight+20);
              //menuItemsUL[0].style.top=offsetY+"px";

              //Fixed the Position of Context Menu
              menuItemsUL[0].style.left=event.clientX + 'px';
              menuItemsUL[0].style.top=event.clientY + 'px';
              menuItemsUL[0].style.position='fixed';
              menuItemsUL[0].style.display='block';

              //show the element now that its width and height are properly calculated.
              menuItemsUL[0].style.visibility="visible";

              //Finally compile and make it angular friendly!
              $compile(element.contents())($scope);
            },10);

            //append mask and menu to our clicked parent
            element.append(menuMask);
            element.append(menuItemsUL);
          }
        });
      });
    }
  }
}]);

/**
 * Allows target elements contents to toggle display
 ***/
app.directive('toggle', function() {
    return {
      restrict: 'A',
      link: function(scope,element,attrs) {

        // function to run
        function toggleIt () {
          var t = "#" + attrs.target,
              e = element[0];
          if ($(t).hasClass("collapse")) {
            $(t).removeClass("collapse");
            $(e).removeClass("flip");
          } else {
            $(t).addClass("collapse");
            $(e).addClass("flip");
          }
        }

        // Run toggleIt function when directive's element is clicked
        element.on("click", toggleIt);

      }
    }
});
