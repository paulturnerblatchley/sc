app.component(
	'openBid',
	{
		bindings: {},
	    templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Bids/open-bid/openBidAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Bids/open-bid/openBidPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Bids/open-bid/openBidContractor.html'
			// Default
            else               return 'app/components/User/login/login.html'
        },
	    controller: function($scope, $rootScope, $state, singleproperty, bids, auth) {
        	$scope.s = singleproperty.property;
            $scope.b = {};
            $scope.b = bids.singleOpenBid;

            $scope.changePropValue = function(k,v,id,total) {
                var change = {};
                change.table = "bid_tasks";
                change.column = k;
                change.value = v;
                change.where = "bid_task_id";
                change.what = id;
                auth.post('updateValue', {change: change}).then(function() {
                    if (k == 'qty' || k == 'task_cost') {
                        var change = {};
                        change.table = "bid_tasks";
                        change.column = 'task_total';
                        change.value = total;
                        change.where = "bid_task_id";
                        change.what = id;
                        auth.post('updateValue', {change: change}).then(function() {
                            $scope.b.total_cost = updateBidTotal($scope.b.tasks);
                            var change = {};
                            change.table = "open_bids";
                            change.column = 'bid_total_cost';
                            change.value = $scope.b.total_cost;
                            change.where = "bid_id";
                            change.what = $scope.b.bid_id;
                            auth.post('updateValue', {change: change})
                        });
                    }
                });
            }

            function updateBidTotal(tasks) {
                var total = 0;
                for (var i = 0; i < tasks.length; i++) {
                    total += (tasks[i].task_total*1)
                }
                return total;
            }

            $scope.deleteBid = function(id) {
                var row = {};
                row.table = "open_bids";
                row.column = "bid_id";
                row.value = id;
                auth.post('deleteRow', {
                    row: row
                }).then(function(results) {
                    auth.toast(results);
                    $state.go("properties.property.bids", {}, {reload: true});
                });
            }
	    }
	}
);
