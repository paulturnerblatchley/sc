app.factory("Data",['$resource','$localStorage', '$sessionStorage',
  function($resource,$localStorage,$sessionStorage) {
      return function(link) {
          return $resource(serviceBase+link,{},{
              postImage: {
                method:'POST',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
              },
              two_query:{
                url:serviceBase+link,
                method:'GET',isArray:false,
                params:{
                  company_code:'@company_code',
                  event_code:'@event_code'
                }
              }
          });
          function formDataObject (data) {
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
          }
      }
}
]);