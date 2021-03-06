app.factory("proforma", ['$http',
    function($http) {

        var o = {
            defaults: [],
            purchaseCosts: [],
            sellingCosts: [],
            proforma: [],
            projected: [],
            actual: []
        };

        function resultsForPid (data,pid) {
          for(i = 0; i < data.length; i++) {
            if (data[i].pid == pid) {
              return data[i];
            } else {
              return {};
            }
          }
        }

        function collectForPid (data,pid) {
          var x = [];
          for(i = 0; i < data.length; i++) {
            if (data[i].pid == pid) {
              x.push(data[i]);
            }
          }
          return x;
        }

        o.getDefaultSettings = function(q) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'proforma_defaults'}
          }).then(function(results) {
            o.defaults = results.data[0];
          });
        }

        o.getPurchaseCosts = function(q,pid) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'purchase_closing_costs'}
          }).then(function(results) {
            o.purchaseCosts = collectForPid(results.data,pid);
          });
        }

        o.getSellingCosts = function(q,pid) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'selling_closing_costs'}
          }).then(function(results) {
            o.sellingCosts = collectForPid(results.data,pid);
          });
        }

        o.getProforma = function(q,pid) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'proforma'}
          }).then(function(results) {
            o.proforma = resultsForPid(results.data,pid);
            return $http({
              url: serviceBase + q,
              method: 'GET',
              params: {table: 'proforma_defaults'}
            });
          }).then(function(res) {
            if (jQuery.isEmptyObject(o.proforma)) {
              o.proforma = res.data[0];
            }
          });
        }

        o.getProjected = function(q,pid) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'proforma_projected'}
          }).then(function(results) {
            for(i = 0; i < results.data.length; i++) {
              if (results.data[i].pid == pid) {
                o.projected = results.data[i];
              } else {
                o.projected = {};
              }
            }
          });
        }

        o.getActual = function(q,pid) {
          return $http({
            url: serviceBase + q,
            method: 'GET',
            params: {table: 'proforma_actual'}
          }).then(function(results) {
            for(i = 0; i < results.data.length; i++) {
              if (results.data[i].pid == pid) {
                o.actual = results.data[i];
              } else {
                o.actual = {};
              }
            }
          });
        }

        return o;
    }
]);
