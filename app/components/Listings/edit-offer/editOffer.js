app.component(
	'editOffer',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/edit-offer/editOfferAdmin.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, proforma, offers, $state) {
            $('.table>tbody>tr>td>.invisible-form').parent().css({
                'background-color': '#fff',
                'padding': '0',
                'height': '100%'
            });
            $('.table>tbody>tr>td>select').parent().css('background-color', '#fff');

            $scope.s = singleproperty.property;

            $scope.proforma = proforma.proforma;
            $scope.offer = {};

            for (i = 0; i < offers.offers.length; i++) {
                if (offers.offers[i].offer_id == $state.params.offer_id) {
                    $scope.offer = offers.offers[i];
                }
            }

            $scope.offer.commission = (($scope.offer.offer_price*1) * ($scope.proforma.commission_percent/100)).toFixed(0);
            $scope.offer.net_offer = (($scope.offer.offer_price*1) - ($scope.offer.commission*1) -($scope.offer.closing_costs*1) + ($scope.offer.counter*1)).toFixed(0);


            $scope.updateOffer = function(offer) {
                auth.post('editOffer', {
                    offer: offer
                }).then(function(res) {
                    auth.toast(res);
                    $state.go($state.current, {offer_id: offer.offer_id}, {reload: true});
                })
            }

            $scope.deleteOffer = function(offer) {
                var ok = confirm("Are you sure you want to delete this offer?");
                if (ok) {
                  auth.post('deleteOffer', {
                    offer: offer
                  }).then(function(res){
                      auth.toast(res);
                      $state.go('properties.property.offers', {}, {reload: true});
                  });
                }
            }
        }
	}
); 