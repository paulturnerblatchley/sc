app.component(
	'bids', 
	{
		bindings: {},
	    templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Bids/bids/bidsAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Bids/bids/bidsPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Bids/bids/bidsContractor.html'
			// Default
            else               return 'app/components/User/login/login.html'
        },
	    controller: function($scope, $rootScope, $state, singleproperty, bids) {
        	$scope.s = singleproperty.property;
        	$scope.open = bids.openBids;
            $scope.submitted = bids.submittedBids;

        	$scope.viewBidDetails = function(bid) {
        		$state.go('properties.property.bids.open-bid', {bid_id: bid});
        	}

            $scope.newBid = function(pid) {
                $state.go('properties.property.bids.new-bid', {pid: pid});
            }
	    }
	}
); 