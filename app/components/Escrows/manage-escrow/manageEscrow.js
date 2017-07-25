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
	    controller: function($scope, $rootScope, $sessionStorage, auth, properties, singleproperty, escrow, offers, $state, proforma) {
            // get property info
            $scope.s = singleproperty.property;

            // get proforma details
            $scope.proforma = proforma.proforma;

            // check for accepted offer
            for(i = 0; i < offers.offers.length; i++) {
                  if (offers.offers[i].accept == "success") {
                        $scope.offer = offers.offers[i];
                        $scope.offer.commission = (($scope.offer.offer_price*1) * ($scope.proforma.commission_percent/100)).toFixed(0)
                        $scope.offer.net_offer = (($scope.offer.offer_price*1) - ($scope.offer.commission*1) - ($scope.offer.closing_costs*1) + ($scope.offer.counter*1)).toFixed(0)
                        break;                    
                  }
            }
            
            // Pretty Dates
            $scope.s.offer_accept = moment($scope.s.offer_accept).format('LL');
            $scope.s.sale_close_date = ($scope.s.sale_close_date == '') ? '0000-00-00' : $scope.s.sale_close_date; 

            // Get Escrow Progress     
            $scope.progress = {};
            $scope.progress = escrow.progress;

            // Get Forms Completed
            $scope.forms = {};
            $scope.forms = escrow.forms;
            delete $scope.forms.id;
            delete $scope.forms.pid;

            $scope.saveEscrowChanges = function(pid,day,task_name,task_obj,task_value) {   	
            	var escrow = {};
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

            $scope.saveEscrowForm = function(pid, column, value) {
                  var form = {};
                  form.pid = pid;
                  form.column = column.toLowerCase().replace(" ", "_");
                  form.value = (value) ? 1 : 0;

                  auth.post('saveEscrowForm', {
                        form: form
                  }).then( function(results) {

                  });
            }

            $scope.changePropValue = function(k,v) {
                  var change = {};
                  change.pid = $scope.s.pid;
                  change.column = k;
                  change.value = v;
                  auth.post('changePropValue', {
                        change: change
                  }).then(function() {
                        $state.go($state.current, {}, {reload: true});
                  });
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