app.component(
	'viewListing',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/view-listing/viewListingAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Listings/view-listing/viewListingPartner.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, $state) {
        	$scope.s = singleproperty.property;

            $scope.newOffer = function() {
                $state.go("listings.new-offer", {pid: $scope.s.pid});
            }

            $scope.seeOffers = function() {
                $state.go("listings.offers", {pid: $scope.s.pid});
            }
    
        }
	}
); 