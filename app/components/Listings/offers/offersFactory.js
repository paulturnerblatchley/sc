app.factory("offers", ['$http',
    function($http) {

        var o = {
            offers: []
        };

        o.getOffers = function(q,pid) {
          return $http.get(serviceBase + q).then(function(results) {
            o.offers = [];
            for (i = 0; i < results.data.length; i++) {
              if (results.data[i].pid == pid) {
                delete results.data[i].pid;
                o.offers.push(results.data[i]);
              }
            }
          });
        }

        return o;
    }
]);