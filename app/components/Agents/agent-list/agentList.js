/**
 * This component file controls the agent list page
 * ../agent-list
 **/
app.component(
    'agentList',
    {
        bindings: {},
        templateUrl: 'app/components/Agents/agent-list/agent-list.html',
        controller: function($scope, agents) {
            /** gets agent info */
            $scope.agents = agents.agents;
        }
    }
);
