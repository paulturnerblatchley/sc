app.component(
	'newProperty',
	{
    	bindings: {},
        templateUrl: 'app/components/Properties/new-property/new-property.html',
        controller: function($scope, Data, auth, $location, $state, partners) {
            // NEW PROPERTY CREATOR
		    $scope.newproperty = {};
		    $scope.newproperty = {
		    	status: '', 
		    	phase: '', 
		    	property_type: '',  
		    	address: '', 
		    	city: '', 
		    	zip: '', 
		    	latlng: '', 
		    	county: '', 
		    	year_built: '', 
		    	sqft: '', 
		    	lotsize: '', 
		    	beds: '', 
		    	baths: '', 
		    	listdesc: '', 
		    	pool_spa: '', 
		    	occupancy: '', 
		    	est_possession: '',
		    	lockbox_combo: '', 
		    	alarm_code: '', 
		    	asset_manager: '', 
				supervisor: '', 
		    	purchase_close_date: '', 
		    	purchase_cost: '', 
		    	entity_vesting: '', 
		    	lender: '', 
		    	rehab_estimate: '',
		    	permits: '', 
		    	loan_amount: '', 
		    	arv: '', 
		    	est_completion: '', 
		    	is_listed: '', 
		    	listing_date: '', 
		    	list_price: '', 
		    	escrow_price: '', 
		    	sale_close_date: '', 
		    	images: ''};

		    $scope.status_options = ["Active","Hold","Closed"];

		    // get partners
            $scope.lenders = partners.lenders;
            $scope.entity_vesting = partners.entity_vesting;
            $scope.supervisors = partners.supervisors;
            $scope.asset_managers = partners.asset_managers;

		    $scope.setStatusOptions = function(newproperty) {
		    	$scope.status_options = ["Active","Hold","Closed"];
                var phase = newproperty.phase;
                // Aquisition
                if (phase == 'Acquisition') {
                    $scope.status_options.push("Contract","Purchased");
                // Holdover
                } else if (phase == 'Holdover') {
                    $scope.status_options.push("Eviction","Relocation","$-4-Keys");
                // Rehab
                } else if (phase == 'Rehab') {
                    $scope.status_options.push("Architectural","Plan Check","Bid");
                }
            }

		    $scope.newProperty = function(property) {
		        $("#loading").css("display", "block");
		        var f = document.getElementById('file').files;
		        if (f.length) {
		            for (i=0; i<f.length; i++) {
		                if (i == 0) {
		                    property.images += f[i].name;
		                } else {
		                    property.images += ", " + f[i].name;
		                }
		            }
		        } else {
		            property.images = null;
		        }
		        
		        property.address = property.address;
		        property.city = property.city.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		        property.zip = property.zip;

		        var geocoder = new google.maps.Geocoder(),
		            a = property.address + ", " + property.city + ", CA " + property.zip,
		            latitude,
		            longitude,
		            res;

		        geocoder.geocode( { 'address': a}, function(results, status) {

		            if (status == google.maps.GeocoderStatus.OK && results) {
		                latitude = results[0].geometry.location.lat();
		                longitude = results[0].geometry.location.lng();
		                property.latlng = latitude + "," + longitude;
		                property.beds = parseInt(property.beds);
		                property.baths = parseInt(property.baths);
		                if (property.occupancy == 'Vacant') {
		                	property.est_possession = property.purchase_close_date;
		                } else {
		                	property.est_possession = '0000-00-00';
		                }
		                auth.post('properties', {
		                    property: property
		                }).then(function (results) {
		                    $("#loading").css("display", "none");
		                    auth.toast(results);
		                    if (results.status == "success") {
		                        $state.go('properties.property.dashboard', {pid: results.pid}, {reload: true});
		                    }
		                });
		            } else {
		                $("#loading").css("display", "none");
		                var results = {};
		                results.status = "error";
		                results.message = "There was an error finding LAT/LNG for that address. Please check it and try again.";
		                auth.toast(results);
		                $state.go($state.current, {}, {reload: true});
		            }
		        });        
		    };


		    $scope.uploadFile = function() {
		        if ($scope.myFile) {
		            var files = [];
		            for (i=0;i<$scope.myFile.length;i++) {
		                files.push($scope.myFile[i]);
		                Data('uploader').postImage(files[i], function(response) {
		                });
		            }
		        }
		    };
            
        }
	}
); 