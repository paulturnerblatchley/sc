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
        controller: function($scope, singleproperty, auth, $state, Data) {
            $('.table>tbody>tr>td>input').parent().css('background-color', '#fff');
            $('.table>tbody>tr>td>select').parent().css('background-color', '#fff');
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

                s.pool_spa = (s.pool_spa == "Yes") ? 1 : 0;
                s.is_listed = (s.is_listed == "Yes") ? 1 : 0;

                function removeCash(x) {
                  x = x.replace(/\B(?=(\d{3})+(?!\d))/g, "");
                  if (x.indexOf('$') == 0) {
                    x = x.slice(1);
                  }
                  return x;
                }

                s.purchase_cost = removeCash(s.purchase_cost);
                s.arv = removeCash(s.arv);
                s.list_price = removeCash(s.list_price);
                s.sale_price = removeCash(s.sale_price);
                s.escrow_price = removeCash(s.escrow_price);

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
                      $state.go('properties');
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