app.component(
    'agentList', 
    {
        bindings: {},
        templateUrl: 'app/components/Agents/agent-list/agent-list.html',
        controller: function($scope, auth, $location, agents) {
        $scope.agents = agents.agents;
    }
});