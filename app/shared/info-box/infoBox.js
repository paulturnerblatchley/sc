app.component(
	'infoBox', 
	{
		bindings: {},
	    template: '<ng-include src="template"></ng-include>',
	    controller: function($scope, $rootScope, properties, $state, bids) {

	    	$scope.template = 'app/shared/info-box/infoBoxDefault.html'
	    	$scope.properties = properties.properties;
	    	$scope.bids = bids.openBids;
	    	
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

	        $scope.viewBidDetails = function(bid) {
        		$state.go('properties.property.bids.open-bid', {bid_id: bid});
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
		            ibs.addClass("flip");
		            propMap.css("max-width", "100%");
		        } else {
		            ib.show();
		            setTimeout(function() {
		            	ib.css("right", "0");
		                ibs.css("right", infoBoxWidth);
		                ibs.removeClass("flip");
		                propMap.css("max-width", "70%");
		            },100);
		        }
		    }

		    $scope.linkToBid = function(bid) {
		    	$rootScope.addInfo = {};
	        	$state.go('properties.property.bids', {pid: bid.bid_pid});
		    }

		    $scope.linkToSingle = function(property) {
		    	if (property.phase == "Purchase") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	} else if (property.phase == "Relocation") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	} else if (property.phase == "Eviction") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	} else if (property.phase == "Plan Check") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	} else if (property.phase == "Rehab") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.rehab', {pid: property.pid});
		    	} else if (property.phase == "Listed") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.listing', {pid: property.pid});
		    	} else if (property.phase == "Hold") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	} else if (property.phase == "Escrow") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property.escrow', {pid: property.pid});
		    	} else if (property.phase == "Sold") {
		    		$rootScope.addInfo = {};
		        	$state.go('properties.property', {pid: property.pid});
		    	}
		    };
	    }
	}
); 