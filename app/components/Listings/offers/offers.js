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
            $scope.offers = {};
            $scope.offers = offers.offers;
            $scope.columns = [];

            if (offers.offers[0]) {
                for (j in offers.offers[0]) {
                    if (j == "created" || j == "offer_id" || j == "accept" || j == "agent_id" || j == 'pid') {
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
                $scope.offers[i].commission = (($scope.offers[i].offer_price*1) * ($scope.proforma.commission_percent/100)).toFixed(0);
                $scope.offers[i].net_offer = (($scope.offers[i].offer_price*1) - ($scope.offers[i].commission*1) -($scope.offers[i].closing_costs*1) + ($scope.offers[i].counter*1)).toFixed(0);
            }
            

            $scope.goToProperty = function() {
                $state.go("properties.property.listing", {pid: $scope.s.pid}, {reload: true});
            }

            $scope.getOfferId = function(id) {
                $scope.offer_id = id;
            }

            $scope.accept = function(){

                var d = new Date(),
                    status = {
                        status: "success",
                        id: $scope.offer_id
                    },
                    change = {
                        pid: $scope.s.pid,
                        column: 'offer_accept',
                        value: d.toISOString()
                    };

                auth.post('changePropValue', {
                    change: change
                }).then(function(res) {
                    change.pid = $scope.s.pid;
                    change.column = "escrow_price";
                    for (i = 0; i < $scope.offers.length; i++) {
                        if ($scope.offers[i].offer_id == $scope.offer_id) {
                            change.value = $scope.offers[i].offer_price;
                            break;
                        }
                    }
                    auth.post('changePropValue', {
                        change: change
                    }).then(function(res) {
                        auth.post("offerStatus", {
                            status : status
                        }).then(function(results) {
                            auth.toast(results);
                            $state.go("properties.property.escrow", {}, {reload: true});
                        });
                    });
                });
                
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
                $state.go("listings.new-offer", {pid: $scope.s.pid}, {reload: true});
            }

            $scope.seeOffers = function() {
                $state.go("listings.offers", {pid: $scope.s.pid}, {reload: true});
            }

            $scope.editOffer = function(id) {
                $state.go("properties.property.edit-offer", {offer_id: id}, {reload: true});
            }
        }
	}
); 