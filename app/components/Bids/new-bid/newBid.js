app.component(
	'newBid', 
	{
		bindings: {},
	    templateUrl: 'app/components/Bids/new-bid/new-bid.html',
	    controller: function($scope, $rootScope, $state, auth, singleproperty, categories, tasks) {
        	$scope.s = singleproperty.property;
            $scope.categories = {};
        	$scope.categories = categories.categories;
            $scope.tasks = {};
        	$scope.tasks = tasks.tasks;

        	$scope.bid = {
                category: {
                    cat_id: "",
                    cat_name: ""
                }, 
                tasks: []
            };

		    $scope.createBid = function(bid) {
                bid.pid = $scope.s.pid;
                for (i = 0; i < $scope.categories.length; i++) {
                    if ($scope.categories[i].cat_name == bid.category.cat_name) {
                        bid.category.cat_id = $scope.categories[i].cat_id;
                    }
                }
                for (i = 0; i < bid.tasks.length; i++) {
                    if (!bid.tasks[i].desc) {
                        bid.tasks[i].desc = "";
                    }
                    if (!bid.tasks[i].qty) {
                        bid.tasks[i].qty = "";
                    }
                }

		        $("#loading").css("display", "block");
                auth.post('bids', {
                   bid: bid
                }).then(function (results) {
                    $("#loading").css("display", "none");
                    auth.toast(results);
                    if (results.status == "success") {
                        $state.go('properties.property.bids.open-bid', {bid_id: results.bid_id});
                    }
                });
		    };

		    $scope.showNewCategoryBox = function() {
		    	if($("#addCategoryBox").css("display") == 'none') {
		    		$("#addCategoryBox").fadeIn();
		    	} else {
		    		$("#addCategoryBox").fadeOut();
		    	}
		    }

		    $scope.addCategory = function(cat) {
		    	auth.post('addCategory', {
                   cat: cat
                }).then(function (results) {
                    $("#addCategoryBox").fadeOut();
                    auth.toast(results);
                    if (results.status == "success") {
                        $scope.categories.push({
                            cat_name: cat,
                            cat_id: results.cat_id
                        });
                    }
                });    
		    }

            $scope.showNewTaskBox = function() {
                if($("#addTaskBox").css("display") == 'none') {
                    $("#addTaskBox").fadeIn();
                } else {
                    $("#addTaskBox").fadeOut();
                }
            }

            $scope.addTask = function(task) {
                auth.post('addTask', {
                   task: task
                }).then(function (results) {
                    $("#addTaskBox").fadeOut();
                    console.log(results);
                    auth.toast(results);
                    if (results.status == "success") {
                        $scope.tasks.push({
                            task_id: results.task_id,
                            task_name: task.task_name,
                            task_units: task.units
                        });
                    }
                });    
            }

            $scope.removeTask = function(index,task) {
                $scope.bid.tasks.splice(index, 1);
            }

            $scope.dropSuccessHandler = function($event,index,task){
                $scope.bid.tasks.push({
                    task_id: task.task_id,
                    task_name: task.task_name,
                    task_units: task.task_units
                });
            };

            $scope.onDrop = function($event,$data,array){
                console.log("yes");
            };
	    }
	}
); 