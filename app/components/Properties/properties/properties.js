app.component(
	'properties', 
	{
		bindings: {},
	    templateUrl: 'app/components/Properties/properties/properties.html',
	    controller: function($scope, $rootScope, $sessionStorage, properties, categories, bids) {
	    	
            $scope.categories = categories.categories;
            switch ($sessionStorage.user.user_role) {
                // Admin
                case '1' || 1:
                    $scope.properties = properties.adminProperties;
                    break;
                // Partner
                case '2' || 2:
                	switch ($sessionStorage.user.entity) {
                		case 'HEF Inc.':
                			$scope.properties = properties.hefProperties;
                			break;
                		case 'SC Inc.':
                			$scope.properties = properties.scProperties;
                	}
                    break;
                // Contractor
                case '3' || 3:
                    // Get Open Bids based on contractor type
                    var typeBids = [];
                    for (k = 0; k < bids.openBids.length; k++) {
                        if ($sessionStorage.user.contractor_type == bids.openBids[k].cat_name) {
                            for (j = 0; j < properties.bidProperties.length; j++) {
                                if (bids.openBids[k].bid_pid == properties.bidProperties[j].pid) {
                                    typeBids.push(properties.bidProperties[j]);
                                }                                
                            }
                        }
                    }
                    $scope.properties = typeBids;
                    break;
                // Agent
                case '4' || 4:
                    $scope.properties = properties.listedProperties;
                    break;
                // Default
                default:
                    $scope.properties = {};
                    break
            }   
	    }
	}
); 