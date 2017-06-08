app.component(
	'propertyEmail',
	{
    	bindings: {},
        template: '<ng-include src="template"></ng-include>',
        controller: function($scope, Data, auth, $location, $state, singleproperty, agents) {
            $scope.template = 'app/components/Properties/property-email/property-email.html';;
            $scope.s = singleproperty.property;
            $scope.s.appliances = [];
            $scope.s.interior = [];
            $scope.s.exterior = [];
 			$scope.email = {
 				subject: "",
 				content: "",
 				contact_name: "",
 				contact_number: "",
 				contact_email: ""
 			}
 			
 			$scope.preview;
 			console.log($scope.s.county);
 			if ($scope.s.county == "SB") {
 				$scope.agents = agents.agentsSB;
 			} else if ($scope.s.county == "RIV") {
 				$scope.agents = agents.agentsRIV;
 			} else if ($scope.s.county == "LA") {
 				$scope.agents = agents.agentsLA;
 			} else if ($scope.s.county == "SD") {
 				$scope.agents = agents.agentsSD;
 			}

 			$scope.addAppliance = function(appliance) {
 				$scope.s.appliances.push(appliance);
 				$("#appliance").val('').focus();
 			};

 			$scope.addInterior = function(interior) {
 				$scope.s.interior.push(interior);
 				$("#interior").val('').focus();
 			};

 			$scope.addExterior = function(exterior) {
 				$scope.s.exterior.push(exterior);
 				$("#exterior").val('').focus();
 			};

		    $scope.createEmail = function(email,property,agents) {
		    	$scope.email = email;
		    	$scope.email.property = property;
		    	$scope.email.to = agents;
		    	$scope.email.from = "codrin@structuredcapital.net";
		       $('html, body').animate({
		            scrollTop : 0
		        },100);
		       $scope.template = 'app/components/Properties/property-email/email-confirm.html';

		    };

		    $scope.goBack = function() {
		    	$scope.template = 'app/components/Properties/property-email/property-email.html';
		    }

		    $scope.send = function(email) {
		    	$("#loading").css("display", "block");
                auth.post('sendEmail', {
                    email: email
                }).then(function (results) {
                	$("#loading").css("display", "none");
                    auth.toast(results);
                    if (results.status == "success") {
                        $state.go('properties.property');
                    }
                }); 
		    }            
        }
	}
); 