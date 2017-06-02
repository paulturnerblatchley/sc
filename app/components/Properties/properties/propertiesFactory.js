app.factory("properties", ['$http',
    function($http) {

        var o = {
            properties: [],
            adminProperties: [],
            hefProperties: [],
            scProperties: [],
            bidProperties: [],
            rehabProperties: [],
            listedProperties: [],
            escrowProperties: []
        };

        o.getProperties = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.properties = results.data;
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
                for (i = 0; i < o.properties.length; i++) {
                  var id = o.properties[i].pid;
                  o.properties[i].images = images[id];
                }
            });

            function convertDate(x) {
              if (x == "0000-00-00") {
                return "";
              } else {
                var d = x.split("-");
                return d[1] + "/" + d[2] + "/" + d[0];
              }
            } 

            function convertPurchaseDate(x) {
              if (x == "0000-00-00") {
                o.properties[i].fha = "N/A";
                o.properties[i].dsp = "N/A";
                return "";
              } else {
                // ADD FHA DATE
                var dat = new Date(x),
                    d = new Date(dat.setDate(dat.getDate() + 90)),
                    dd = d.getDate(),
                    mm = d.getMonth() + 1,
                    yyyy = d.getFullYear(),
                    fha = mm + '/' + dd + '/' + yyyy;
                o.properties[i].fha = fha;
                // CALCULATE DSP
                var oneDay = 24*60*60*1000,
                    firstDate = new Date(x),
                    secondDate = new Date();
                o.properties[i].dsp = (Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))).toFixed(0);
                // return formatted date
                d = x.split("-");
                return d[1] + "/" + d[2] + "/" + d[0];
              }
            }
            function convertCash(x) {
              x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              x = "$" + x;
              return x;
            }
            
            for(var i=0; i<results.data.length;i++) {
              o.properties[i].purchase_cost = o.properties[i].purchase_cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");      
              o.properties[i].pid = parseInt(results.data[i].pid);
              o.properties[i].pool_spa = (o.properties[i].pool_spa == 0) ? "No" : "Yes";
              o.properties[i].is_listed = (o.properties[i].is_listed == 0) ? "No" : "Yes";
              o.properties[i].listing_date = convertDate(o.properties[i].listing_date);
              o.properties[i].purchase_close_date = convertPurchaseDate(o.properties[i].purchase_close_date);
              o.properties[i].sale_close_date = convertDate(o.properties[i].sale_close_date);
              o.properties[i].est_possession = convertDate(o.properties[i].est_possession);
              o.properties[i].rehab_start = convertDate(o.properties[i].rehab_start);
              o.properties[i].est_completion = convertDate(o.properties[i].est_completion);
              o.properties[i].rehab_estimate = convertCash(o.properties[i].rehab_estimate);
              o.properties[i].arv = convertCash(o.properties[i].arv);
            }

            // Push All Properties to Admin
            o.adminProperties = o.properties;

            // Push HEF Properties to HEF Partner
            o.hefProperties = [];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].entity_vesting == "HEF Inc.") {
                o.hefProperties.push(o.properties[i]);
              }
            }

            // Push SC Properties to SC Partner
            o.scProperties = [];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].entity_vesting == "SC Inc.") {
                o.scProperties.push(o.properties[i]);
              }
            }

            // Push Only Bid Properties
            o.bidProperties =[];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].phase == "Bid") {
                o.bidProperties.push(o.properties[i]);
              }
            }

            // Push Only Rehab Properties
            o.rehabProperties =[];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].phase == "Rehab") {
                o.rehabProperties.push(o.properties[i]);
              }
            }

            // Push Only Listed Properties
            o.listedProperties = [];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].phase == "Listed") {
                o.listedProperties.push(o.properties[i]);
              }
            }
            // Push Only Escrow Properties
            o.escrowProperties = [];
            for (i = 0; i < o.properties.length; i++) {
              if (o.properties[i].phase == "Escrow") {
                o.escrowProperties.push(o.properties[i]);
              }
            }

            return results.data;
          });
        };

        return o;
    }
]);