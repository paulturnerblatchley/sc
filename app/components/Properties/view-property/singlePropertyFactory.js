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
                
                o.property.pool_spa = (o.property.pool_spa == 0) ? "No" : "Yes";
                o.property.is_listed = (o.property.is_listed == 0) ? "No" : "Yes";

                function dateDistance(d1,d2) {
                  var oneDay = 24*60*60*1000,
                      firstDate = new Date(d1);
                  if (d2) {
                    secondDate = new Date(d2);
                  } else {
                    secondDate = new Date();
                  }
                  var distance = (Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))).toFixed(0);
                  return distance;
                }

                o.property.rehab_length = dateDistance(o.property.rehab_start,o.property.est_completion);
                o.property.rehab_days_lapsed = dateDistance(o.property.rehab_start);
                o.property.length_of_own = dateDistance(o.property.purchase_close_date);
                
                if(moment(o.property.sale_close_date)._d == "Invalid Date") {
                  o.property.escrow_days = dateDistance(o.property.offer_accept);
                } else {
                  o.property.escrow_days = dateDistance(o.property.offer_accept, o.property.sale_close_date);
                }
                

                function convertDate(x) {
                  if (x == "0000-00-00") {
                    return "";
                  } else {
                    if (/\d{4}-\d{2}-\d{2}/.test(x)) {
                      x = moment(x)._d;
                      if (x == "Invalid Date") {
                        delete x;
                      }
                    }
                    return x;
                    /*var d = x.split("-");
                    return d[1] + "/" + d[2] + "/" + d[0];*/
                  }
                }

                o.property.listing_date = convertDate(o.property.listing_date);
                o.property.sale_close_date = convertDate(o.property.sale_close_date);
                o.property.notice_date = convertDate(o.property.notice_date);
                o.property.est_possession = convertDate(o.property.est_possession);
                o.property.rehab_start = convertDate(o.property.rehab_start);
                o.property.est_completion = convertDate(o.property.est_completion);
                o.property.offer_accept = convertDate(o.property.offer_accept);

                function calculateFHA(x) {
                  if (x == "0000-00-00") {
                    o.property.fha = "N/A";
                    return "";
                  } else {
                    // ADD FHA DATE
                    var dat = new Date(x),
                        d = new Date(dat.setDate(dat.getDate() + 90)),
                        dd = d.getDate(),
                        mm = d.getMonth() + 1,
                        yyyy = d.getFullYear(),
                        fha = mm + '/' + dd + '/' + yyyy;
                    return fha;
                  }
                }

                o.property.fha = calculateFHA(o.property.purchase_close_date);
                o.property.purchase_close_date = convertDate(o.property.purchase_close_date);

                if (o.property.sale_close_date != "") {
                  o.property.dom = dateDistance(o.property.listing_date,o.property.sale_close_date);
                  o.property.dsp = dateDistance(o.property.purchase_close_date,o.property.sale_close_date);
                } else {
                  o.property.dom = dateDistance(o.property.listing_date);
                  o.property.dsp = dateDistance(o.property.purchase_close_date);
                }
              }
          }
          var images = {},
              listing_images = {};
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

          $http.get(serviceBase + 'listingImages').then(function(res) {
            for(var j=0;j<res.data.length;j++) {
              if(!listing_images[res.data[j].pid]) {
                listing_images[res.data[j].pid] = [];
                listing_images[res.data[j].pid].push(res.data[j].image_name);
              } else {
                listing_images[res.data[j].pid].push(res.data[j].image_name);
              }
            }
            o.property.listing_images = listing_images[o.property.pid];

          });
        });
      };
      return o;
  }
]);