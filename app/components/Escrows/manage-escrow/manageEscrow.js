app.component(
	'manageEscrow', 
	{
		bindings: {},
	    templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Escrows/manage-escrow/manageEscrowAdmin.html'
			// Default
            else               return 'app/components/User/login/login.html'
        },
	    controller: function($scope, $rootScope, $sessionStorage, auth, properties, singleproperty, escrow) {
            $scope.s = singleproperty.property;
            $scope.progress = escrow.progress;

            $scope.saveEscrowChanges = function(pid,day,task_name,task_obj,task_value) {
            	
            	var escrow = {pid:'', day: '', task_name:'', status: '', date: '', inspection: ''};
            	escrow.pid = pid;
            	escrow.day = day;
            	escrow.task_name = task_name;
            	if (task_obj.status == task_value) {
            		escrow.status = task_value;
            		delete escrow.date;
            		delete escrow.inspection;
            	} else if (task_obj.date == task_value) {
            		escrow.date = task_value;
            		delete escrow.status;
            		delete escrow.inspection;
            	} else if (task_obj.inspection == task_value) {
            		escrow.inspection = task_value;
            		delete escrow.date;
            		delete escrow.status;
            	}
				
				auth.post('escrow', {
            		escrow: escrow
            	}).then( function(results) {
					
            	});

            }
	    }
	}
); 