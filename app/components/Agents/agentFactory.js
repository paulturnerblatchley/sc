app.factory("agents", ['$http', 'auth', 'toaster',
    function($http, auth, toaster) {

        var o = {
            agents: [],
            agentsSB: [],
            agentsRIV: [],
            agentsLA: [],
            agentsSD: [],
        };

        o.getAgents = function(q) {
          return $http.get(serviceBase + q).then(function(results) {
            o.agents = results.data;
            for(var i=0; i<o.agents.length;i++) {
              o.agents[i].early_showing = (o.agents[i].early_showing == 1) ? "Yes" : "No";
              o.agents[i].open_house = (o.agents[i].open_house == 1) ? "Yes" : "No";
            }

            // Only show if interested in SB
            o.agentsSB = [];
            for (i = 0; i < o.agents.length; i++) {
              if (o.agents[i].sb == "1") {
                o.agentsSB.push(o.agents[i]);
              }
            }

            // Only show if interested in RIV
            o.agentsRIV = [];
            for (i = 0; i < o.agents.length; i++) {
              if (o.agents[i].riv == "1") {
                o.agentsRIV.push(o.agents[i]);
              }
            }

            // Only show if interested in LA
            o.agentsLA = [];
            for (i = 0; i < o.agents.length; i++) {
              if (o.agents[i].la == "1") {
                o.agentsLA.push(o.agents[i]);
              }
            }

            // Only show if interested in SD
            o.agentsSD = [];
            for (i = 0; i < o.agents.length; i++) {
              if (o.agents[i].sd == "1") {
                o.agentsSD.push(o.agents[i]);
              }
            }

            return results.data;
          });
        };

        return o;
    }
]);