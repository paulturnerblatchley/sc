app.component(
	'proForma',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/ProForma/proFormaAdmin.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty) {
            // Get Property Info
        	$scope.s = singleproperty.property;

            $scope.proforma = {};

            // Convert Currency Strings to Numbers
            $scope.proforma.buy_target = $scope.s.purchase_cost.replace(/[$, ]/g, "");
            $scope.proforma.arv = $scope.s.arv.replace(/[$, ]/g, "");
            $scope.proforma.rehab_estimate = $scope.s.rehab_estimate.replace(/[$, ]/g, "");

            $scope.proforma.purchase_closing_costs = {
                escrow: [],
                title: [],
                prorations: [],
                other: [],
                total: 0
            };

            function calculateTotalPurchaseCosts() {
                $scope.proforma.purchase_closing_costs.total = 0;
                
                for (i = 0; i < $scope.proforma.purchase_closing_costs.escrow.length; i++) {
                    $scope.proforma.purchase_closing_costs.escrow[i].cost = $scope.proforma.purchase_closing_costs.escrow[i].cost * 1;
                    $scope.proforma.purchase_closing_costs.total += $scope.proforma.purchase_closing_costs.escrow[i].cost;
                }

                for (i = 0; i < $scope.proforma.purchase_closing_costs.title.length; i++) {
                    $scope.proforma.purchase_closing_costs.title[i].cost = $scope.proforma.purchase_closing_costs.title[i].cost * 1;
                    $scope.proforma.purchase_closing_costs.total += $scope.proforma.purchase_closing_costs.title[i].cost;
                }

                for (i = 0; i < $scope.proforma.purchase_closing_costs.prorations.length; i++) {
                    $scope.proforma.purchase_closing_costs.prorations[i].cost = $scope.proforma.purchase_closing_costs.prorations[i].cost * 1;
                    $scope.proforma.purchase_closing_costs.total += $scope.proforma.purchase_closing_costs.prorations[i].cost;
                }

                for (i = 0; i < $scope.proforma.purchase_closing_costs.other.length; i++) {
                    $scope.proforma.purchase_closing_costs.other[i].cost = $scope.proforma.purchase_closing_costs.other[i].cost * 1;
                    $scope.proforma.purchase_closing_costs.total += $scope.proforma.purchase_closing_costs.other[i].cost;
                }
            }

            if ($scope.proforma.purchase_closing_costs.total == 0) {
                $scope.proforma.purchase_closing_costs.total = $scope.proforma.buy_target * .02;
            } else {
                calculateTotalPurchaseCosts()
            }
            
            // Set Defaults
            $scope.proforma.loan_amount = $scope.proforma.arv * .7;
            $scope.proforma.apr = 9;
            $scope.proforma.months = 6;
            $scope.proforma.fees = 990;
            $scope.proforma.opening_points = 2;
            $scope.proforma.other_costs = 0;
            $scope.proforma.selling_costs_percent = 1;
            $scope.proforma.buyer_percent = 1;
            $scope.proforma.tc = 250;
            $scope.proforma.accounting = 500;
            $scope.proforma.tca = $scope.proforma.tc + $scope.proforma.accounting;
            $scope.proforma.commision_percent = 3;
            $scope.proforma.profit_share = 100;
            $scope.proforma.jeremy_pocket = 0;
            $scope.proforma.codrin_pocket = 0;
            $scope.proforma.tetakawi_share_percent = 27.50;

            $scope.addItem = function(item) {
                for ( i in item ) {
                    $scope.proforma.purchase_closing_costs[i].push({
                        description: item[i].description,
                        cost: item[i].cost.replace(/[$, ]/g, "")
                    });
                }

                calculateTotalPurchaseCosts()

                $('.item-desc').val('');
            }

            $scope.togglePurchaseCosts = function() {
                var lb = $("#lightbox");
                if (lb.css("display") == "block") {
                    lb.css("display", "none");
                    $("html,body").css("height","unset");
                    $("footer").css("margin-top", "0px");
                } else {
                    lb.css("display", "block");
                    $("html,body").css("height","100%");
                    $("footer").css("margin-top", "200px");
                }
            };

        }
	}
); 