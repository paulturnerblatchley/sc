app.factory("comments", ['$http',
    function($http) {

        var o = {
            comments: []
        };

        o.get = function(q, pid) {
          return $http({
            url: serviceBase + q,
            method: "GET",
            params: {table: "comments"}
          }).then(function(results) {
            o.comments = [];
            for(i=0;i<results.data.length;i++){
                if (results.data[i].properties_pid == pid) {
                  o.comments.push(results.data[i]);
                }
            }
            $http({
              url: serviceBase + q,
              method: "GET",
              params: {table: "users"}
            }).then( function(res) {
              for(i=0;i<res.data.length;i++){
                for(j=0;j<o.comments.length;j++) {
                  if (res.data[i].uid == o.comments[j].users_uid) {
                    o.comments[j].username = res.data[i].name;
                  }
                }
              }
            });
            for(j=0;j<o.comments.length;j++) {
              // Split timestamp into [ Y, M, D, h, m, s ]
              var t = o.comments[j].created.split(/[- :]/);
              if (t[3]>12) {
                t[3] = t[3] - 12;
                t[5] = "PM";
              } else {
                t[5] = "AM"
              }
              var editedTime = t[1] + "/" + t[2] + "/" + t[0] +
                          " at " + t[3] + ":" + t[4] + t[5];
              o.comments[j].created = editedTime;
            }
          });
        }

        return o;

    }
]);
