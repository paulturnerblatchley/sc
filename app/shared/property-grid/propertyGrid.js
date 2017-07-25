app.component(
	'propertyGrid',
	{
    	bindings: {
    		tableData: '<'
    	},
        templateUrl: 'app/shared/property-grid/propertyGrid.html',
        controller: function($scope, $rootScope, $state, $location, properties, uiGridConstants, localStorageService, $timeout, $sessionStorage) {
        	this.$onInit = function() {
        		$scope.tableData = this.tableData;

        		for (i = 0; i < $scope.tableData.length; i++) {
        			$scope.tableData[i]["#"] = i + 1;
        		}

        		// FUNCTIONS
        		function setGridHeight() {
        			setTimeout( function() {
			            var scrollTop     = $(window).scrollTop(),
			                elementOffset = $(".home-table").offset().top,
			                distance      = (elementOffset - scrollTop);
			                space         = window.innerHeight - distance;
			            $(".home-table").css("height", space + "px");
			            $("#grid1").css("height", space + "px");
			            $(".ui-grid-render-container").css("height", space + "px");
			            $(".ui-grid-viewport").css("height", space - 25 + "px");
			        }, 100);
        		}

        		$scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
			        if( col.filters[0].term ){
			            return 'header-filtered';
			        } else {
			            return '';
			        }
			    };

			    function numberAfterSort() {
		        	setTimeout(function() {
		        		var rows = $scope.gridApi.core.getVisibleRows();
		        		for (i = 0; i < rows.length; i++) {
		        			rows[i].entity["#"] = i + 1;
		        		}
	        		}, 50);
		        };

		        function saveState() {
		            var state = $scope.gridApi.saveState.save();
		            state.selection = [];
		            for (i = 0; i < state.columns.length; i++) {
		            	state.columns[i].filters = [];
		            	state.columns[i].visible = true;
		            }
		            
		            localStorageService.set('gridState', state);
		        };

		        function restoreState() {
		            if (localStorageService.get('gridState')) {
		              $timeout(function() {
		                var state = localStorageService.get('gridState');
		                if (state) {
		                	for (i = 0; i < state.columns.length; i++) {
		                		for(j = 0; j < $scope.columns.length; j++) {
		                			if ($scope.columns[j].name === state.columns[i].name) {
		                				state.columns[i].visible = $scope.columns[j].visible;
		                			}
		                		}
			                }
			                $scope.gridApi.saveState.restore($scope, state);
		                }
		              });
		            }
		        };

		        $scope.linkToSingle = function(row) {
			    	var pid = row.entity.pid;
			        $rootScope.addInfo = {};
			    	if (row.entity.phase == "Bid") {
			    		$state.go('properties.property.bids', {pid: pid});
			    	} else if (row.entity.phase == "Rehab") {
			    		$state.go('properties.property.rehab', {pid: pid});
			    	} else if (row.entity.phase == "Listed") {
			    		$state.go('properties.property.listing', {pid: pid});
			    	} else if (row.entity.phase == "Sale Escrow") {
			    		$state.go('properties.property.escrow', {pid: pid});
			    	} else {
			    		$state.go('properties.property.dashboard', {pid: pid});
			    	}
			    };

			    $scope.linkToOffer = function(row) {
			    	var pid = row.entity.pid;
			    	$rootScope.addInfo = {};
			    	$state.go("listings.agent-offer", {pid: pid});
			    }

			    $scope.toggleFiltering = function(){
			        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
			        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
			        var map     =  $(".property-viewer ng-map");
			        if ($scope.gridOptions.enableFiltering) {
			            setTimeout( function() {
			                var scrollTop     =  $(window).scrollTop(),
			                    elementOffset =  $(".home-table").offset().top,
			                    distance      =  (elementOffset - scrollTop),
			                    space         =  window.innerHeight - distance;
			            }, 200);
			            if (map.css("max-height") == "0px") {
			            	// Do Nothing
			            } else {
			            	$(".ui-grid-viewport").css("height", space - 50 + "px");
			            }
			        } else {
			            setTimeout( function() {
			                var scrollTop     =  $(window).scrollTop(),
			                    elementOffset =  $(".home-table").offset().top,
			                    distance      =  (elementOffset - scrollTop),
			                    space         =  window.innerHeight - distance;
			            }, 200);
			            if (map.css("max-height") == "0px") {
			            	// Do Nothing
			            } else {
			            	$(".ui-grid-viewport").css("height", space - 25 + "px");
			            }
			        }
			    };

			    $scope.isAdmin = function() {
			    	if($sessionStorage.user.user_role == 1) {
			    		return true
			    	} else {
			    		return false
			    	}
			    }

			    /* == sort functions == */
			    function phaseSorter(a, b) {
			    	if( a === b ) return 0;
		            if( a === 'Acquisition' ) return -1; 
		            if( b === 'Acquisition' ) return 1; 
		            if( a === 'Holdover' ) return -2; 
		            if( b === 'Holdover' ) return 2; 
		            if( a === 'Rehab' ) return -3; 
		            if( b === 'Rehab' ) return 3; 
		            if( a === 'Listed' ) return -4; 
		            if( b === 'Listed' ) return 4; 
		            if( a === 'Sale Escrow' ) return -5; 
		            if( b === 'Sale Escrow' ) return 5; 
		            if( a === 'Sold' ) return -6; 
		            if( b === 'Sold' ) return 6; 
		            if( a === 'Withdrawn' ) return -7; 
		            if( b === 'Withdrawn' ) return 7;
		            return 0;
			    }

			    function addressSorter(a, b) {
			    	var space_a = a.indexOf(" ");
			    	a = a.slice(space_a);
			    	if (a.indexOf("N ") !== -1 || 
			    		a.indexOf("S ") !== -1 || 
			    		a.indexOf("E ") !== -1 || 
			    		a.indexOf("W ") !== -1 ) {
			    		a = a.slice(2,a.length - 1);
			    	} else if (a.indexOf("N. ") !== -1 || 
			    		a.indexOf("S. ") !== -1 || 
			    		a.indexOf("E. ") !== -1 || 
			    		a.indexOf("W. ") !== -1 ) {
						a = a.slice(3,a.length - 1);
			    	}

			    	var space_b = b.indexOf(" ");
			    	b = b.slice(space_b);
			    	if (b.indexOf("N ") !== -1 || 
			    		b.indexOf("S ") !== -1 || 
			    		b.indexOf("E ") !== -1 || 
			    		b.indexOf("W ") !== -1 ) {
			    		b = b.slice(2,b.length - 1);
			    	} else if (b.indexOf("N. ") !== -1 || 
			    		b.indexOf("S. ") !== -1 || 
			    		b.indexOf("E. ") !== -1 || 
			    		b.indexOf("W. ") !== -1 ) {
						b = b.slice(3,b.length - 1);
			    	}
			    	
			    	if (a === b) return 0;
			    	if (a < b) return -1;
			    	if (a > b) return 1;
			    	return 0;
			    }
			    // END FUNCTIONS


        		// set grid height based on page height
		        setGridHeight();
		        
			    // reset grid height on window resize
			    $(window).bind('resize', function() {
			       setGridHeight();
			    });
			    
			    // set columns based on user settings
			    if ($sessionStorage.user.settings) {
			        for (i in $sessionStorage.user.settings[0]) {
			        	$sessionStorage.user.settings[0][i] = ($sessionStorage.user.settings[0][i] == "0" ? false : true);
			        }

			        $scope.rowTemplate = '<div ng-dblclick="grid.appScope.linkToSingle(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
			        $scope.rowHeight = 22;

			        $scope.columns = [
			            { field: '#', displayName: '#', visible: $sessionStorage.user.settings[0]["#"], type: 'number', width: '3%', enableFiltering: false}, 
			            { field: 'pid', displayName: 'PID', visible: $sessionStorage.user.settings[0]["pid"], type: 'number', width: '4%', enableFiltering: false, cellTemplate: '<div id="row{{grid.getCellValue(row, col)}}" class="ui-grid-cell-contents {{grid.getCellValue(row, col)}}" >{{grid.getCellValue(row, col)}}</div>'  }, 
			            { field: 'address', displayName: 'Address', visible: $sessionStorage.user.settings[0]["address"], width: '12%', headerCellClass: $scope.highlightFilteredHeader, sortingAlgorithm: addressSorter },
			            { field: 'phase', displayName: 'Phase', visible: $sessionStorage.user.settings[0]["phase"], sortingAlgorithm: phaseSorter, cellTemplate: '<div class="ui-grid-cell-contents {{grid.getCellValue(row, col)}}" >{{grid.getCellValue(row, col)}}</div>', width: '8%',
			                filter: {
			                    type: uiGridConstants.filter.SELECT,
			                    selectOptions: [ 
			                        { value: 'Acquisition', label: 'Acquisition' }, 
			                        { value: 'Holdover', label: 'Holdover' }, 
			                        { value: 'Rehab', label: 'Rehab' }, 
			                        { value: 'Listed', label: 'Listed' },
			                        { value: 'Sale Escrow', label: 'Sale Escrow' },
			                        { value: 'Sold', label: 'Sold' },
			                        { value: 'Withdrawn', label: 'Withdrawn' },
			                    ]
			            }, headerCellClass: $scope.highlightFilteredHeader }, 
			            { field: 'status', displayName: 'Status', visible: $sessionStorage.user.settings[0]["status"],
			                filter: {
			                    type: uiGridConstants.filter.SELECT,
			                    selectOptions: [ 
			                        { value: 'Active', label: 'Active' }, 
			                        { value: 'Hold', label: 'Hold' }, 
			                        { value: 'Closed', label: 'Closed'},
			                        { value: 'Contract', label: 'Contract' }, 
			                        { value: 'Purchased', label: 'Purchased' }, 
			                        { value: 'Relocation', label: 'Relocation'},
			                        { value: 'Eviction', label: 'Eviction' }, 
			                        { value: '$-4-Keys', label: '$-4-Keys' }, 
			                        { value: 'Architectural', label: 'Architectural'},
			                        { value: 'Plan Check', label: 'Plan Check' }, 
			                        { value: 'Bid', label: 'Bid' }
			                    ]
			            }, headerCellClass: $scope.highlightFilteredHeader },
		        		{ field: 'purchase_close_date', displayName: 'Purchase Date', visible: $sessionStorage.user.settings[0]["purchase_close_date"], type: 'date', width: '6%', enableFiltering: true}, 
		        		{ field: 'est_completion', displayName: 'Est. Completion', type: 'date', visible: $sessionStorage.user.settings[0]["est_completion"] },
			            { field: 'est_possession', displayName: 'Est. Poss.', type: 'date', visible: $sessionStorage.user.settings[0]["est_possession"] },
		        		{ field: 'fha', displayName: 'FHA', visible: $sessionStorage.user.settings[0]["fha"], type: 'date', width: '6%', enableFiltering: true}, 
		        		{ field: 'dsp', displayName: 'DSP', visible: $sessionStorage.user.settings[0]["dsp"], type: 'number', width: '6%', enableFiltering: true}, 
			            { field: 'purchase_cost', displayName: 'Purchase Price', visible: $sessionStorage.user.settings[0]["purchase_cost"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},
				        { field: 'lender', displayName: 'Lender', visible: $sessionStorage.user.settings[0]["lender"] },
			            { field: 'loan_amount', displayName: 'Loan Amount', visible: $sessionStorage.user.settings[0]["loan_amount"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},
			            { field: 'rehab_estimate', displayName: 'Rehab Estimate', visible: $sessionStorage.user.settings[0]["rehab_estimate"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
					        ]},
			            { field: 'arv', displayName: 'ARV', visible: $sessionStorage.user.settings[0]["arv"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},
			            { field: 'list_price', displayName: 'Listing Price', visible: $sessionStorage.user.settings[0]["list_price"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
					        ]},
			            { field: 'sale_price', displayName: 'Sale Price', visible: $sessionStorage.user.settings[0]["sale_price"], 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(/[$, ]/g,"");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},	
			            { field: 'property_type', displayName: 'Type', visible: $sessionStorage.user.settings[0]["property_type"],
			                filter: {
			                    type: uiGridConstants.filter.SELECT,
			                    selectOptions: [ 
			                        { value: 'SFR', label: 'SFR' }, 
			                        { value: 'Condo', label: 'Condo' }, 
			                        { value: 'Duplex', label: 'Duplex'}, 
			                        { value: 'Triplex', label: 'Triplex' }, 
			                        { value: 'Fourplex', label: 'Fourplex' }, 
			                        { value: 'MFR', label: 'MFR' } 
			                    ]
			            }, headerCellClass: $scope.highlightFilteredHeader},
			            { field: 'city', displayName: 'City', visible: $sessionStorage.user.settings[0]["city"], width: '10%' }, 
			            { field: 'zip', displayName: 'ZIP', visible: $sessionStorage.user.settings[0]["zip"] }, 
			            { field: 'county', displayName: 'CO.', visible: $sessionStorage.user.settings[0]["county"], width: '3%' }, 
			            { field: 'occupancy', displayName: 'Occ.', visible: $sessionStorage.user.settings[0]["occupancy"] },  
			            { field: 'lockbox_combo', displayName: 'Lockbox', visible: $sessionStorage.user.settings[0]["lockbox_combo"] }, 
			            { field: 'alarm_code', displayName: 'Alarm', visible: $sessionStorage.user.settings[0]["alarm_code"]}, 
			            { field: 'supervisor', displayName: 'Supervisor', visible: $sessionStorage.user.settings[0]["supervisor"] },
			            { field: 'asset_manager', displayName: 'Manager', visible: $sessionStorage.user.settings[0]["asset_manager"] },
			            { field: 'permits', displayName: 'Permits', visible: $sessionStorage.user.settings[0]["permits"] },
			            { field: 'sqft', displayName: 'SQFT', visible: $sessionStorage.user.settings[0]["sqft"], width: '4%', 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(",","");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(",","");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},
			            { field: 'beds', displayName: 'BD', visible: $sessionStorage.user.settings[0]["beds"], width: '3%', 
			            	filters: [
						        {condition: uiGridConstants.filter.GREATER_THAN, placeholder: '>' },
						        {condition: uiGridConstants.filter.LESS_THAN, placeholder: '<'}
					        ]},
			            { field: 'baths', displayName: 'BA', visible: $sessionStorage.user.settings[0]["baths"], displayName: 'BA', width: '3%', 
			            	filters: [
						        {condition: uiGridConstants.filter.GREATER_THAN, placeholder: '>' },
						        {condition: uiGridConstants.filter.LESS_THAN, placeholder: '<'}
					        ]},
			            { field: 'year_built', displayName: 'Year', visible: $sessionStorage.user.settings[0]["year_built"], width: '4%' }, 
			            { field: 'lotsize', displayName: 'Lot', visible: $sessionStorage.user.settings[0]["lotsize"], width: '5%', 
			            	filters: [
						        {condition: function(term, value){
						        	value = value.replace(",","");
								   if(!term) return true;
								   return parseInt(value) > parseInt(term);
								}, placeholder: '>' },
						        {condition: function(term, value){
						        	value = value.replace(",","");
								   if(!term) return true;
								   return parseInt(value) < parseInt(term);
								}, placeholder: '<'}
				        ]},
			            { field: 'pool_spa', displayName: 'Pool/Spa', visible: $sessionStorage.user.settings[0]["pool_spa"], width: '5%' }      	
			        ];   
			    } else {

			    	$scope.rowTemplate = '<div ng-dblclick="grid.appScope.linkToOffer(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
			    	$scope.rowHeight = 30;

			    	$scope.columns = [
			            { field: '#', displayName: '#', visible: true, width: '*'}, 
			            { field: 'list_price', displayName: 'Price', visible: true, width: '*'},
			            { field: 'property_type', displayName: 'Type', visible: true, width: '*'},
			            { field: 'address', displayName: 'Address', visible: true, width: '*'}, 
			            { field: 'city', displayName: 'City', visible: true, width: '*'}, 
			            { field: 'zip', displayName: 'ZIP', visible: true, width: '*' }, 
			            { field: 'county', displayName: 'CO.', visible: true, width: '*' }, 
			            { field: 'sqft', displayName: 'SQFT', visible: true, width: '*' }, 
			            { field: 'lotsize', displayName: 'Lot', visible: true, width: '*' }, 
			            { field: 'beds', displayName: 'BD', visible: true , }, 
			            { field: 'baths', displayName: 'BA', visible: true, width: '*' }, 
			            { field: 'year_built', displayName: 'Year', visible: true, width: '*' }, 
			            { field: 'pool_spa', displayName: 'Pool/Spa', visible: true, width: '*'}
		            ]; 
			    }


		        // init grid with set options
		        $scope.gridOptions = {
		            data: $scope.tableData,
		            rowHeight: $scope.rowHeight,
		            enableSorting: true,
		            enableFiltering: false,
		            enableColumnMenus: false,
		            multiSelect: false,
		            enableRowSelection: true,
		            columnDefs: $scope.columns,
		            enableRowHeaderSelection: false,
		            excessRows: 999,
		            rowTemplate: $scope.rowTemplate,
		            onRegisterApi: function(gridApi) {
		                $scope.gridApi = gridApi;

		                // Setup events so we're notified when grid state changes.
		                $scope.gridApi.colMovable.on.columnPositionChanged($scope, saveState);
		                $scope.gridApi.colResizable.on.columnSizeChanged($scope, saveState);
		                $scope.gridApi.core.on.filterChanged($scope, numberAfterSort);
		                $scope.gridApi.core.on.sortChanged($scope, function() {
		                	numberAfterSort();
		                	saveState();
		                });

		                // Restore previously saved state.
		                restoreState();

		                // function for row single click
		                gridApi.selection.on.rowSelectionChanged($scope,function(row){
		                    $(".ui-grid-row").removeClass("ui-grid-row-selected");
		                    if ($scope.clicked) {
		                        $scope.cancelClick = true;
		                        return;
		                    }

		                    $scope.clicked = true;
		                    var pid = row.entity.pid;
		                    $rootScope.$broadcast('addInfo', pid);
		                    $timeout(function () {
		                        if ($scope.cancelClick) {
		                            $scope.cancelClick = false;
		                            $scope.clicked = false;
		                            return;
		                        }


		                        var latlng = row.entity.latlng,
		                            latlng = latlng.split(","),
		                            lat = parseFloat(latlng[0]),
		                            lng = parseFloat(latlng[1]) + .035,
		                            infoBoxWidth = $("#info-box").css("width"),
		                            ib = $("#info-box"),
		                            ibs = $("#info-box-switch"),
		                            map = $(".property-viewer ng-map");

		                        $rootScope.mymap.setCenter({lat: lat, lng: lng});
		                        $rootScope.mymap.setZoom(13);

		                        for (i in $rootScope.mymap.markers) {
		                            $rootScope.mymap.markers[i].setAnimation(null);
		                        }
		                        
		                        if ($rootScope.mymap.markers["pin" + pid]) {
		                        	$rootScope.mymap.markers["pin" + pid].setAnimation(google.maps.Animation.BOUNCE);
		                        }

		                        if (!row.isSelected) {
		                            $rootScope.mymap.setZoom(8);
		                            $rootScope.mymap.setCenter({lat: 34.26, lng: -117.30587750000001});
		                            ib.css("right", "-" + infoBoxWidth);
		                            ibs.addClass("flip");
		                            ibs.css("right", "0");
		                            map.css("max-width", "100%");
		                            if ($rootScope.mymap.markers["pin" + pid]) {
			                        	$rootScope.mymap.markers["pin" + pid].setAnimation(null);
			                        }
		                            setTimeout(function() {
		                                ib.hide();
		                                $rootScope.addInfo = {};
		                            }, 300);
		                        } else {
		                            ib.show();
		                            setTimeout(function() {
		                                ib.css("right", "0");
		                                ibs.css("right", infoBoxWidth);
		                                ibs.removeClass("flip");
		                                map.css("max-width", "70%");
		                            }, 200);
		                        }

		                        //clean up
		                        $scope.cancelClick = false;
		                        $scope.clicked = false;
		                    }, 200);
		                });
		            }
		        };
			}
        }
	}
);