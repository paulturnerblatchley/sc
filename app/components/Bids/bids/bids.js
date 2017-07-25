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
            $scope.rehab_total = 0;

            for (var i = 0; i < $scope.open.length; i++) {
                $scope.rehab_total += parseInt($scope.open[i].bid_total_cost);
            }
            
        	$scope.viewBidDetails = function(pid,num) {
        		$state.go('properties.property.open-bid', {pid: pid,bid_num: num}, {reload: true});
        	}

            $scope.newBid = function(pid) {
                $state.go('properties.property.new-bid', {pid: pid}, {reload: true});
            }
	    }
	}
); 