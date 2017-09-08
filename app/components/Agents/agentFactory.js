/**
 * Agents Factory Service
 *
 * Gets agent information from the agents DB
 * table and makes it accessible to any
 * component that includes the 'agents' parameter
 * in its controller function.
 **/
app.factory("agents",
    ['$http', 'auth', 'toaster',
    function($http, auth, toaster) {
        /**
         * creates 'agents' obj and arrays to hold different lists of agents
         **/
        var o = {
            /** agents.agents */
            agents: [],
            /** agents.agentsSB */
            agentsSB: [],
            /** agents.agentsRIV */
            agentsRIV: [],
            /** agents.agentsLA */
            agentsLA: [],
            /** agents.agentsSD */
            agentsSD: [],
        };

        /**
         * Gets agents stored in the DB
         **/
        o.getAgents = function(q, table) {
            return $http({
              url: serviceBase + q,
              method: 'GET',
              params: {table: 'agents'}
            }).then(function(results) {
                /** put database data into agents obj, accessible as agents.agents */
                o.agents = results.data;

                /** Convert Binary to human readable yes/no */
                for(var i=0; i<o.agents.length;i++) {
                    o.agents[i].early_showing = (o.agents[i].early_showing == 1) ? "Yes" : "No";
                    o.agents[i].open_house = (o.agents[i].open_house == 1) ? "Yes" : "No";
                }

                /** Agents interested in SB */
                o.agentsSB = [];
                for (i = 0; i < o.agents.length; i++) {
                    if (o.agents[i].sb == "1") {
                        o.agentsSB.push(o.agents[i]);
                    }
                }

                /** Agents interested in RIV */
                o.agentsRIV = [];
                for (i = 0; i < o.agents.length; i++) {
                    if (o.agents[i].riv == "1") {
                        o.agentsRIV.push(o.agents[i]);
                    }
                }

                /** Agents interested in LA */
                o.agentsLA = [];
                for (i = 0; i < o.agents.length; i++) {
                    if (o.agents[i].la == "1") {
                        o.agentsLA.push(o.agents[i]);
                    }
                }

                /** Agents interested in SD */
                o.agentsSD = [];
                for (i = 0; i < o.agents.length; i++) {
                    if (o.agents[i].sd == "1") {
                        o.agentsSD.push(o.agents[i]);
                    }
                }

            });
        };
        /** return agents obj on factory function call */
        return o;
    }
]);
