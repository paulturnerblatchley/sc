app.component(
	'listings', 
	{
		bindings: {},
	    templateUrl: 'app/components/Listings/listings/listings.html',
	    controller: function($scope, $rootScope, $sessionStorage, properties) {
            $scope.properties = properties.listedProperties;        
	    }
	}
); 