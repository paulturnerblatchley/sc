 app.factory("bids", ['$http',
    function($http) {

        var o = {
            openBids: [],
            singleOpenBid: {
                bid_id: '',
                cat_name: '',
                tasks: []
            },
            submittedBids: []
        };

        o.getOpenBids = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            
            for (i = 0; i < results.data.length; i++) {
                if (!o.openBids[i]) {
                    o.openBids[i] = {
                        bid_id: '',
                        bid_pid: '',
                        cat_name: ''
                    };
                    for (j = 0; j < o.openBids.length; j++) {
                        if (!o.openBids[j].bid_id) {
                            o.openBids[i].bid_id = results.data[i].bid_id;
                            o.openBids[i].bid_pid = results.data[i].bid_pid;
                            o.openBids[i].cat_name = results.data[i].cat_name;
                        }
                    }
                }
            }
          });
        };

        o.getSingleOpenBid = function(q,id) {
          return $http.get(serviceBase + q).then(function(results) {
            for (i = 0; i < results.data.length; i++) {
                if(results.data[i].bid_id == id) {
                    o.singleOpenBid.bid_id = results.data[i].bid_id;
                    o.singleOpenBid.cat_name = results.data[i].cat_name;
                    o.singleOpenBid.tasks.push({
                        task_name: results.data[i].task_name,
                        task_units: results.data[i].task_units,
                        description: results.data[i].description,
                        qty: results.data[i].qty
                    });
                }
            }
          });
        };

        return o;
    }
]);