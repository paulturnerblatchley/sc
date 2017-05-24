app.component(
	'offers',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/offers/offersAdmin.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma, offers) {
        	$scope.s = singleproperty.property;

            $scope.proforma = proforma.proforma;
            $scope.proDefaults = proforma.defaults;
            $scope.offers = offers.offers;
            console.log($scope.offers);

            if ($scope.proforma.length) {
               for (i = 0; i < $scope.proforma.length; i++) {
                    if($scope.proforma[i].pid == $scope.s.pid) {
                        $scope.proforma.commission  = $scope.proforma[i].commission;
                    } else {
                        $scope.proforma.commission = $scope.proDefaults.commission;
                    }
                } 
            } else {
                $scope.proforma.commission = $scope.proDefaults.commission;
            }
        }
	}
); 