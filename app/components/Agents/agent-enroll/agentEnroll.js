/**
 * @fileOverview
 * @name Agent Enrollment
 * @description Registers agentEnroll component file, which controls the public agent enrollment page ../enroll
 * @requires resourceDescription: template ./agent-enrollment.html
 * @requires resourceDescription: template ./thank-you.html
 */
app.component(
    'agentEnroll',
    {
        bindings: {},
        templateUrl: 'app/components/Agents/agent-enroll/agent-enrollment.html',
        /**
         * @requires /assets/js/api.js
         */
        controller: function($scope, auth, $state) {

            $scope.agent = {first_name: '', last_name: '', email:'', phone:'', bre: '', mls_id: '', early_showing: '', open_house: '', sb: '0', riv: '0', la: '0', sd: '0'};

            /**
             * @name Enroll
             * @description Posts info agent inputs to the database then sends them to the /thank-you page
             * @param {Object} agent - agent object from above, values defined by the user
             */
            $scope.enroll = function (agent) {
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
    }
);
