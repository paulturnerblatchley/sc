app.component(
	'proformaLive',
	{
    	bindings: {
            proforma: '<'
        },
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/ProForma/proforma-live/proformaLive.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma) {
            $("#live").addClass("active"); // set live tab as active

            //
            $('.table>tbody>tr>td>.invisible-form').parent().css({
                'background-color': '#fff',
                'padding': '0',
                'height': '100%'
            });
            $('.table>tbody>tr>td>select').parent().css('background-color', '#fff');

            this.$onInit = function() {

                $scope.s = singleproperty.property;
                // get proforma data from container component
                $scope.proforma = this.proforma;

                $scope.addPurchaseCost = function(item) {
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

                    $scope.proforma.purchase_closing_costs = calculateTotalCosts($scope.proforma.purchase_closing_costs,$scope.proforma.buy_target);

                    $('.item-desc').val('');
                }

                $scope.addSellingCost = function(item) {
                    var cost = {};
                    for ( i in item ) {
                        cost.pid = $scope.s.pid;
                        cost.category = i;
                        cost.description = item[i].description;
                        cost.cost = item[i].cost;
                        auth.post('addSellingCost', {
                            cost: cost
                        }).then(function(results) {
                            auth.toast(results);
                        });
                        $scope.proforma.selling_closing_costs[i].push({
                            description: item[i].description,
                            cost: item[i].cost.replace(/[$, ]/g, "")
                        });
                    }

                    $scope.proforma.selling_closing_costs = calculateTotalCosts($scope.proforma.selling_closing_costs,$scope.proforma.buy_target);

                    $('.item-desc').val('');
                }

                $scope.toggleCosts = function (event) {
                    var t = $(event.target),
                        id = t[0].id,
                        lb = $("#" + id + "-costs");
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

                 // add profit, pre-sale, sales_costs to properties table
                $scope.changePropValue('profit',$scope.proforma.profit);
                $scope.changePropValue('pre_sale_costs',$scope.proforma.pre_sale_costs);
                $scope.changePropValue('sales_costs',$scope.proforma.sales_costs);
            }
        }
});
