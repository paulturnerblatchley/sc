app.component(
	'propertyMap',
	{
    	bindings: {
    		properties: '<'
    	},
        templateUrl: 'app/shared/property-map/propertyMap.html',
        controller: function($scope, $state, $rootScope, NgMap, properties, $sessionStorage, $timeout) {
    		this.$onInit = function() {
	    		$scope.properties = this.properties;
	    		
			    var marker;

			    $rootScope.$on('mapInitialized', function(evt,map) {
			        $rootScope.mymap = map;
			        $rootScope.$apply();
			    });

				function setGridHeight() {
        			setTimeout( function() {
			            var scrollTop     = $(window).scrollTop(),
			                elementOffset = $(".home-table").offset().top,
			                distance      = (elementOffset - scrollTop);
			                space         = window.innerHeight - distance;
			            $(".home-table").css("height", space + "px");
			            $("#grid1").css("height", space + "px");
			            $(".ui-grid-render-container").css("height", space + "px");
			            $(".ui-grid-viewport").css("height", space - 25 + "px");
			        }, 550);
        		}

			    $scope.showDetails = function(event,pid,latlng) {
			        $(".ui-grid-row").removeClass("ui-grid-row-selected");
			        

			        var row = $("#row" + pid).closest(".ui-grid-row"),
			            container = $(".ui-grid-viewport"),
			            infoBoxWidth = $("#info-box").css("width");
			        
			        row.addClass("ui-grid-row-selected");
			        
			        if (this.getAnimation() != null) {
			            // Do Nothing
			        } else {
			            for (i in this.map.markers) {
			                this.map.markers[i].setAnimation(null);
			            }
			            this.setAnimation(google.maps.Animation.BOUNCE);

			            latlng = latlng.split(",");
			            lat = parseFloat(latlng[0]);
			            lng = parseFloat(latlng[1]) + .035;
			            $rootScope.mymap.setCenter({lat: lat, lng: lng});
			            $rootScope.mymap.setZoom(13);
			            
			            $rootScope.$broadcast('addInfo', pid);

			        $timeout(function() {
			            container.animate({
			                scrollTop: row.offset().top - 360
			            }, 500);
			            
			            $('#info-box').show();
			            setTimeout(function() {
				            $("#info-box").css("right", "0px");
				            $("#info-box-switch").removeClass("flip");
				            $("#info-box-switch").css("right","30%");
				            $(".property-viewer ng-map").css("max-width", "70%");
			            },200);
			        }, 200);
			        }
			    }

			    $scope.hideMap = function() {
			        var map     =  $(".property-viewer ng-map"),
			            mapVP   =  $(".property-viewer"),
			            grid    =  $(".grid"),
			            gridVP  =  $(".ui-grid-viewport"),
			            ht      =  $(".home-table"),
			            s       =  $("#hide-map-switch"),
			            hideMap =  $(".hide-map");
			        if (window.innerWidth > 675) {
			            if (map.css("max-height") == "280px") {
			                mapVP.css("max-height","0px");
			                grid.css({
			                    "margin-top": "40px"
			                });
			                s.addClass("flip");
			                hideMap.css("top", "30px");
			                map.css("max-height", "0px");
			                setGridHeight();
			            } else {
			                mapVP.css("max-height","280px");
			                s.removeClass("flip");
			                hideMap.css("top", "274px");
			                map.css("max-height", "280px");
			                grid.css({
			                    "margin-top": "0"
			                });
			                setGridHeight();
			            }
			        } else {
			            if (map.css("max-height") == "200px") {
			                mapVP.css("max-height","0px");
			                grid.css({
			                    "margin-top": "40px"
			                });
			                s.addClass("flip");
			                hideMap.css("top", "30px");
			                map.css("max-height", "0px");
			                setGridHeight();
			            } else {
			                mapVP.css("max-height","280px");
			                s.removeClass("flip");
			                hideMap.css("top", "194px");
			                map.css("max-height", "200px");
			                grid.css({
			                    "margin-top": "0"
			                });
			                setGridHeight();
			            }
			        }

			        var infoBoxWidth = $("#info-box").css("width");
			        if ($("#info-box").css("right") == infoBoxWidth && map.css("max-height") == "280px") {
			            $("#info-box").show();
			            setTimeout(function() {
			                $("#info-box").css("right", "0");
			                $("#info-box-switch").css("right", infoBoxWidth);
			                $("#info-box-switch").removeClass("flip");
			                $(".property-viewer ng-map").css("max-width", "70%");
			            }, 200);
			        } else {
			            setTimeout(function() {
			                $("#info-box").hide();
			            }, 500);    
			            $("#info-box").css("right", "-" + infoBoxWidth);
			            $("#info-box-switch").css("right", "0");
			            $("#info-box-switch").addClass("flip");
			            $(".property-viewer ng-map").css("max-width", "100%");
			        }
			    }

			    $scope.reset = function() {
			        if ($(".ui-grid-row").hasClass("ui-grid-row-selected") || $rootScope.mymap.setZoom() != 8) {
			            var infoBoxWidth = $("#info-box").css("width");
			            

			            for (i in $rootScope.mymap.markers) {
			                $rootScope.mymap.markers[i].setAnimation(null);
			            }

			            $rootScope.mymap.setZoom(8);
			            $rootScope.mymap.setCenter({lat: 34.26, lng: -117.30587750000001});


			            $(".ui-grid-row").removeClass("ui-grid-row-selected");
			            $("#info-box").css("right", "-" + infoBoxWidth);
			            $("#info-box-switch").css("right", "0");
			            $("#info-box-switch").addClass("flip");
			            $(".property-viewer ng-map").css("max-width", "100%");
			            setTimeout(function() {
			                $rootScope.addInfo = {};
			                $("#info-box").hide();
			            }, 200);
			            
			            $(".ui-grid-viewport").animate({
			                scrollTop: "0"
			            }, 500);
			        } 
			    }
		    }	 
		}
	}
); 