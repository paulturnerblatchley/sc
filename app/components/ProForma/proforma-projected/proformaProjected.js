app.component(
	'proformaProjected',
	{
    	bindings: {
            proforma: '<'
        },
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/ProForma/proforma-projected/proformaProjected.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma,$state) {
            $("#projected").addClass("active");
            $scope.projected = proforma.projected;

            this.$onInit = function() {

                $scope.s = singleproperty.property;

                // get proforma data from container component
                $scope.proforma = this.proforma;

                if (!jQuery.isEmptyObject(proforma.projected)) {
                    $("#projected").html("Projected");
                }

                $scope.projected.buy_target = $scope.projected.purchase_cost;
                
                $scope.projected.profit_share = 100;
                $scope.projected.created = moment($scope.projected.created).format('LL');
            }            
        }
    }
);