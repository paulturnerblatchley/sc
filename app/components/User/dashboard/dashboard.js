app.component(
	'dashboard',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/User/dashboard/dashboardAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/User/dashboard/dashboardPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/User/dashboard/dashboardContractor.html'
            // Agent
            else if (r == '4') return 'app/components/User/dashboard/dashboardAgent.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, $rootScope, auth, uiGridConstants, $sessionStorage, $state, proforma) {
        	$scope.user = $sessionStorage.user;
            $scope.hideColumn = function(col,uid) {
            	console.log(col);
	            var change = {};
	            change.uid = uid;
	            change.field = col.field;
	            if (col.visible) {
	                change.visible = 1;
	            } else {
	                change.visible = 0;
	            }
	            
	            auth.post('changeSettings', {
	                change: change
	            }).then(function (results) {
	            	auth.get("session").then(function(res) {
	            		$sessionStorage.user.settings = res.settings;
	            	})
	            });
	        };

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
			            { field: 'asset_manager', displayName: 'Manager', visible: $sessionStorage.user.settings[0]["asset_manager"] },
			            { field: 'supervisor', displayName: 'Supervisor', visible: $sessionStorage.user.settings[0]["supervisor"] },
			            { field: 'permits', displayName: 'Permits', visible: $sessionStorage.user.settings[0]["permits"] },
			            { field: 'purchase_cost', displayName: 'Purchase Price', visible: $sessionStorage.user.settings[0]["purchase_cost"] },
			            { field: 'rehab_estimate', displayName: 'Rehab Estimate', visible: $sessionStorage.user.settings[0]["rehab_estimate"] },
			            { field: 'arv', displayName: 'ARV', visible: $sessionStorage.user.settings[0]["arv"] },
			            { field: 'estimated_completion', displayName: 'Est. Completion', type: 'date', visible: $sessionStorage.user.settings[0]["estimated_completion"] },
			            { field: 'est_possession', displayName: 'Est. Poss.', visible: $sessionStorage.user.settings[0]["est_possession"] }
			        ];  
            
            $scope.logout = function () {
                auth.get('logout').then(function (results) {
                    auth.toast(results);
                    $sessionStorage.user = {};
                    $sessionStorage.user.user_role = 0;
                    $state.go('login');
                });
            };

            $scope.prodef = proforma.defaults;

            for (i in $scope.prodef) {
            	var temp = $scope.prodef[i];
            	delete $scope.prodef[i];
            	i = i.replace(/_/g, " ");
            	$scope.prodef[i] = temp;
            }

            $scope.changeProformaDefault = function(k,v) {
            	var change = {};
            	change.column = k.replace(/[ ]/g, "_");
            	change.value = v;
            	auth.post('changeProformaDefaults', {
            		change: change
            	}).then(function(results) {
            		// Do Nothing
            	})
            }
        }
	}
); 