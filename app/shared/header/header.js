app.component(
    'appHeader', 
    {
    	bindings: {},
        templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/shared/header/headerAdmin.html'
            // Partner
            else if (r == '2') return 'app/shared/header/headerPartner.html'
            // Contractor
            else if (r == '3') return 'app/shared/header/headerContractor.html'
            // Agent
            else if (r == '4') return 'app/shared/header/headerAgent.html'
            // Guest
            else               return 'app/shared/header/headerGuest.html'   
        },
        controller: function($scope, $rootScope,  $state, auth, $sessionStorage) {
            $scope.user = $sessionStorage.user;
            $scope.hideMenu = function() {
                var nav = document.getElementById("navbar");
                if (nav.className == "navbar-collapse collapse") {
                    nav.className = "navbar-collapse collapse in";
                } else {
                    nav.className = "navbar-collapse collapse";
                }
            };

            $scope.logout = function () {
                auth.get('logout').then(function (results) {
                    auth.toast(results);
                    $sessionStorage.user = {};
                    $sessionStorage.user.user_role = 0;
                    $state.go('login', {}, {reload: true});
                });
            };
        }
    }
); 