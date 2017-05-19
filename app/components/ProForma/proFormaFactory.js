app.factory("proforma", ['$http',
    function($http) {

        var o = {
            defaults: [],
            purchaseCosts: [],
            proforma: []
        };

        o.getDefaultSettings = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.defaults = results.data[0];
          });
        }

        o.getPurchaseCosts = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.purchaseCosts = results.data;
          });
        }

        o.getProforma = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.proforma = results.data;
          });
        }

        return o;
    }
]);