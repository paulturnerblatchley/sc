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
        controller: function($scope, auth, $http, singleproperty, proforma, $state) {
        	$scope.s = singleproperty.property; // Get Property Info

            $scope.proforma = proforma.proforma; // get proforma data

            if ($scope.s.loan_amount != 0) {
                $scope.proforma.loan_amount = $scope.s.loan_amount;
            } else {
                $scope.proforma.loan_amount = $scope.s.arv * .7;
            }

            // get values from property table
            $scope.proforma.buy_target = $scope.s.purchase_cost;
            $scope.proforma.arv = $scope.s.arv;
            $scope.proforma.rehab_estimate = $scope.s.rehab_estimate;
            $scope.proforma.profit_share = 100;

            function getCostDetails(obj) {
                var costs = {
                    escrow: [],
                    title: [],
                    prorations: [],
                    other: [],
                    total: 0
                };
                if (obj) {
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].category == 'escrow') {
                            costs.escrow.push(obj[i]);
                        } else if (obj[i].category == 'title') {
                            costs.title.push(obj[i]);
                        } else if (obj[i].category == 'prorations') {
                            costs.prorations.push(obj[i]);
                        } else {
                            costs.other.push(obj[i]);
                        }
                    }
                } else {
                    return costs;
                }
                
                return costs;
            }

            $scope.proforma.purchase_closing_costs = getCostDetails(proforma.purchaseCosts);
            $scope.proforma.selling_closing_costs = getCostDetails(proforma.sellingCosts);

            function calculateTotalCosts(obj,purchase) {
                obj.total = 0;
                for (i = 0; i < obj.escrow.length; i++) {
                    obj.escrow[i].cost = obj.escrow[i].cost * 1;
                    obj.total += obj.escrow[i].cost;
                }

                for (i = 0; i < obj.title.length; i++) {
                    obj.title[i].cost = obj.title[i].cost * 1;
                    obj.total += obj.title[i].cost;
                }

                for (i = 0; i < obj.prorations.length; i++) {
                    obj.prorations[i].cost = obj.prorations[i].cost * 1;
                    obj.total += obj.prorations[i].cost;
                }

                for (i = 0; i < obj.other.length; i++) {
                    obj.other[i].cost = obj.other[i].cost * 1;
                    obj.total += obj.other[i].cost;
                }
                if (obj.total == 0) {
                    obj.total = purchase * .02;
                }
                return obj;
            }

            $scope.proforma.purchase_closing_costs = calculateTotalCosts($scope.proforma.purchase_closing_costs,$scope.proforma.buy_target);
            $scope.proforma.selling_closing_costs = calculateTotalCosts($scope.proforma.selling_closing_costs,$scope.proforma.buy_target);

             // calculate all other values behind the scenes
            if ($scope.proforma.tc) {
                $scope.proforma.tca = ($scope.proforma.tc*1) + ($scope.proforma.accounting*1);
            }
            $scope.proforma.open_points_cost = ($scope.proforma.loan_amount*($scope.proforma.opening_points/100)).toFixed(0);
            $scope.proforma.interest = ((($scope.proforma.loan_amount*($scope.proforma.apr/100))/12)*$scope.proforma.months).toFixed(0);
            $scope.proforma.total_finance = ((($scope.proforma.interest*1) + ($scope.proforma.fees*1) + ($scope.proforma.open_points_cost*1))).toFixed(0);
            $scope.proforma.pre_sale_costs = (($scope.proforma.buy_target*1) + ($scope.proforma.purchase_closing_costs.total*1) + ($scope.proforma.rehab_estimate*1) + ($scope.proforma.total_finance*1) + ($scope.proforma.other_costs*1)).toFixed(0);
            $scope.proforma.buyer_contribution = (($scope.proforma.buyer_percent/100)*$scope.proforma.arv).toFixed(0);
            $scope.proforma.commission = (($scope.proforma.commission_percent/100)*$scope.proforma.arv).toFixed(0);
            $scope.proforma.sales_costs = (($scope.proforma.selling_closing_costs.total*1) + ($scope.proforma.buyer_contribution*1) + ($scope.proforma.tca*1) + ($scope.proforma.commission*1)).toFixed(0);
            $scope.proforma.est_cost = (($scope.proforma.pre_sale_costs*1) + ($scope.proforma.sales_costs*1)).toFixed(0);
            $scope.proforma.pocket = (($scope.proforma.pre_sale_costs*1) - ($scope.proforma.loan_amount*1)).toFixed(0)
            $scope.proforma.tetakawi_pocket = (($scope.proforma.pocket*1) - ($scope.proforma.jeremy_pocket*1) - ($scope.proforma.codrin_pocket*1)).toFixed(0) 
            $scope.proforma.profit = (($scope.proforma.arv*1) - ($scope.proforma.est_cost*1)).toFixed(0);
            $scope.proforma.tetakawi_profit = (($scope.proforma.profit*1) * ($scope.proforma.tetakawi_share_percent/100)).toFixed(0);
            $scope.proforma.jeremy_percent = ((($scope.proforma.profit_share*1) - ($scope.proforma.tetakawi_share_percent*1))/2).toFixed(2);
            $scope.proforma.jeremy_profit = (($scope.proforma.profit*1) * ($scope.proforma.jeremy_percent/100)).toFixed(0);
            $scope.proforma.codrin_percent = $scope.proforma.jeremy_percent;
            $scope.proforma.codrin_profit = (($scope.proforma.profit*1) * ($scope.proforma.codrin_percent/100)).toFixed(0);
            $scope.proforma.tetakawi_roi = (((($scope.proforma.tetakawi_profit*1)/($scope.proforma.tetakawi_pocket*1))*(12/($scope.proforma.months*1)))*100).toFixed(2);
            $scope.proforma.jeremy_roi = (((($scope.proforma.jeremy_profit*1)/($scope.proforma.jeremy_pocket*1))*(12/($scope.proforma.months*1)))*100).toFixed(2);
            $scope.proforma.codrin_roi = (((($scope.proforma.codrin_profit*1)/($scope.proforma.codrin_pocket*1))*(12/($scope.proforma.months*1)))*100).toFixed(2);

            // Get Projected Table if exists
            if (!jQuery.isEmptyObject(proforma.projected)) {
                $("#projected").html("Projected");
                $scope.projected = proforma.projected;
            }

            // Get Actual Table if exists
            if (!jQuery.isEmptyObject(proforma.actual)) {
                $("#actual").html("Actual");
                $scope.actual = proforma.actual;
            }



            $scope.setProjected = function(proforma) {
                if (!jQuery.isEmptyObject($scope.projected)) {
                    $state.go("properties.property.proforma.projected", {}, {reload: true});
                    $(".proforma .btn").removeClass("active");
                    $("#projected").addClass("active");
                } else {
                    var proforma = $scope.proforma;
                    proforma.pid = $scope.s.pid;
                    proforma.purchase_cost = proforma.buy_target;
                    proforma.purchase_close_costs = proforma.purchase_closing_costs.total;
                    proforma.selling_close_costs = proforma.selling_closing_costs.total;
                    auth.post('setProjected', {
                        proforma: proforma
                    }).then(function(results) {
                        setTimeout(function() {
                            $state.go("properties.property.proforma.projected", {}, {reload: true});
                            $(".proforma .btn").removeClass("active");
                        },200);
                    });
                }      
            }

            $scope.seeLive = function() {
                $state.go("properties.property.proforma.live", {}, {reload: true});
                $(".proforma .btn").removeClass("active");
                $("#live").addClass("active");
            }

            $scope.setActual = function() {
                if (!jQuery.isEmptyObject($scope.actual)) {
                    $state.go("properties.property.proforma.actual", {}, {reload: true});
                    $(".proforma .btn").removeClass("active");
                    $("#actual").addClass("active");
                } else {
                    var proforma = $scope.proforma;
                    proforma.pid = $scope.s.pid;
                    proforma.purchase_cost = proforma.buy_target;
                    proforma.purchase_close_costs = proforma.purchase_closing_costs.total;
                    proforma.selling_close_costs = proforma.selling_closing_costs.total;
                    auth.post('setActual', {
                        proforma: proforma
                    }).then(function(results) {
                        setTimeout(function() {
                            $state.go("properties.property.proforma.actual", {}, {reload: true});
                            $(".proforma .btn").removeClass("active");
                        },200);
                    });
                }
            }
        }
	}
); 