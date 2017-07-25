app.component(
	'assetStats', 
	{
		bindings: {},
	    templateUrl: 'app/components/Stats/assetStatsAdmin.html',
	    controller: function($scope, $rootScope, $sessionStorage, properties, sections, bids, $http) {

            // get properties
	    	$scope.properties = properties.properties;

            // property phase count vars
            $scope.acquisitionCount = 0;
            $scope.holdoverCount = 0;
            $scope.rehabCount = 0;
            $scope.listedCount = 0;
            $scope.saleEscrowCount = 0;
            $scope.soldCount = 0;
            $scope.withdrawnCount = 0;
            $scope.totalCount = 0;

            // asset totals
            $scope.currentAssets = 0; // purchase_cost += purchase_cost
            $scope.projectedImprovements = 0; // rehab_estimate += rehab_estimate
            $scope.projectedRevenue = 0; // arv += arv
            $scope.totalProfits = 0; // profit += profit
            $scope.totalRevenue = 0; // escrow_price += escrow_price

            // loop through properties, setting vars
            for (i = 0; i < $scope.properties.length; i++) {
                // count by phase
                if ($scope.properties[i].phase == "Acquisition") {
                    $scope.acquisitionCount += 1;
                } else if ($scope.properties[i].phase == "Holdover") {
                    $scope.holdoverCount += 1;
                } else if ($scope.properties[i].phase == "Rehab") {
                    $scope.rehabCount += 1;
                } else if ($scope.properties[i].phase == "Listed") {
                    $scope.listedCount += 1;
                } else if ($scope.properties[i].phase == "Sale Escrow") {
                    $scope.saleEscrowCount += 1;
                } else if ($scope.properties[i].phase == "Sold") {
                    $scope.totalRevenue += removeCash($scope.properties[i].escrow_price);
                    $scope.soldCount += 1;
                } else if ($scope.properties[i].phase == "Withdrawn") {
                    $scope.withdrawnCount += 1;
                } 
                // total
                $scope.totalCount += 1;

                // add up assets
                $scope.currentAssets += removeCash($scope.properties[i].purchase_cost);
                $scope.projectedImprovements += removeCash($scope.properties[i].rehab_estimate);
                $scope.projectedRevenue += removeCash($scope.properties[i].arv);
                $scope.totalProfits += removeCash($scope.properties[i].profit);                
            }

            // functions
            function removeCash(x) {
              x = parseInt(x.replace(/[$, ]/g, ""));
              return x;
            }
            
	    }
	}
); 