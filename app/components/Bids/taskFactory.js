app.factory("tasks", ['$http',
    function($http) {

        var o = {
            tasks: []
        };

        o.getTasks = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            for (i = 0; i < results.data.length; i++) {
                o.tasks.push(results.data[i]);
            }
          });
        };

        return o;
    }
]);