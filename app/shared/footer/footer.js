app.component(
	'appFooter',
	{
    	bindings: {},
        templateUrl: 'app/shared/footer/footer.html',
        controller: function($scope, $state) {
        	$scope.currState = $state;

        	$scope.$watch('currState.current.name', function(newValue, oldValue) {
        		if (newValue == "home") {
	        		$("app-footer").hide();
	        	}
        	});
        	
        }
	}
); 