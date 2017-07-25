app.component(
    'proformaActual',
    {
        bindings: {
            proforma: '<'
        },
        templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/ProForma/proforma-actual/proformaActual.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma,$state) {
                $("#actual").addClass("active");
                $scope.actual = proforma.actual;

            this.$onInit = function() {

                $scope.s = singleproperty.property;

                // get proforma data from container component
                $scope.proforma = this.proforma;

                if (!jQuery.isEmptyObject(proforma.actual)) {
                    $("#actual").html("Actual");
                }

                $scope.actual.buy_target = $scope.actual.purchase_cost;
                
                $scope.actual.profit_share = 100;
                $scope.actual.created = moment($scope.actual.created).format('LL');
            }
        }
    }
);