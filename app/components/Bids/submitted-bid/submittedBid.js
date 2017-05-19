app.component(
	'submittedBid', 
	{
		bindings: {},
	    templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Bids/submitted-bid/submittedBidAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Bids/submitted-bid/submittedBidPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Bids/submitted-bid/submittedBidContractor.html'
			// Default
            else               return 'app/components/User/login/login.html'
        },
	    controller: function($scope, $rootScope, singleproperty, bids) {
        	$scope.s = singleproperty.property;
        	$scope.bids = bids.bids;
	    }
	}
); 