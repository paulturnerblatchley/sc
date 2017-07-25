app.component(
	'newBid', 
	{
		bindings: {},
	    templateUrl: 'app/components/Bids/new-bid/new-bid.html',
	    controller: function($scope, $rootScope, $state, auth, singleproperty, sections, tasks, bids) {
        	// get property info
            $scope.s = singleproperty.property;

            $scope.sections = {};
            $scope.sections = sections.sections;

            $scope.tasks = {};
        	$scope.tasks = tasks.tasks;

            // check number of open bids to determine new bid number
            $scope.open = bids.openBids;
            $scope.open = $scope.open.filter(function(bid) {
                if (bid.bid_pid == $scope.s.pid) {
                    return bid;
                }
            });

            // find the current # of bids, then add 1
            var num = 1;
            if ($scope.open.length != 0) {
                var allNums = [];
                for (var i = 0; i < $scope.open.length; i++) {
                    allNums.push(parseInt($scope.open[i].bid_num));
                }
                num = Math.max.apply(Math,allNums) + 1;
            }

        	$scope.bid = {
                section: {
                    id: "",
                    name: ""
                }, 
                tasks: [],
                bid_num: num
            };

            $scope.selected = [];
            $scope.deselected = [];

            $scope.bid_total = 0;

            // FUNCTIONS
            function calculateTaskCost(task) {
                var sqft  = $scope.s.sqft,
                    bd    = $scope.s.beds,
                    ba    = $scope.s.baths,
                    tasks = $scope.bid.tasks,
                    tu    = task.default_qty,
                    tc    = task.task_cost,
                    qty   = task.qty;

                if (qty) {
                    return (tc*1) * qty;
                } else {
                    // replace variables with values
                    tu = tu.replace(/[ ]/g,"");
                    tu = tu.replace("sqft", sqft);
                    tu = tu.replace("ba", ba);
                    tu = tu.replace("bd", bd);

                    // evalute to find quantity
                    qty = eval(tu);

                    // find total cost by unit cost times quantity
                    return (tc*1) * qty;
                }
            }

		    $scope.createBid = function(bid) {
                
                bid.pid = $scope.s.pid;

                for (i = 0; i < $scope.sections.length; i++) {
                    if ($scope.sections[i].name == bid.section.name) {
                        bid.section.id = $scope.sections[i].id;
                    }
                }

                bid.total_cost = $scope.bid_total;

                for (var i = 0; i < bid.tasks.length; i++) {
                    if (bid.tasks[i].description) {
                        bid.tasks[i].description = bid.tasks[i].description.replace(/'/g,"\\'");
                    } else {
                        bid.tasks[i].description = "";
                    }
                    
                }
		        $("#loading").css("display", "block");
                auth.post('bids', {
                   bid: bid
                }).then(function (results) {
                    $("#loading").css("display", "none");
                    if (results.status == "success") {
                        auth.toast(results);
                        $state.go('properties.property.open-bid', {bid_num: bid.bid_num, bid_pid: bid.bid_pid}, {reload: true});
                    } else {
                        auth.toast({"status":"error","message":"Please Select A Section"});
                    }
                });
		    };

		    $scope.showNewSectionBox = function() {
		    	if($("#addSectionBox").css("display") == 'none') {
		    		$("#addSectionBox").fadeIn();
		    	} else {
		    		$("#addSectionBox").fadeOut();
		    	}
		    }

		    $scope.addSection = function(name) {
		    	auth.post('addSection', {
                   name: name
                }).then(function (results) {
                    $("#addSectionBox").fadeOut();
                    $("#addSectionBox input").val("");
                    auth.toast(results);
                    if (results.status == "success") {
                        $scope.sections.push({
                            name: name,
                            id: results.id
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

            $scope.otherQty = function(qty) {
                if (qty == "other") {
                    $("#other-box").fadeIn();
                    $scope.newtask.default_qty = "";
                } else {
                    $("#other-box").fadeOut();
                }
            }

            $scope.addTask = function(task) {
                task.task_cost = parseFloat(task.task_cost.replace(/[^\d\.]/g,""));
                auth.post('addTask', {
                   task: task
                }).then(function (results) {
                    $("#addTaskBox").fadeOut();
                    auth.toast(results);
                    if (results.status == "success") {
                        $scope.tasks.push({
                            task_id: results.task_id,
                            task_name: task.task_name,
                            task_units: task.task_units,
                            default_qty: task.default_qty,
                            task_cost: task.task_cost,
                        });
                    }
                });    
            }

            $scope.select = function(i,task) {
                if ($scope.selected.indexOf(task) == -1) {
                    $("#out-task" + i).css("background-color", "#dff0d8");
                    $scope.selected.push(task);
                } else {
                    $("#out-task" + i).css("background-color", "#eee");
                    var where = $scope.selected.indexOf(task);
                    $scope.selected.splice(where,1);
                }
            }

            $scope.deselect = function(e,i,task) {
                if (e.target.localName === "input" ||
                    e.target.localName === "textarea" ||
                    e.target.localName === "i" ||
                    e.target.localName === "table") {
                    // Do Nothing
                } else {
                    if ($scope.deselected.indexOf(task) == -1) {
                        $("#in-task" + i + ", #in-task"+i+" .table.task-details").css("background-color", "#f2dede");
                        $scope.deselected.push(task);
                    } else {
                        $("#in-task" + i + ", #in-task"+i+" .table.task-details").css("background-color", "#eee");
                        var where = $scope.deselected.indexOf(task);
                        $scope.deselected.splice(where,1);
                    }
                }
            }

            $scope.includeTasks = function(tasks) {
                for (i = 0; i < tasks.length; i++) {
                    $scope.bid.tasks.push(tasks[i]);
                }
                $scope.selected = [];
                $(".task-list ul li").css("background-color","#eee");
                $scope.bid_total = 0;
                for (var i = 0; i < $scope.bid.tasks.length; i++) {
                    $scope.bid.tasks[i].total_cost = calculateTaskCost($scope.bid.tasks[i]);
                    $scope.bid.tasks[i].qty = $scope.bid.tasks[i].total_cost/$scope.bid.tasks[i].task_cost;
                    $scope.bid_total += $scope.bid.tasks[i].total_cost;
                }
            }

            $scope.excludeTasks = function(tasks) {
                for (i = 0; i < tasks.length; i++) {
                    $scope.bid.tasks = $scope.bid.tasks.filter(function(bid_task) {
                        if (bid_task.task_name != tasks[i].task_name) {
                            return bid_task;
                        }
                    });
                }
                $scope.deselected = [];
                $(".task-collector ul li, .table.task-details").css("background-color","#eee");
                $scope.bid_total = 0;
                for (var i = 0; i < $scope.bid.tasks.length; i++) {
                    $scope.bid.tasks[i].total_cost = calculateTaskCost($scope.bid.tasks[i]);
                    $scope.bid_total += $scope.bid.tasks[i].total_cost;
                }
            }

            $scope.recalculateCosts = function() {
                $scope.bid_total = 0;
                for (var i = 0; i < $scope.bid.tasks.length; i++) {
                    $scope.bid.tasks[i].total_cost = calculateTaskCost($scope.bid.tasks[i]);
                    $scope.bid_total += $scope.bid.tasks[i].total_cost;
                }
            }

            $scope.toggle = function(event) {
                var t = $(event.target);
                var id = t[0].id;
                if (t.hasClass("glyphicon-chevron-up")) {
                    $("#" + id + "-table").addClass("collapse");
                    t.removeClass("glyphicon-chevron-up");
                    t.addClass("glyphicon-chevron-down");
                } else {
                    $("#" + id + "-table").removeClass("collapse");
                    t.removeClass("glyphicon-chevron-down");
                    t.addClass("glyphicon-chevron-up");
                }
            }
            // END FUNCTIONS
	    }
	}
); 