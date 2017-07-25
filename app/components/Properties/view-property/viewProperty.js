app.component(
	'viewProperty',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
            var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Properties/view-property/viewPropertyAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Properties/view-property/viewPropertyPartner.html'
            // Contractor
            else if (r == '3') return 'app/components/Properties/view-property/viewPropertyContractor.html'
            // Agent
            else if (r == '4') return 'app/components/Properties/view-property/viewPropertyAgent.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, singleproperty, auth, $state, Data, $http) {
            $(".nav-tabs li").removeClass("active");
            if ($state.current.url == "/escrow") {
                $("#escrow").addClass("active");
            } else if ($state.current.url == "/rehab") {
                $("#rehab").addClass("active");
            } else if ($state.current.url.indexOf("bids") != -1 || $state.current.url == "/new-bid") {
                $("#bids").addClass("active");
            } else if ($state.current.url == "/listing" || $state.current.url == "/offers" || $state.current.url == "/new-offer" ||  $state.current.url == "/email") {
                $("#listing").addClass("active");
            } else if ($state.current.url == "/proforma" || $state.current.url == "/live" || $state.current.url == "/projected" || $state.current.url == "/actual") {
                $("#proforma").addClass("active");
            } else if ($state.current.url == "/comments") {
                $("#comments").addClass("active");
            } else {
                $("#dashboard").addClass("active");
            }
            $scope.s = singleproperty.property;
            
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
                if (s.pool_spa == "Yes" || s.pool_spa == "yes" || s.pool_spa == "Y" || s.pool_spa == "y") {
                    s.pool_spa = 1;
                } else {
                    s.pool_spa = 0;
                }
                if (s.is_listed == "Yes" || s.is_listed == "yes" || s.is_listed == "Y" || s.is_listed == "y") {
                    s.is_listed = 1;
                } else {
                    s.is_listed = 0;
                }
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
                      $state.go('properties', {}, {reload: true});
                  });
                }
            };

            $scope.changeTab = function(e) {
                $(".nav-tabs li").removeClass("active");
                var el = e.target;
                $(el).parent().addClass("active");
            }
        }
	}
); 