app.component(
	'rehabs', 
	{
		bindings: {},
	    templateUrl: 'app/components/Rehabs/rehabs/rehabs.html',
	    controller: function($scope, $rootScope, $sessionStorage, properties) {
            $scope.properties = properties.rehabProperties;        
	    }
	}
); 