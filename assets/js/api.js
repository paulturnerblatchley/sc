var serviceBase = 'server/v1/';

app.factory("auth", ['$http', 'toaster',
    function ($http, toaster) {

        var o = {};
        
        o.toast = function (data) {
            toaster.pop(data.status, "", data.message, 5000, 'trustedHtml');
        }
        o.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        o.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        o.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        o.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return o;
}]);