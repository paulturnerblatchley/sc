app.component(
    'login',
    {
    	bindings: {
    		user: '='
    	},
        templateUrl: 'app/components/User/login/login.html',
        controller: function($scope, $state, auth, $rootScope, $sessionStorage) {
            $scope.login = {};
          	$scope.doLogin = function () {
    		        auth.post('login', {
    		            user: $scope.user
    		        }).then(function (results) {
                        $sessionStorage.user = results;
    		            auth.toast(results);
    		            if (results.status == "success") {
    		                $state.go('properties', {}, {reload: true});
    		            }
    		        });
    		    };

            $("body").css("height", window.innerHeight);
            $(".login-area").css("height", window.innerHeight - 30);
        }
    }
);
