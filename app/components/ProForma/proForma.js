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
        controller: function($scope, auth, $http, singleproperty, proforma) {
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

            for (i = 0; i < proforma.purchaseCosts.length; i++) {
                if (proforma.purchaseCosts[i].pid == $scope.s.pid) {
                    if (proforma.purchaseCosts[i].category == 'escrow') {
                        $scope.proforma.purchase_closing_costs.escrow.push(proforma.purchaseCosts[i]);
                    } else if (proforma.purchaseCosts[i].category == 'title') {
                        $scope.proforma.purchase_closing_costs.title.push(proforma.purchaseCosts[i]);
                    } else if (proforma.purchaseCosts[i].category == 'prorations') {
                        $scope.proforma.purchase_closing_costs.prorations.push(proforma.purchaseCosts[i]);
                    } else {
                        $scope.proforma.purchase_closing_costs.other.push(proforma.purchaseCosts[i]);
                    }
                }
            }

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

            calculateTotalPurchaseCosts();

            if ($scope.proforma.purchase_closing_costs.total == 0) {
                $scope.proforma.purchase_closing_costs.total = $scope.proforma.buy_target * .02;
            }
            

            $scope.proforma.profit_share = 100;

            if (proforma.proforma.length) {
                for(i = 0; i < proforma.proforma.length; i ++) {
                    if (proforma.proforma[i].pid == $scope.s.pid) {
                        for (j in proforma.proforma[i]) {
                            $scope.proforma[j] = proforma.proforma[i][j];
                        }
                    } else {
                        // Set Defaults
                        $scope.default = proforma.defaults;
                        $scope.proforma.loan_amount = $scope.proforma.arv * .7;
                        $scope.proforma.apr = $scope.default.apr;
                        $scope.proforma.months = $scope.default.months;
                        $scope.proforma.fees = $scope.default.fees;
                        $scope.proforma.opening_points = $scope.default.opening_points;
                        $scope.proforma.other_costs = 0;
                        $scope.proforma.selling_costs_percent = $scope.default.selling_closing_costs_percent;
                        $scope.proforma.buyer_percent = $scope.default.buyers_contribution;
                        $scope.proforma.tc = $scope.default.tc;
                        $scope.proforma.accounting = $scope.default.accounting;
                        $scope.proforma.tca = ($scope.proforma.tc*1) + ($scope.proforma.accounting*1);
                        $scope.proforma.commission_percent = $scope.default.commission;
                        $scope.proforma.jeremy_pocket = 0;
                        $scope.proforma.codrin_pocket = 0;
                        $scope.proforma.tetakawi_share_percent = $scope.default.tetakawi_share;
                    }
                }
            } else {
                // Set Defaults
                $scope.default = proforma.defaults;
                $scope.proforma.loan_amount = $scope.proforma.arv * .7;
                $scope.proforma.apr = $scope.default.apr;
                $scope.proforma.months = $scope.default.months;
                $scope.proforma.fees = $scope.default.fees;
                $scope.proforma.opening_points = $scope.default.opening_points;
                $scope.proforma.other_costs = 0;
                $scope.proforma.selling_costs_percent = $scope.default.selling_closing_costs_percent;
                $scope.proforma.buyer_percent = $scope.default.buyers_contribution;
                $scope.proforma.tc = $scope.default.tc;
                $scope.proforma.accounting = $scope.default.accounting;
                $scope.proforma.tca = ($scope.proforma.tc*1) + ($scope.proforma.accounting*1);
                $scope.proforma.commission_percent = $scope.default.commission;
                $scope.proforma.jeremy_pocket = 0;
                $scope.proforma.codrin_pocket = 0;
                $scope.proforma.tetakawi_share_percent = $scope.default.tetakawi_share;
            }
            

            $scope.addItem = function(item) {
                var cost = {};
                for ( i in item ) {
                    cost.pid = $scope.s.pid; 
                    cost.category = i;
                    cost.description = item[i].description;
                    cost.cost = item[i].cost;
                    auth.post('addPurchaseCost', {
                        cost: cost
                    }).then(function(results) {
                        auth.toast(results);
                    });
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

            $scope.changePropValue = function(k,v) {
                var change = {};
                change.pid = $scope.s.pid;
                change.column = k;
                change.value = v;
                auth.post('changePropValue', {
                    change: change
                });
            }

            $scope.changeProforma = function(k,v) {
                var change = {};
                change.pid = $scope.s.pid;
                change.column = k;
                change.value = v;
                auth.post('changeProforma', {
                    change: change
                });
            }

        }
	}
); 