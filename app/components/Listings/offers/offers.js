app.component(
	'offers',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/offers/offersAdmin.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma, offers, $state) {
        	$scope.s = singleproperty.property;

            $scope.proforma = proforma.proforma;
            $scope.proDefaults = proforma.defaults;
            $scope.offers = {};
            $scope.offers = offers.offers;
            $scope.columns = [];

            if ($scope.proforma.length) {
               for (i = 0; i < $scope.proforma.length; i++) {
                    if($scope.proforma[i].pid == $scope.s.pid) {
                        $scope.proforma.commission  = $scope.proforma[i].commission_percent;
                    } else {
                        $scope.proforma.commission = $scope.proDefaults.commission;
                    }
                } 
            } else {
                $scope.proforma.commission = $scope.proDefaults.commission;
            }

            if (offers.offers[0]) {
                for (j in offers.offers[0]) {
                    if (j == "created") {
                        // Skip
                    } else if (j == "offer_id") {
                        // Skip
                    } else if (j == "accept") {
                        // Skip
                    } else if (j == "closing_costs") {
                        $scope.columns.push('commission');
                        $scope.columns.push(j.replace(/_/g, " "));
                    } else if (j == "title") {
                        $scope.columns.push('net offer');
                        $scope.columns.push(j.replace(/_/g, " "));
                    } else {
                        $scope.columns.push(j.replace(/_/g, " "));
                    }
                }
            }

            for (i = 0; i < $scope.offers.length; i++) {
                $scope.offers[i].commission = (($scope.offers[i].offer_price*1) * ($scope.proforma.commission/100)).toFixed(0);
                $scope.offers[i].net_offer = (($scope.offers[i].offer_price*1) - ($scope.offers[i].commission*1) -($scope.offers[i].ccnr*1) + ($scope.offers[i].counter*1)).toFixed(0);
                $scope.offers[i].commission = "$" + $scope.offers[i].commission.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].net_offer = "$" + $scope.offers[i].net_offer.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].closing_costs = "$" + $scope.offers[i].closing_costs.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].deposit = "$" + $scope.offers[i].deposit.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].hoa = "$" + $scope.offers[i].hoa.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].home_warranty = "$" + $scope.offers[i].home_warranty.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].counter = "$" + $scope.offers[i].counter.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                $scope.offers[i].offer_price = "$" + $scope.offers[i].offer_price.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            

            $scope.goToProperty = function() {
                $state.go("properties.property.listing", {pid: $scope.s.pid});
            }

            $scope.getOfferId = function(id) {
                $scope.offer_id = id;
            }

            $scope.accept = function(){
                var status = {
                    status: "success",
                    id: $scope.offer_id
                };

                auth.post("offerStatus", {
                    status : status
                }).then(function(results) {
                    auth.toast(results);
                    $state.go($state.current, {}, {reload: true});
                })
            };

            $scope.reject = function(){
                var status = {
                    status: "danger",
                    id: $scope.offer_id
                };
                auth.post("offerStatus", {
                    status : status
                }).then(function(results) {
                    auth.toast(results);
                    $state.go($state.current, {}, {reload: true});
                })
            };

            $scope.menuItems = [
                  { text: "Accept",
                    callback: $scope.accept,
                    disabled: false 
                  },
                  {
                    text:"Reject", 
                    callback: $scope.reject, 
                    disabled: false
                  }
            ];

            $scope.newOffer = function() {
                $state.go("listings.new-offer", {pid: $scope.s.pid});
            }

            $scope.seeOffers = function() {
                $state.go("listings.offers", {pid: $scope.s.pid});
            }
        }
	}
); 