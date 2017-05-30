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
			    for ( i in $scope.tableData) {
			        $scope.tableData[i]["#"] = parseInt(i) + 1;
			    }

			    if($state.current.name == "properties") {
			        setTimeout( function() {
			            var scrollTop     = $(window).scrollTop(),
			                elementOffset = $(".home-table").offset().top,
			                distance      = (elementOffset - scrollTop);
			                space         = window.innerHeight - distance;
			            $(".home-table").css("height", space + "px");
			            $("#grid1").css("height", space + "px");
			            $(".ui-grid-render-container").css("height", space + "px");
			            $(".ui-grid-viewport").css("height", space - 25 + "px");
			        }, 200);
			    }

			    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
			        if( col.filters[0].term ){
			            return 'header-filtered';
			        } else {
			            return '';
			        }
			    };
			    
			    // set columns based on user settings
			    if ($sessionStorage.user.settings) {
			        for (i in $sessionStorage.user.settings[0]) {
			        	$sessionStorage.user.settings[0][i] = ($sessionStorage.user.settings[0][i] == "0" ? false : true);
			        }

			        $scope.columns = [
			            { field: '#', displayName: '#', visible: $sessionStorage.user.settings[0]["#"], type: 'number', width: '3%', enableFiltering: false}, 
			            { field: 'pid', displayName: 'PID', visible: $sessionStorage.user.settings[0]["pid"], type: 'number', width: '4%', enableFiltering: false, cellTemplate: '<div id="row{{grid.getCellValue(row, col)}}" class="ui-grid-cell-contents {{grid.getCellValue(row, col)}}" >{{grid.getCellValue(row, col)}}</div>'  }, 
			            { field: 'phase', displayName: 'Phase', visible: $sessionStorage.user.settings[0]["phase"], cellTemplate: '<div class="ui-grid-cell-contents {{grid.getCellValue(row, col)}}" >{{grid.getCellValue(row, col)}}</div>', width: '8%',
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
	            { field: 'fha', displayName: 'FHA', visible: $sessionStorage.user.settings[0]["fha"], type: 'date', width: '6%', enableFiltering: true}, 
	            { field: 'dsp', displayName: 'DSP', visible: $sessionStorage.user.settings[0]["dsp"], type: 'number', width: '6%', enableFiltering: true}, 
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
			            { field: 'address', displayName: 'Address', visible: $sessionStorage.user.settings[0]["address"], width: '12%', headerCellClass: $scope.highlightFilteredHeader }, 
			            { field: 'city', displayName: 'City', visible: $sessionStorage.user.settings[0]["city"], width: '10%' }, 
			            { field: 'zip', displayName: 'ZIP', visible: $sessionStorage.user.settings[0]["zip"] }, 
			            { field: 'county', displayName: 'CO.', visible: $sessionStorage.user.settings[0]["county"], width: '3%' }, 
			            { field: 'sqft', displayName: 'SQFT', visible: $sessionStorage.user.settings[0]["sqft"], type: 'number', width: '4%' }, 
			            { field: 'lotsize', displayName: 'Lot', visible: $sessionStorage.user.settings[0]["lotsize"], type: 'number', width: '5%'}, 
			            { field: 'beds', displayName: 'BD', visible: $sessionStorage.user.settings[0]["beds"], width: '3%'  }, 
			            { field: 'baths', displayName: 'BA', visible: $sessionStorage.user.settings[0]["baths"], displayName: 'BA', width: '3%'  }, 
			            { field: 'year_built', displayName: 'Year', visible: $sessionStorage.user.settings[0]["year_built"], width: '4%' }, 
			            { field: 'pool_spa', displayName: 'Pool/Spa', visible: $sessionStorage.user.settings[0]["pool_spa"], width: '5%' }, 
			            { field: 'occupancy', displayName: 'Occ.', visible: $sessionStorage.user.settings[0]["occupancy"] }, 
			            { field: 'lockbox_combo', displayName: 'Lockbox', visible: $sessionStorage.user.settings[0]["lockbox_combo"] }, 
			            { field: 'alarm_code', displayName: 'Alarm', visible: $sessionStorage.user.settings[0]["alarm_code"]}, 
			            { field: 'asset_manager', displayName: 'Manager', visible: $sessionStorage.user.settings[0]["asset_manager"] }
			        ];  
			        
			        
			        $scope.gridOptions = {
			            data: $scope.tableData,
			            enableSorting: true,
			            enableFiltering: false,
			            enableColumnMenus: false,
			            multiSelect: false,
			            enableRowSelection: true,
			            columnDefs: $scope.columns,
			            enableRowHeaderSelection: false,
			            rowTemplate: '<div ng-dblclick="grid.appScope.linkToSingle(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>',
			            onRegisterApi: function(gridApi) {
			                $scope.gridApi = gridApi;

			                // Setup events so we're notified when grid state changes.
			                $scope.gridApi.colMovable.on.columnPositionChanged($scope, saveState);
			                $scope.gridApi.colResizable.on.columnSizeChanged($scope, saveState);
			                $scope.gridApi.core.on.columnVisibilityChanged($scope, saveState);
			                $scope.gridApi.core.on.filterChanged($scope, saveState);
			                $scope.gridApi.core.on.sortChanged($scope, saveState);

			                // Restore previously saved state.

			                restoreState();

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
			                        
			                        $rootScope.mymap.markers["pin" + pid].setAnimation(google.maps.Animation.BOUNCE);

			                        if (!row.isSelected) {
			                            $rootScope.mymap.setZoom(8);
			                            $rootScope.mymap.setCenter({lat: 34.26, lng: -117.30587750000001});
			                            ib.css("right", "-" + infoBoxWidth);
			                            ibs.addClass("flip");
			                            ibs.css("right", "0");
			                            map.css("max-width", "100%");
			                            $rootScope.mymap.markers["pin" + pid].setAnimation(null);
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

			        function saveState() {
			            var state = $scope.gridApi.saveState.save();
			            state.selection = [];
			            localStorageService.set('gridState', state);
			        };

			        function restoreState() {
			            if (localStorageService.get('gridState')) {
			               
			              $timeout(function() {
			                var state = localStorageService.get('gridState');
			                for (i in state.columns) {
			                    state.columns[i].visible = $scope.columns[i].visible;
			                }
			                if (state) $scope.gridApi.saveState.restore($scope, state);
			              });
			            }
			        };

			    } // endif rootScope.user.settings

			    $scope.linkToSingle = function(row) {
			    	var pid = row.entity.pid;
			        $rootScope.addInfo = {};
			    	if (row.entity.phase == "Bid") {
			    		$state.go('properties.property.bids', {pid: pid});
			    	} else if (row.entity.phase == "Rehab") {
			    		$state.go('properties.property.rehab', {pid: pid});
			    	} else if (row.entity.phase == "Listed") {
			    		$state.go('properties.property.listing', {pid: pid});
			    	} else if (row.entity.phase == "Escrow") {
			    		$state.go('properties.property.escrow', {pid: pid});
			    	} else {
			    		$state.go('properties.property.dashboard', {pid: pid});
			    	}
			        
			    };

			    $scope.toggleFiltering = function(){
			        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
			        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
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
			}
        }
	}
);