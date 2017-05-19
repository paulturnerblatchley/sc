app.component(
	'openBid', 
	{
		bindings: {},
	    templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Bids/open-bid/openBidAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Bids/open-bid/openBidPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Bids/open-bid/openBidContractor.html'
			// Default
            else               return 'app/components/User/login/login.html'
        },
	    controller: function($scope, $rootScope, $state, singleproperty, bids) {
        	$scope.s = singleproperty.property;
            $scope.b = bids.singleOpenBid;
	    }
	}
);