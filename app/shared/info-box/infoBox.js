app.component(
	'infoBox',
	{
		bindings: {},
	    template: '<ng-include src="template"></ng-include>',
	    controller: function($scope, $rootScope, properties, $state, bids, $sessionStorage, rehab) {

	    	$scope.template = 'app/shared/info-box/infoBoxDefault.html'
	    	$scope.properties = properties.properties;
	    	$scope.rehabs = rehab.rehabs;

	    	for (i = 0; i < $scope.properties.length; i++) {
	    		for (j = 0; j < $scope.rehabs.length; j++) {
	    			if( $scope.properties[i].pid == $scope.rehabs[j].pid) {
	    				for (k in $scope.rehabs[j]) {
	    					if (k.indexOf("_actual_cost") !== -1) {
			                $scope.rehabs[j].accrued_costs = parseInt($scope.rehabs[j].accrued_costs);
			                $scope.rehabs[j].accrued_costs += parseInt($scope.rehabs[j][k]);
			              }
			          }
	    				$scope.properties[i].rehab_accrued = $scope.rehabs[j].accrued_costs;
	    			}
	    		}
	    	}

	    	// Get Selected Property
	    	$rootScope.$on('addInfo', function (event, data) {
			    $scope.addInfo = data;
			    // Set Template Based on Phase
			    for (i = 0; i < $scope.properties.length; i++){
			      if($scope.properties[i].pid == data) {
			      	var phase = $scope.properties[i].phase;
			        // Aquisition
		            if (phase == 'Acquisition') {
		            	$scope.template = 'app/shared/info-box/infoBoxAcquisition.html'
		            // Holdover
		            } else if (phase == 'Holdover') {
		            	$scope.template = 'app/shared/info-box/infoBoxHoldover.html'
	            	// Rehab
		            } else if (phase == 'Rehab') {
		            	$scope.template = 'app/shared/info-box/infoBoxRehab.html'
	            	// Listed
		            } else if (phase == 'Listed') {
		            	$scope.template = 'app/shared/info-box/infoBoxListing.html'
	            	// Escrow
		            } else if (phase == 'Sale Escrow') {
		            	$scope.template = 'app/shared/info-box/infoBoxEscrow.html'
								// Sold
		            } else if (phase == 'Sold') {
		            	$scope.template = 'app/shared/info-box/infoBoxSold.html'
	            	// Default
		            } else if (phase == 'Withdrawn') {
		            	$scope.template = 'app/shared/info-box/infoBoxWithdrawn.html'
	            	// Default
		            } else  {
		            	$scope.template = 'app/shared/info-box/infoBoxDefault.html'
			      	}
			      }
			    }
			});

			$scope.isAdmin = function() {
				return ($sessionStorage.user.user_role == 1) ? true : false;
			}

      $scope.toggleInfoBox = function() {

        var ib      	 = $('#info-box'),
        	infoBoxWidth = ib.css("width"),
      		ibs     	 = $('#info-box-switch'),
      		propMap 	 = $('.property-viewer ng-map');

        if (ib.css("display") == "block") {
            setTimeout(function() {
                ib.hide();
            }, 500);
            ib.css("right", "-" + infoBoxWidth);
            ibs.css("right", "0");
            ibs.addClass("spin");
            propMap.css("max-width", "100%");
        } else {
            ib.show();
            setTimeout(function() {
            	ib.css("right", "0");
                ibs.css("right", infoBoxWidth);
                ibs.removeClass("spin");
                propMap.css("max-width", "70%");
            },100);
        }
	    }

	    $scope.linkToSingle = function(property) {
				property.address = property.address.replace(/ /g, "-");
				var paramsObj = {pid: property.pid, address: property.address};
	    	if ($sessionStorage.user.user_role == 1) {
    			if (property.phase == "Acquisition") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.dashboard', paramsObj);
		    	} else if (property.phase == "Holdover") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.dashboard', paramsObj);
		    	} else if (property.phase == "Rehab") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.rehab', paramsObj);
		    	} else if (property.phase == "Listed") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.listing', paramsObj);
		    	} else if (property.phase == "Hold") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.dashboard', paramsObj);
		    	} else if (property.phase == "Sale Escrow") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.escrow', paramsObj);
		    	} else if (property.phase == "Sold") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.dashboard', paramsObj);
		    	} else {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.dashboard', paramsObj);
		    	}
	    	} else if ($sessionStorage.user.user_role == 0) {
	    		if (property.phase == "Listed") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.agent-offer', {pid: property.pid});
		    	}
	    	}
	    };

    }
	}
);
