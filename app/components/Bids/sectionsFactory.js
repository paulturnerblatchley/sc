app.factory("sections", ['$http',
    function($http) {

        var o = {
            sections: []
        };

        o.getSections = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            for (i = 0; i < results.data.length; i++) {
                o.sections.push({
                    id: results.data[i].id,
                    name: results.data[i].name
                });
            }
          });
        };

        return o;
    }
]);