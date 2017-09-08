app.component(
	'addUser',
	{
    	bindings: {},
        templateUrl: 'app/components/User/add-user/add-user.html',
        controller: function($scope, auth, $state, sections) {

        	$scope.signup = {email:'',password:'',name:'',phone:''};
		    $scope.signUp = function (customer) {
		    	customer.entity = customer.entity ? customer.entity : "";
		    	customer.contractor_type = customer.contractor_type ? customer.contractor_type : "";
		        auth.post('signUp', {
		            customer: customer
		        }).then(function (results) {
		            auth.toast(results);
		            if (results.status == "success") {
		                $state.go('settings', {}, {reload: true});
		            }
		        });
		    };

		    $scope.sections = sections.sections;

		    $scope.getContractorType = function() {
		    	$("#contractor_type").fadeIn();
		    }

		    $scope.hideGetType = function() {
		    	$("#contractor_type").fadeOut();
		    }
        }
	}
);
