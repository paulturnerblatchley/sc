app.factory("singleproperty", ['$http',
  function($http) {
      var o = {
        property: []
      };

      o.get = function(q, pid) {
        return $http.get(serviceBase + q).then(function(results) {
          for(i=0;i<results.data.length;i++){
              if (results.data[i].pid == pid) {
                o.property = results.data[i];
                o.property.purchase_cost = o.property.purchase_cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                o.property.pool_spa = (o.property.pool_spa === 0) ? "No" : "Yes";
                o.property.is_listed = (o.property.is_listed === 0) ? "No" : "Yes";

                function convertDate(x) {
                  if (x == "0000-00-00") {
                    return "";
                  } else {
                    var d = x.split("-");
                    return d[1] + "/" + d[2] + "/" + d[0];
                  }
                }
                o.property.listing_date = convertDate(o.property.listing_date);
                o.property.purchase_close_date = convertDate(o.property.purchase_close_date);
                o.property.sale_close_date = convertDate(o.property.sale_close_date);
              }
          }
          var images = {};
          $http.get(serviceBase + 'propertyImages').then(function(res) {
            for(var j=0;j<res.data.length;j++) {
              if(!images[res.data[j].pid]) {
                images[res.data[j].pid] = [];
                images[res.data[j].pid].push(res.data[j].image_name);
              } else {
                images[res.data[j].pid].push(res.data[j].image_name);
              }
            }
            o.property.images = images[o.property.pid];
          });
        });
      };
      return o;
  }
]);