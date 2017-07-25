app.component(
	'propertyDashboard',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Properties/dashboard/propertyDashboardAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Properties/dashboard/propertyDashboardPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Properties/dashboard/propertyDashboardContractor.html'
            // Agent
            else if (r == '4') return 'app/components/Properties/dashboard/propertyDashboardAgent.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, singleproperty, auth, $state, Data, proforma, properties, rehab,$rootScope,partners) {
            $('.table>tbody>tr>td>.invisible-form').parent().css({
                'background-color': '#fff',
                'padding': '0',
                'height': '100%'
            });
            $('.table>tbody>tr>td>select').parent().css('background-color', '#fff');

            $('.table>tbody>tr>td>.invisible-form, .table>tbody>tr>td>select').attr("on-change","trackChanges");
           
            // get single property
            $scope.s = singleproperty.property;
            
            if ($scope.s.loan_amount == 0) {
                $scope.s.loan_amount = $scope.s.arv * 0.7;
            }

            // get proforma details
            $scope.proforma = proforma.proforma;
            $scope.proforma.open_points_cost = (($scope.s.loan_amount*1)*($scope.proforma.opening_points/100)).toFixed(0);
            $scope.proforma.interest = ((($scope.s.loan_amount*($scope.proforma.apr/100))/12)*$scope.proforma.months).toFixed(0);
            $scope.proforma.total_finance = ((($scope.proforma.interest*1) + ($scope.proforma.fees*1) + ($scope.proforma.open_points_cost*1))).toFixed(0);
            $scope.s.holding_cost = ($scope.proforma.total_finance*1) + ($scope.proforma.other_costs*1);

            // get property rehab
            $scope.r = rehab.rehab;
            $scope.s.rehab_accrued = $scope.r.accrued_costs;

            // get all properties
            $scope.properties = properties.properties;

            // get partners
            $scope.lenders = partners.lenders;
            $scope.entity_vesting = partners.entity_vesting;
            $scope.supervisors = partners.supervisors;
            $scope.asset_managers = partners.asset_managers;

            // FUNCTIONS
            function setStatusOptions(s) {
                $scope.s.status_options = ["Active","Hold","Closed"];
                var phase = s.phase;
                // Aquisition
                if (phase == 'Acquisition') {
                    $scope.s.status_options.push("Contract","Purchased");
                // Holdover
                } else if (phase == 'Holdover') {
                    $scope.s.status_options.push("Eviction","Relocation","$-4-Keys");
                // Rehab
                } else if (phase == 'Rehab') {
                    $scope.s.status_options.push("Architectural","Plan Check","Bid");
                }
            }

            setStatusOptions($scope.s);
            

            $scope.changeStatusOptions = function(s) {
                setStatusOptions(s);
            }
            
            $scope.updateProperty = function(s) {
                $("#form-loading").css("display", "block");
                var f = document.getElementById('file').files;
                if (f.length) {
                for (i=0; i<f.length; i++) {
                    if (s.images) {
                        s.images += "," + f[i].name;
                    } else {
                        s.images = f[i].name;
                    }
                }
                } else {
                    s.images = null;
                }

                s.pool_spa = (s.pool_spa === "Yes") ? 1 : 0;
                s.is_listed = (s.is_listed === "Yes") ? 1 : 0;

                function removeCash(x) {
                  x = x.replace(/[$, ]/g, "");
                  return x;
                }

                s.purchase_cost = removeCash(s.purchase_cost);
                s.arv = removeCash(s.arv);
                s.list_price = removeCash(s.list_price);
                s.sale_price = removeCash(s.sale_price);
                s.escrow_price = removeCash(s.escrow_price);
                s.rehab_estimate = removeCash(s.rehab_estimate);

                var geocoder = new google.maps.Geocoder(),
                    a = s.address + ", " + s.city + ", CA " + s.zip,
                    latitude,
                    longitude;

                geocoder.geocode( { 'address': a}, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK && results) {
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();
                        s.latlng = latitude + "," + longitude;
                        auth.post('editProperty', {
                            property: s
                        }).then(function (results) {
                            $("#form-loading").css("display", "none");
                            auth.toast(results);
                            $state.reload();
                        });
                    } else {
                        $("#form-loading").css("display", "none");
                        var results = {};
                        results.status = "error";
                        results.message = "Could not update property. Please try again later";
                        auth.toast(results);
                        $state.reload();
                    }
                });
            };

            $scope.uploadFile = function() {
                $("#form-loading").css("display", "block");
                if ($scope.myFile) {
                    var files = [];
                    for (i=0;i<$scope.myFile.length;i++) {
                        files.push($scope.myFile[i]);
                        Data('uploader').postImage(files[i], function(response) {
                        });
                    }
                }
            };

            $scope.deleteFile = function(img) {
              var ok = confirm("Are you sure you want to delete this image?");
              if (ok) {
                auth.post('deleteImage', {
                  img:img
                }).then(function(res){
                    auth.toast(res);
                    if (res.status == "success") {
                      var index = $scope.s.images.indexOf(img);
                      if (index > -1) {
                        $scope.s.images.splice(index, 1);
                      }
                    }
                    $state.reload();
                });
              }
            };

            $scope.deleteProperty = function(property) {
                var ok = confirm("Are you sure you want to delete this property?");
                if (ok) {
                  auth.post('deleteProperty', {
                    property: property
                  }).then(function(res){
                      auth.toast(res);
                      for (i = 0; i < $scope.properties.length; i++) {
                        if($scope.properties[i].pid == property.pid) {
                            $scope.properties.splice(i,1);
                        }
                      }
                      $state.go('properties', {}, {reload: true});
                  });
                }
            };

            $scope.toggle = function(event) {
                var t = $(event.target);
                var id = t[0].id;
                if (t.hasClass("glyphicon-minus")) {
                    $("#" + id + "-table").addClass("collapse");
                    t.removeClass("glyphicon-minus");
                    t.addClass("glyphicon-plus");
                } else {
                    $("#" + id + "-table").removeClass("collapse");
                    t.removeClass("glyphicon-plus");
                    t.addClass("glyphicon-minus");
                }
            }
        }
	}
); 