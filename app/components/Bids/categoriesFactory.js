app.factory("categories", ['$http',
    function($http) {

        var o = {
            categories: []
        };

        o.getCategories = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            for (i = 0; i < results.data.length; i++) {
                o.categories.push({
                    cat_id: results.data[i].cat_id,
                    cat_name: results.data[i].cat_name
                });
            }
          });
        };

        return o;
    }
]);