app.component(
	'viewListing',
	{
    	bindings: {},
        templateUrl: function($sessionStorage) {
        	var r = $sessionStorage.user.user_role;
            // Admin
            if      (r == '1') return 'app/components/Listings/view-listing/viewListingAdmin.html'
            // Partner
            else if (r == '2') return 'app/components/Listings/view-listing/viewListingPartner.html'
            // Default
            else               return 'app/components/User/login/login.html'
        },
        controller: function($scope, auth, $http, singleproperty, $state, Data) {
        	$scope.s = singleproperty.property;

            $('.table>tbody>tr>td>.invisible-form').parent().css({
                'background-color': '#fff',
                'padding': '0',
                'height': '100%'
            });

            $scope.newOffer = function() {
                $state.go("listings.new-offer", {pid: $scope.s.pid}, {reload: true});
            }

            $scope.seeOffers = function() {
                $state.go("listings.offers", {pid: $scope.s.pid}, {reload: true});
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

								function formatDate(x) {
									if (x === null) {
										x = "0000-00-00 00:00:00";
										return x;
									} else {
										x = moment(x).format('YYYY-MM-DD HH:mm:ss');
										return x;
									}
								}

								s.est_completion = formatDate(s.est_completion);
								s.purchase_close_date = formatDate(s.purchase_close_date);
								s.listing_date = formatDate(s.listing_date);
								s.sale_close_date = formatDate(s.sale_close_date);
								s.est_possession = formatDate(s.est_possession);
								s.notice_date = formatDate(s.notice_date);
								s.rehab_start = formatDate(s.rehab_start);
								s.offer_accept = formatDate(s.offer_accept);

                var geocoder = new google.maps.Geocoder(),
                    a = s.address + ", " + s.city + ", CA " + s.zip,
                    latitude,
                    longitude;

                geocoder.geocode( { 'address': a}, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK && results) {
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();
                        s.latlng = latitude + "," + longitude;
                        auth.post('editListing', {
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
        }
	}
);
