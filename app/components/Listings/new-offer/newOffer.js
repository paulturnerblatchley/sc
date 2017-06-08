app.component(
	'newOffer',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/new-offer/newOfferAdmin.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, $state) {
        	$scope.s = singleproperty.property;

            $scope.goToProperty = function() {
                $state.go("properties.property.listing", {pid: $scope.s.pid});
            }

            $scope.offer = {'pid': '', 'buyer': '', 'financing': '', 'closing': 'days', 'deposit': '', 'offer_price': '', 'closing_costs': '', 'counter': '', 'hoa': '', 'home_warranty': '', 'title': '', 'escrow': '', 'termite': '', 'nhd': '', 'septic': '', 'co_fees': '', 'city_fees': '', 'fico': '', 'pof': '', 'other_terms': '', 'notes': ''}
            $scope.newOffer = function(offer) {
                offer.pid = $scope.s.pid;
                offer.deposit = offer.deposit.replace(/[$, ]/g, "");
                offer.offer_price = offer.offer_price.replace(/[$, ]/g, "");
                offer.closing_costs = offer.closing_costs.replace(/[$, ]/g, "");
                offer.counter = offer.counter.replace(/[$, ]/g, "");
                offer.hoa = offer.hoa.replace(/[$, ]/g, "");
                offer.home_warranty = offer.home_warranty.replace(/[$, ]/g, "");

                $("#loading").css("display", "block");
                auth.post('newOffer', {
                    offer: offer
                }).then(function (results) {
                    $("#loading").css("display", "none");
                    auth.toast(results);
                    if (results.status == "success") {
                        $state.go('listings.offers', {pid: $scope.s.pid});
                    }
                });
            }

            $scope.newOffer = function() {
                $state.go("listings.new-offer", {pid: $scope.s.pid});
            }

            $scope.seeOffers = function() {
                $state.go("listings.offers", {pid: $scope.s.pid});
            }
    
        }
	}
); 