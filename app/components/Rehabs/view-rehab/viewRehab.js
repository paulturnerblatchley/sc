app.component(
	'viewRehab',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Rehabs/view-rehab/viewRehabAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Rehabs/view-rehab/viewRehabPartner.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, rehab, GanttData, singleproperty) {
        	$scope.r = rehab.rehab;
        	$scope.s = singleproperty.property;

    
		    $scope.updateRehab = function(r,k,column,v) {
		        var change = {};
		        change.rehab_id = r.rehab_id;
		        change.table = k;
		        change.column = column;
		        if(v.indexOf("%") != -1) {
		        	v.pop();
		        	change.value = v;
		        } else {
		        	change.value = v;
		        }
		        
		        auth.post('updateRehab', {
		            change: change
		        }).then(function (results) {
		            $scope.data = GanttData.getGanttData($scope);
		        });
		    };

		    $scope.data = GanttData.getGanttData($scope);

		    // angular-gantt options
		        $scope.options = {
		            sortMode: 'from',
		            api: function(api) {
		                $scope.api = api;
		                api.core.on.ready($scope, function() {
		                     api.timespans.on.change($scope, function(data) {
		                        console.log(data);
		                     });
		                });
		            }
		        }

		    $scope.isValueAnArray = function(val) {
		      return Array.isArray(val);
		    }

		    $scope.toggle = function(event) {
                var t = $(event.target);
                var id = t[0].id;
                if (t.hasClass("glyphicon-minus")) {
                    $("#" + id + "-table").addClass("collapse");
                    t.removeClass("glyphicon-minus");
                    t.addClass("glyphicon-plus");
                } else {
                    $("#" + id + "-table").removeClass("collapse");
                    t.removeClass("glyphicon-plus");
                    t.addClass("glyphicon-minus");
                }
            }
        }
	}
); 