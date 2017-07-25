<!DOCTYPE html>
<html lang="en" ng-app="sc">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="true" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=no" />
    <title>Structured Capital</title>
    <style>
      .ng-hide {
          display: none!important;
      }
    </style>
    
    <!-- inject-vendor:css -->
    <link href="http://ajax.aspnetcdn.com/ajax/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-grid/4.0.4/ui-grid.min.css" type="text/css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-tree/2.22.5/angular-ui-tree.min.css"  type="text/css"/>
    <link rel="stylesheet" href="http://cdn.jsdelivr.net/angular.gantt/1.3.1/angular-gantt.min.css" type="text/css"/>
    <link rel="stylesheet" href="http://cdn.jsdelivr.net/angular.gantt/1.3.1/angular-gantt-plugins.min.css" type="text/css"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/2.1.0/toaster.min.css" rel="stylesheet" type="text/css">
    <!-- endinject -->

    <!-- inject-fonts -->
    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i|Open+Sans:300,400,700" rel="stylesheet" type="text/css">
    <!-- endinject -->

    <!-- inject:css -->
    <link href="/assets/css/custom.css" rel="stylesheet" type="text/css">
    <!-- endinject -->
    
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <base href="/">
  </head>
  <body class="{{bodylayout}}" ng-cloak>
    <loading></loading>  
    <ui-view autoscroll="true"></ui-view>
    <toaster-container toaster-options="{'time-out': 2000}"></toaster-container>
    <div id="back-to-top">
        <i class="glyphicon glyphicon-chevron-up"></i>
    </div>
    <!-- inject-vendor:js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-animate.min.js" ></script>
    <script src="assets/libs/angular/ng-file-upload-shim.min.js" ></script>
    <script src="assets/libs/angular/ng-file-upload.min.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-resource.min.js"></script>
    <script src="assets/libs/angular/ngStorage.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?&v=3&key=AIzaSyAdRvOOy-X61Hkr2CvXuEkUhgS--B2XpsU" type="text/javascript"></script>
    <script src="assets/libs/angular/ng-map.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-touch.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-local-storage/0.2.2/angular-local-storage.min.js"></script>
    <script src="assets/libs/moment.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-tree/2.22.5/angular-ui-tree.min.js"></script>
    <script src="https://cdn.jsdelivr.net/angular.moment/1.0.1/angular-moment.min.js"></script>
    <script src="http://cdn.jsdelivr.net/angular.gantt/1.3.1/angular-gantt.min.js"></script>
    <script src="http://cdn.jsdelivr.net/angular.gantt/1.3.1/angular-gantt-plugins.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-grid/4.0.4/ui-grid.min.js"></script>
    <script src="assets/libs/toaster.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/bootstrap/3.3.5/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/js/customjQuery.js"></script>
    <!-- endinject -->

    <!-- inject:js -->
    <!-- Bootstrapping -->
    <script src="app/app.module.js"></script>
    <!-- endinject -->

    <!-- inject:js -->
    <!-- Routing -->
    <script src="app/app.route.js"></script>
    <!-- endinject -->

    <!-- inject-factories:js -->
    <script src="app/components/Properties/properties/propertiesFactory.js"></script>
    <script src="app/components/Properties/new-property/imageDataFactory.js"></script>
    <script src="app/components/Properties/view-property/singlePropertyFactory.js"></script>
    <script src="app/components/Bids/bidsFactory.js"></script>
    <script src="app/components/Bids/sectionsFactory.js"></script>
    <script src="app/components/Bids/taskFactory.js"></script>
    <script src="app/components/Rehabs/rehabFactory.js"></script>
    <script src="app/components/Escrows/escrowFactory.js"></script>
    <script src="app/components/Rehabs/ganttData.js"></script>
    <script src="app/components/Agents/agentFactory.js"></script>
    <script src="app/shared/comments/commentsFactory.js"></script>
    <script src="app/components/ProForma/proFormaFactory.js"></script>
    <script src="app/components/Listings/offers/offersFactory.js"></script>
    <script src="app/components/User/dashboard/partnersFactory.js"></script>
    <!-- endinject -->

    <!-- inject-shared:js -->
    <script src="assets/js/api.js"></script>
    <script src="assets/js/filters.js"></script>
    <script src="assets/js/directives.js"></script>
    <script src="app/shared/loading/loading.js"></script>
    <script src="app/shared/header/header.js"></script>
    <script src="app/shared/footer/footer.js"></script>
    <script src="app/shared/property-map/propertyMap.js"></script>
    <script src="app/shared/property-grid/propertyGrid.js"></script>
    <script src="app/shared/info-box/infoBox.js"></script>
    <script src="app/shared/comments/commentBox.js"></script>
    <!-- endinject -->

    <!-- inject-components:js -->
    <!-- User Pages -->
    <script src="app/components/User/dashboard/dashboard.js"></script>
    <script src="app/components/User/login/login.js"></script>
    <script src="app/components/User/add-user/addUser.js"></script>
    <!-- Property Pages -->
    <script src="app/components/Properties/properties/properties.js"></script>
    <script src="app/components/Properties/view-property/viewProperty.js"></script>
    <script src="app/components/Properties/dashboard/propertyDashboard.js"></script>
    <script src="app/components/Properties/new-property/newProperty.js"></script>
    <script src="app/components/Properties/property-email/propertyEmail.js"></script>
    <!-- Asset Stats Page  -->
    <script src="app/components/Stats/assetStats.js"></script>
    <!-- Pro Forma Page -->
    <script src="app/components/ProForma/proForma.js"></script>
    <script src="app/components/ProForma/proforma-live/proformaLive.js"></script>
    <script src="app/components/ProForma/proforma-projected/proformaProjected.js"></script>
    <script src="app/components/ProForma/proforma-actual/proformaActual.js"></script>
    <!-- Bids Pages -->
    <script src="app/components/Bids/bids/bids.js"></script>
    <script src="app/components/Bids/new-bid/newBid.js"></script>
    <script src="app/components/Bids/open-bid/openBid.js"></script>
    <!-- Rehab Pages -->
    <script src="app/components/Rehabs/rehabs/rehabs.js"></script>
    <script src="app/components/Rehabs/view-rehab/viewRehab.js"></script>
    <!-- Listing Pages -->
    <script src="app/components/Listings/listings/listings.js"></script>
    <script src="app/components/Listings/view-listing/viewListing.js"></script>
    <script src="app/components/Listings/new-offer/newOffer.js"></script>
    <script src="app/components/Listings/agent-offer/agentOffer.js"></script>
    <script src="app/components/Listings/offers/offers.js"></script>
    <script src="app/components/Listings/edit-offer/editOffer.js"></script>
    <!-- Escrow Pages -->
    <script src="app/components/Escrows/escrows/escrows.js"></script>
    <script src="app/components/Escrows/manage-escrow/manageEscrow.js"></script>
    <!-- Agent Pages -->
    <script src="app/components/Agents/agent-enroll/agentEnroll.js"></script>
    <script src="app/components/Agents/agent-list/agentList.js"></script>
    <!-- endinject -->  
  </body>
</html>