 app.factory("bids", ['$http',
    function($http) {

        var o = {
            openBids: [],
            singleOpenBid: {
                bid_id: '',
                name: '',
                tasks: []
            },
            submittedBids: []
        };

        o.getOpenBids = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.openBids = [];
            for (i = 0; i < results.data.length; i++) {
                if (!o.openBids[i]) {
                    o.openBids[i] = {
                        bid_id: '',
                        bid_pid: '',
                        name: ''
                    };
                    for (j = 0; j < o.openBids.length; j++) {
                        if (!o.openBids[j].bid_id) {
                            o.openBids[i].bid_id = results.data[i].bid_id;
                            o.openBids[i].bid_num = results.data[i].bid_num;
                            o.openBids[i].bid_pid = results.data[i].bid_pid;
                            o.openBids[i].bid_total_cost = results.data[i].bid_total_cost;
                            o.openBids[i].name = results.data[i].name;
                        }
                    }
                }
            }
          });
        };

        o.getSingleOpenBid = function(q,pid,num) {
          return $http.get(serviceBase + q).then(function(results) {
            o.singleOpenBid.tasks = [];
            for (i = 0; i < results.data.length; i++) {
                if (results.data[i].bid_pid == pid && results.data[i].bid_num == num) {
                    o.singleOpenBid.bid_id = results.data[i].bid_id;
                    o.singleOpenBid.bid_num = results.data[i].bid_num;
                    o.singleOpenBid.name = results.data[i].name;
                    o.singleOpenBid.total_cost = results.data[i].bid_total_cost;
                    o.singleOpenBid.tasks.push({
                        bid_task_id: results.data[i].bid_task_id,
                        task_name: results.data[i].task_name,
                        description: results.data[i].description,
                        qty: results.data[i].qty,
                        task_units: results.data[i].task_units,
                        task_cost: results.data[i].task_cost,
                        task_total: results.data[i].task_total
                    });
                }  
            }
          });
        };

        return o;
    }
]);