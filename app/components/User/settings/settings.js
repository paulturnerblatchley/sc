app.component(
	'settings',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/User/settings/settingsAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/User/settings/settingsPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/User/settings/settingsContractor.html'
            // Agent
            else if (r == '4') return 'app/components/User/settings/settingsAgent.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, $rootScope, auth, uiGridConstants, $sessionStorage, $state, proforma, partners, tasks, sections) {
        	// get user information
        	$scope.user = $sessionStorage.user;

        	// get proforma defaults
        	$scope.prodef = proforma.defaults;
          delete $scope.prodef["id"];

          for (i in $scope.prodef) {
          	var temp = $scope.prodef[i];
          	delete $scope.prodef[i];
          	i = i.replace(/_/g, " ");
          	$scope.prodef[i] = temp;
          }

          // get partners
          $scope.lenders = partners.lenders;
          $scope.entity_vesting = partners.entity_vesting;
          $scope.supervisors = partners.supervisors;
          $scope.asset_managers = partners.asset_managers;

          // get tasks
          $scope.tasks = tasks.tasks;
          $scope.sections = sections.sections;

      		// FUNCTIONS
          $scope.hideColumn = function(col,uid) {
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

          $scope.addPartner = function(table,column,value) {
          	var partner = {};
          	partner.table = table;
          	partner.column = column;
          	partner.value = value;
          	auth.post('addPartner', {
          		partner: partner
          	}).then(function(results) {
          		if (column == 'lender') {
          			$("#lender").val("");
          			$scope[table].push({'lender':value});
          		} else if (column == 'entity') {
          			$("#entity").val("");
          			$scope[table].push({'entity':value});
          		} else if (column == 'supervisor') {
          			$("#supervisor").val("");
          			$scope[table].push({'supervisor':value});
          		} else if (column == 'manager') {
          			$("#manager").val("");
          			$scope[table].push({'manager':value});
          		} else if (column == 'name') {
                      $("#section").val("");
                      $scope[table].push({'name':value});
                  }
          	})
          }

          $scope.delete = function(obj) {
          	var item = {};
          	for(i in obj) {
          		if (i === "lender") {
          			item.table = 'lenders';
          			item.column = i;
          			item.value = obj[i];
          		} else if (i === "entity") {
          			item.table = 'entity_vesting';
          			item.column = i;
          			item.value = obj[i];
          		} else if (i === "supervisor") {
          			item.table = 'supervisors';
          			item.column = i;
          			item.value = obj[i];
          		} else if (i === "manager") {
          			item.table = 'asset_managers';
          			item.column = i;
          			item.value = obj[i];
          		} else if (i === "name") {
                      item.table = 'sections';
                      item.column = i;
                      item.value = obj[i];
                  }  else if (i === "task_name") {
                      item.table = 'tasks';
                      item.column = i;
                      item.value = obj[i];
                  }
          	}
          	auth.post('deleteItem', {
          		item: item
          	}).then(function(results) {
          		var index = $scope[item.table].indexOf(item.value);
          		$scope[item.table].splice(index,1);
          	})
          }

          $scope.addTask = function(task) {
              auth.post('addTask', {
                  task: task
              }).then(function(results) {
                  $scope.tasks.push(task);
                  auth.toast(results);
              });
          }

					$scope.logout = function () {
              auth.get('logout').then(function (results) {
                  auth.toast(results);
                  $sessionStorage.user = {};
                  $sessionStorage.user.user_role = 0;
                  $state.go('login', {}, {reload: true});
              });
          };
          // END FUNCTIONS

			    for (i in $sessionStorage.user.settings[0]) {
		        	$sessionStorage.user.settings[0][i] = ($sessionStorage.user.settings[0][i] == "0" ? false : true);
		        }

			    $scope.columns = [
		            { field: '#', displayName: '#', visible: $sessionStorage.user.settings[0]["#"]},
		            { field: 'pid', displayName: 'PID', visible: $sessionStorage.user.settings[0]["pid"]},
		            { field: 'phase', displayName: 'Phase', visible: $sessionStorage.user.settings[0]["phase"]},
		            { field: 'status', displayName: 'Status', visible: $sessionStorage.user.settings[0]["status"]},
	        			{ field: 'fha', displayName: 'FHA', visible: $sessionStorage.user.settings[0]["fha"]},
	        			{ field: 'dsp', displayName: 'DSP', visible: $sessionStorage.user.settings[0]["dsp"]},
		            { field: 'property_type', displayName: 'Type', visible: $sessionStorage.user.settings[0]["property_type"]},
		            { field: 'address', displayName: 'Address', visible: $sessionStorage.user.settings[0]["address"] },
		            { field: 'city', displayName: 'City', visible: $sessionStorage.user.settings[0]["city"]},
		            { field: 'zip', displayName: 'ZIP', visible: $sessionStorage.user.settings[0]["zip"] },
		            { field: 'county', displayName: 'CO.', visible: $sessionStorage.user.settings[0]["county"]},
		            { field: 'sqft', displayName: 'SQFT', visible: $sessionStorage.user.settings[0]["sqft"]},
		            { field: 'lotsize', displayName: 'Lot', visible: $sessionStorage.user.settings[0]["lotsize"]},
		            { field: 'beds', displayName: 'BD', visible: $sessionStorage.user.settings[0]["beds"] },
		            { field: 'baths', displayName: 'BA', visible: $sessionStorage.user.settings[0]["baths"]},
		            { field: 'year_built', displayName: 'Year', visible: $sessionStorage.user.settings[0]["year_built"]},
		            { field: 'pool_spa', displayName: 'Pool/Spa', visible: $sessionStorage.user.settings[0]["pool_spa"]},
		            { field: 'occupancy', displayName: 'Occ.', visible: $sessionStorage.user.settings[0]["occupancy"] },
		            { field: 'lockbox_combo', displayName: 'Lockbox', visible: $sessionStorage.user.settings[0]["lockbox_combo"] },
		            { field: 'alarm_code', displayName: 'Alarm', visible: $sessionStorage.user.settings[0]["alarm_code"]},
		            { field: 'asset_manager', displayName: 'Manager', visible: $sessionStorage.user.settings[0]["asset_manager"] },
		            { field: 'supervisor', displayName: 'Supervisor', visible: $sessionStorage.user.settings[0]["supervisor"] },
		            { field: 'permits', displayName: 'Permits', visible: $sessionStorage.user.settings[0]["permits"] },
		            { field: 'purchase_cost', displayName: 'Purchase Price', visible: $sessionStorage.user.settings[0]["purchase_cost"] },
		            { field: 'rehab_estimate', displayName: 'Rehab Estimate', visible: $sessionStorage.user.settings[0]["rehab_estimate"] },
		            { field: 'arv', displayName: 'ARV', visible: $sessionStorage.user.settings[0]["arv"] },
		            { field: 'est_completion', displayName: 'Est. Completion', type: 'date', visible: $sessionStorage.user.settings[0]["est_completion"] },
		            { field: 'est_possession', displayName: 'Est. Poss.', type: 'date', visible: $sessionStorage.user.settings[0]["est_possession"] },
		            { field: 'purchase_close_date', displayName: 'Purchase Date', visible: $sessionStorage.user.settings[0]["purchase_close_date"]},
		            { field: 'lender', displayName: 'Lender', visible: $sessionStorage.user.settings[0]["lender"] },
		            { field: 'loan_amount', displayName: 'Loan Amount', visible: $sessionStorage.user.settings[0]["loan_amount"] },
		            { field: 'list_price', displayName: 'Listing Price', visible: $sessionStorage.user.settings[0]["list_price"] },
		            { field: 'sale_price', displayName: 'Sale Price', visible: $sessionStorage.user.settings[0]["sale_price"] },
		        ];

		        for (i = 0; i < $scope.columns.length; i++) {
			        	if ($scope.columns[i].visible === undefined) {
			        		$scope.columns[i].visible = true;
			        	}
			        }
		        }
	}
);
