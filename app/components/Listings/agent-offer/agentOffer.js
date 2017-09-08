app.component(
	'agentOffer',
	{
    	bindings: {},
        templateUrl:  'app/components/Listings/agent-offer/agentOffer.html',
        controller: function($scope, auth, $http, singleproperty, $state) {
        	$scope.s = singleproperty.property;

            $scope.offer = {'pid': '', 'buyer': '', 'financing': '', 'closing': 'days', 'deposit': '0', 'offer_price': '0', 'closing_costs': '0', 'counter': '0', 'hoa': '0', 'home_warranty': '0', 'title': '', 'escrow': '', 'termite': '', 'nhd': '', 'septic': '', 'co_fees': '', 'city_fees': '', 'fico': '', 'pof': '', 'other_terms': '', 'notes': ''};
            $scope.agent = {first_name: '', last_name: '', email:'', phone:'', bre: '', mls_id: '', early_showing: '', open_house: '', sb: '0', riv: '0', la: '0', sd: '0'};
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
                            $state.go('listings', {}, {reload: true});
                        }
                    });
                });
            }
        }
	}
);
