app.factory("partners", ['$http',
    function($http) {

        var o = {
            lenders: [],
            entity_vesting: [],
            supervisors: [],
            asset_managers: []
        };

        o.getLenders = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.lenders = results.data;
          });
        }

        o.getEntityVesting = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.entity_vesting = results.data;
          });
        }

        o.getSupervisors = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.supervisors = results.data;
          });
        }

        o.getAssetManagers = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.asset_managers = results.data;
          });
        }

        return o;
    }
]);