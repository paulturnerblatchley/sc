app.component(
    'agentEnroll', 
    {
        bindings: {},
        templateUrl: 'app/components/Agents/agent-enroll/agent-enrollment.html',
        controller: function($scope, auth, $location, agents,$state) {
        $scope.agents = agents.agents;
        $scope.enroll = {first_name: '', last_name: '', email:'', phone:'', bre: '', mls_id: '', early_showing: '', open_house: '', sb: '', riv: '', la: '', sd: ''};
        $scope.enRoll = function (agent) {
            auth.post('enroll', {
                agent: agent
            }).then(function (results) {
                auth.toast(results);
                if (results.status == "success") {
                    $state.go('thank-you');
                }
            });
        };
    }
});