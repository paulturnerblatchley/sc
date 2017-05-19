app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

app.filter('pidFilter', function() {
  return function(properties, pid) {
    var out = [];
    for (i = 0; i < properties.length; i++){
      if(properties[i].pid == pid) {
        out.push(properties[i]);
      }
    }
    return out;
  }
});

app.filter('bidFilter', function() {
  return function(bids, pid) {
    var out = [];
    for (i = 0; i < bids.length; i++){
      if(bids[i].bid_pid == pid) {
        out.push(bids[i]);
      }
    }
    return out;
  }
});

app.filter('sqftFilter', function() {
  return function(properties, min) {
    var out = [];
    for (i = 0; i < properties.length; i++){
      sqftNum = parseInt(properties[i].sqft.replace(',', ''), 10);

      if(sqftNum >= min) {
        out.push(properties[i]);
      }
      
    }
    
    return out;
  }
});

app.filter('lotsizeFilter', function() {
  return function(properties, min) {
    var out = [];
    for (i = 0; i < properties.length; i++){
      lotsizeNum = parseInt(properties[i].lotsize.replace(',', ''), 10);

      if(lotsizeNum >= min) {
        out.push(properties[i]);
      }
      
    }
    
    return out;
  }
});