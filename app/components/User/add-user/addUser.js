app.component(
	'addUser',  
	{
    	bindings: {},
        templateUrl: 'app/components/User/add-user/add-user.html',
        controller: function($scope, auth, $state, categories) {

        	$scope.signup = {email:'',password:'',name:'',phone:''};
		    $scope.signUp = function (customer) {
		    	customer.entity = customer.entity ? customer.entity : "";
		        auth.post('signUp', {
		            customer: customer
		        }).then(function (results) {
		            auth.toast(results);
		            if (results.status == "success") {
		                $state.go('dashboard');
		            }
		        });
		    };

		    $scope.categories = categories.categories;
		    console.log($scope.categories);
		    $scope.getContractorType = function() {
		    	$("#contractor_type").fadeIn();
		    }

		    $scope.hideGetType = function() {
		    	$("#contractor_type").fadeOut();
		    }
        }
	}
);