app.factory("rehab", ['$http',
  function($http) {
    var o = {
      rehab: []
    };

    o.get = function(q, pid) {
      return $http.get(serviceBase + q).then(function(results) {
        for(i in results.data) {
          if (results.data[i].pid == pid) {
            o.rehab = results.data[i]
            o.rehab.bath = [];
            o.rehab.demo = [];
            o.rehab.drywall = [];
            o.rehab.electrical = [];
            o.rehab.ext_paint = [];
            o.rehab.fixtures = [];
            o.rehab.flooring = [];
            o.rehab.framing = [];
            o.rehab.garage_door = [];
            o.rehab.hardscape = [];
            o.rehab.hvac = [];
            o.rehab.int_paint = [];
            o.rehab.kitchen = [];
            o.rehab.landscaping = [];
            o.rehab.plumbing = [];
            o.rehab.pool_spa = [];
            o.rehab.roof = [];
            o.rehab.sales_clean = [];
            o.rehab.stucco = [];
            o.rehab.windows = [];

            for (j in o.rehab) {

              o.rehab[j].comp_perc = o.rehab[j].comp_perc + "%";

              if (/\d{4}-\d{2}-\d{2}/.test(o.rehab[j])) {
                o.rehab[j] = moment(o.rehab[j])._d;
                if (o.rehab[j] == "Invalid Date") {
                  delete o.rehab[j];
                }
              }
              if (o.rehab.hasOwnProperty(j)) {
                if (j.startsWith("bath")) {
                  var prop = j.replace("bath_", "");
                  o.rehab.bath[prop] = o.rehab[j];
                  if (j != "bath") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("demo")) {
                  var prop = j.replace("demo_", "");
                  o.rehab.demo[prop] = o.rehab[j];
                  if (j != "demo") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("drywall")) {
                  var prop = j.replace("drywall_", "");
                  o.rehab.drywall[prop] = o.rehab[j];
                  if (j != "drywall") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("electrical")) {
                  var prop = j.replace("electrical_", "");
                  o.rehab.electrical[prop] = o.rehab[j];
                  if (j != "electrical") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("ext_paint")) {
                  var prop = j.replace("ext_paint_", "");
                  o.rehab.ext_paint[prop] = o.rehab[j];
                  if (j != "ext_paint") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("fixtures")) {
                  var prop = j.replace("fixtures_", "");
                  o.rehab.fixtures[prop] = o.rehab[j];
                  if (j != "fixtures") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("flooring")) {
                  var prop = j.replace("flooring_", "");
                  o.rehab.flooring[prop] = o.rehab[j];
                  if (j != "flooring") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("framing")) {
                  var prop = j.replace("framing_", "");
                  o.rehab.framing[prop] = o.rehab[j];
                  if (j != "framing") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("garage_door")) {
                  var prop = j.replace("garage_door_", "");
                  o.rehab.garage_door[prop] = o.rehab[j];
                  if (j != "garage_door") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("hvac")) {
                  var prop = j.replace("hvac_", "");
                  o.rehab.hvac[prop] = o.rehab[j];
                  if (j != "hvac") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("hardscape")) {
                  var prop = j.replace("hardscape_", "");
                  o.rehab.hardscape[prop] = o.rehab[j];
                  if (j != "hardscape") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("int_paint")) {
                  var prop = j.replace("int_paint_", "");
                  o.rehab.int_paint[prop] = o.rehab[j];
                  if (j != "int_paint") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("kitchen")) {
                  var prop = j.replace("kitchen_", "");
                  o.rehab.kitchen[prop] = o.rehab[j];
                  if (j != "kitchen") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("landscaping")) {
                  var prop = j.replace("landscaping_", "");
                  o.rehab.landscaping[prop] = o.rehab[j];
                  if (j != "landscaping") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("plumbing")) {
                  var prop = j.replace("plumbing_", "");
                  o.rehab.plumbing[prop] = o.rehab[j];
                  if (j != "plumbing") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("pool_spa")) {
                  var prop = j.replace("pool_spa_", "");
                  o.rehab.pool_spa[prop] = o.rehab[j];
                  if (j != "pool_spa") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("roof")) {
                  var prop = j.replace("roof_", "");
                  o.rehab.roof[prop] = o.rehab[j];
                  if (j != "roof") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("sales_clean")) {
                  var prop = j.replace("sales_clean_", "");
                  o.rehab.sales_clean[prop] = o.rehab[j];
                  if (j != "sales_clean") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("stucco")) {
                  var prop = j.replace("stucco_", "");
                  o.rehab.stucco[prop] = o.rehab[j];
                  if (j != "stucco") {
                    delete o.rehab[j];
                  }
                } else if (j.startsWith("windows")) {
                  var prop = j.replace("windows_", "");
                  o.rehab.windows[prop] = o.rehab[j];
                  if (j != "windows") {
                    delete o.rehab[j];
                  }
                }
              }
            }
          }
        }
        for(i in o.rehab) {
          if (i.includes("_")) {
            o.rehab[i].name = i.replace("_"," ");
          } else {
            o.rehab[i].name = i;
          }
        }
      });
     
    }
    return o;
  }
]);