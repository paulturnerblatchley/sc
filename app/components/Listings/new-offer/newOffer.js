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
            
            $scope.offer = {'pid': '', 'buyer': '', 'financing': '', 'closing': 'days', 'deposit': '', 'offer_price': '', 'closing_costs': '', 'counter': '', 'hoa': '', 'home_warranty': '', 'title': '', 'escrow': '', 'termite': '', 'nhd': '', 'septic': '', 'co_fees': '', 'city_fees': '', 'fico': '', 'pof': '', 'other_terms': '', 'notes': ''};
            $scope.enroll = {first_name: '', last_name: '', email:'', phone:'', bre: '', mls_id: '', early_showing: '', open_house: '', sb: '', riv: '', la: '', sd: ''};
            $scope.newOffer = function(offer,agent) {
                offer.pid = $scope.s.pid;

                $("#loading").css("display", "block");

                auth.post('enroll', {
                    agent: agent
                }).then(function(res) {
                    if (typeof res.agent_id === 'object') {
                        offer.agent_id = res.agent_id.agent_id;
                    } else {
                        offer.agent_id = res.agent_id;
                    }

                    auth.post('newOffer', {
                        offer: offer
                    }).then(function (results) {
                        $("#loading").css("display", "none");
                        auth.toast(results);
                        if (results.status == "success") {
                            $state.go('properties.property.offers', {}, {reload: true});
                        }
                    });
                });
            }
        }
	}
); 