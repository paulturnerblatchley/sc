app.component(
	'escrows', 
	{
		bindings: {},
	    templateUrl: 'app/components/Escrows/escrows/escrows.html',
	    controller: function($scope, $rootScope, $sessionStorage, properties) {
            $scope.properties = properties.escrowProperties;        
	    }
	}
); 