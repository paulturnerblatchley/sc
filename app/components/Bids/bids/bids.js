/**
 * This component file controls the bids view in the property dashboard page
 * ../bids
 **/
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
	    controller: function($scope, $state, singleproperty, bids) {
					// get property info
		    	$scope.s = singleproperty.property;

					// get all open bids for property
		    	$scope.open = bids.openBids;

					// set rehab total cost to 0
		      $scope.rehab_total = 0;

					// calculate the total rehab cost by adding the total cost of each bid
		      for (var i = 0; i < $scope.open.length; i++) {
		          $scope.rehab_total += parseInt($scope.open[i].bid_total_cost);
		      }
	    }
	}
);
