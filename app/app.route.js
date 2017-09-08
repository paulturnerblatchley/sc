app.config(
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);

        $stateProvider
            // USER STATES
            .state('login', {
                title: 'Login Portal',
                url: '/login',
                template: '<login user="user"></login>'
            })
            .state('settings', {
                title: 'Settings',
                url: '/settings',
                template: '<settings></settings>',
                resolve: {
                    getDefaultSettings: ['proforma', function(proforma) {
                      return proforma.getDefaultSettings('table');
                    }],
                    getLenders: ['partners', function(partners) {
                      return partners.getLenders('table');
                    }],
                    getEntityVesting: ['partners', function(partners) {
                      return partners.getEntityVesting('table');
                    }],
                    getSupervisors: ['partners', function(partners) {
                      return partners.getSupervisors('table');
                    }],
                    getAssetManagers: ['partners', function(partners) {
                      return partners.getAssetManagers('table');
                    }],
                    getTasks: ['tasks', function(tasks) {
                      return tasks.getTasks('table');
                    }],
                    getSections: ['sections', function(sections) {
                      return sections.getSections('table');
                    }]
                }
            })
            .state('add-user', {
                title: 'Add A New User',
                url: '/add-user',
                template: '<add-user></add-user>',
                resolve: {
                    checkAdmin: function($sessionStorage, $state) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $state.go("dashboard", {}, {reload: true});
                        }
                    },
                    getSections: ['sections', function(sections) {
                      return sections.getSections('table');
                    }]
                }
            })
            // PROPERTY STATES
            .state('properties', {
                title: 'Properties',
                url: '/properties',
                template: '<properties></properties>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('table');
                    }],
                    getSections: ['sections', function(sections) {
                      return sections.getSections('table');
                    }],
                    getRehabs: ['rehab', function(rehab) {
                        return rehab.getAllRehabs('rehab');
                    }],
                    getLenders: ['partners', function(partners) {
                      return partners.getLenders('table');
                    }],
                    getEntityVesting: ['partners', function(partners) {
                      return partners.getEntityVesting('table');
                    }],
                    getSupervisors: ['partners', function(partners) {
                      return partners.getSupervisors('table');
                    }],
                    getAssetManagers: ['partners', function(partners) {
                      return partners.getAssetManagers('table');
                    }]
                }
            })
            // asset stats
            .state('properties.asset-stats', {
                title: 'Asset Stats',
                url: '/asset-stats',
                views: {'@': {
                  template: '<asset-stats></asset-stats>'
                }},
            })
            .state('properties.new', {
                title: 'Add A New Property',
                url: '/new-property',
                views: {'@': {
                  template: '<new-property></new-property>'
                }},
                resolve: {
                    checkAdmin: function($sessionStorage, $location) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $location.path("/");
                        }
                    }
                }
            })
            .state('properties.property', {
                title: "Manage Property",
                url: '/_{pid}_({address})_',
                views: {'@': {
                    template: '<view-property></view-property>'
                }},
                params: {
                    pid: null,
                    address: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('table', $pid);
                    }],
                    getPropertyComments: ['comments', function(comments) {
                      return comments.get('table', $pid);
                    }],
                    getRehab: ['rehab', function(rehab) {
                        return rehab.get('rehab', $pid);
                    }],
                    getOffers: ['offers', function(offers) {
                      return offers.getOffers('table', $pid);
                    }],
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('table', $pid);
                    }]
                }
            })
            // PROPERTY TABS
            /* -- Dashboard -- */
            .state('properties.property.dashboard', {
                title: "Dashboard",
                url: '/dashboard',
                params: {
                    pid: null
                },
                template: '<property-dashboard></property-dashboard>'
            })
             /* -- Pro Forma -- */
            .state('properties.property.proforma', {
                title: "Proforma",
                url: '/proforma',
                template: '<pro-forma></pro-forma>',
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getPurchaseCosts: ['proforma', function(proforma) {
                      return proforma.getPurchaseCosts('table', $pid);
                    }],
                    getSellingCosts: ['proforma', function(proforma) {
                      return proforma.getSellingCosts('table', $pid);
                    }],
                    getProjected: ['proforma', function(proforma) {
                      return proforma.getProjected('table', $pid);
                    }],
                    getActual: ['proforma', function(proforma) {
                      return proforma.getActual('table', $pid);
                    }]
                }
            })
            .state('properties.property.proforma.live', {
                title: "Live Proforma",
                url: '/live',
                template: '<proforma-live proforma="proforma"></proforma-live>'
            })
            .state('properties.property.proforma.projected', {
                title: "Projected Proforma",
                url: '/projected',
                template: '<proforma-projected proforma="proforma"></proforma-projected>',
                resolve: {
                    getProjected: ['proforma', function(proforma) {
                      return proforma.getProjected('table', $pid);
                    }]
                }
            })
            .state('properties.property.proforma.actual', {
                title: "Actual Proforma",
                url: '/actual',
                template: '<proforma-actual proforma="proforma"></proforma-actual>',
                resolve: {
                    getActual: ['proforma', function(proforma) {
                      return proforma.getActual('table', $pid);
                    }]
                }
            })
            /* -- Bids -- */
            .state('properties.property.bids', {
                title: "Bids",
                url: '/bids',
                template: '<bids></bids>',
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getOpenBids: ['bids', function(bids) {
                      return bids.getOpenBids('openBids', $pid);
                    }]
                }
            })
            .state('properties.property.new-bid', {
                title: "New Bid",
                url: '/new-bid',
                template: '<new-bid></new-bid>',
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('table', $pid);
                    }],
                    getTasks: ['tasks', function(tasks) {
                      return tasks.getTasks('table');
                    }],
                    checkAdmin: function($sessionStorage, $state) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $state.go("properties", {}, {reload: true});
                        }
                    }
                }
            })
            .state('properties.property.open-bid', {
                title: "Open Bid",
                url: '/bids/{bid_num}',
                template: '<open-bid></open-bid>',
                params: {
                    pid: null,
                    bid_num: null
                },
                resolve: {
                    params: ['$stateParams', function($stateParams){
                        $bid_num = $stateParams.bid_num;
                        $pid = $stateParams.pid;
                    }],
                    getOpenBid: ['bids', function(bids) {
                      return bids.getSingleOpenBid('openBids', $pid, $bid_num);
                    }]
              }
            })
            /* -- Rehabs -- */
            .state('properties.property.rehab', {
                title: "Rehab",
                url: '/rehab',
                template: '<view-rehab></view-rehab>'
            })
            /* -- Listings -- */
            .state('properties.property.listing', {
                title: "Listing",
                url: '/listing',
                template: '<view-listing></view-listing>'
            })
            .state('properties.property.new-offer', {
                title: "New Offer",
                url: '/new-offer',
                template: '<new-offer></new-offer>',
            })
            .state('properties.property.offers', {
                title: "Offers",
                url: '/offers',
                template: '<offers></offers>',
                resolve: {
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('table', $pid);
                    }]
                }
            })
            .state('properties.property.edit-offer', {
                title: "Edit Offer",
                url: '/offers/{offer_id}/edit-offer',
                template: '<edit-offer></edit-offer>',
                params: {
                    offer_id: null
                },
                resolve: {
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('table', $pid);
                    }]
                }
            })
            /* -- Escrow -- */
            .state('properties.property.escrow', {
                title: "Escrow",
                url: '/escrow',
                template: '<manage-escrow></manage-escrow>',
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getEscrowProgress: ['escrow', function(escrow) {
                      return escrow.getEscrowProgress('escrowProgress', $pid);
                    }],
                    getEscrowForms: ['escrow', function(escrow) {
                      return escrow.getEscrowForms('table', $pid);
                    }]
                }
            })
            /* -- Comments -- */
            .state('properties.property.comments', {
                title: "Comments",
                url: '/comments',
                template: '<comment-box></comment-box>'
            })
            /* -- Virtual Flyer */
            .state('properties.property.email', {
                title: "Virtual Flyer",
                url: '/email',
                template: '<property-email></property-email>',
                resolve: {
                    getAgents: ['agents', function(agents) {
                        return agents.getAgents('table');
                    }]
                }
            })
            // REHAB STATES
            .state('rehabs', {
                title: 'Rehabs',
                url: '/rehabs',
                template: '<rehabs></rehabs>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('table');
                    }]
                }
            })
            // LISTING STATES
            .state('listings', {
                title: 'Listings',
                url: '/listings',
                template: '<listings></listings>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('table');
                    }]
                }
            })
            .state('listings.agent-offer', {
                title: "Submit Offer",
                url: '/{pid}/agent-offer',
                views: {'@': {
                    template: '<agent-offer></agent-offer>'
                }},
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('table', $pid);
                    }]
                }
            })
            // ESCROW STATES
            .state('escrows', {
                title: 'Escrows',
                url: '/escrows',
                template: '<escrows></escrows>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('table');
                    }]
                }
            })
            // AGENT STATES
            .state('enroll', {
                title: 'Enroll As A Partner Agent',
                url: '/enroll',
                template: '<agent-enroll></agent-enroll>'
            })
            .state('thank-you', {
                title: 'Thank You',
                url: '/thank-you',
                templateUrl: 'app/components/Agents/agent-enroll/thank-you.html'
            })
            .state('agent-list', {
                title: 'Agent List',
                url: '/agent-list',
                template: '<agent-list></agent-list>',
                resolve: {
                    getAgents: ['agents', function(agents) {
                        return agents.getAgents('table');
                    }],
                    checkAdmin: function($sessionStorage, $state) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $state.go("dashboard", {}, {reload: true});
                        }
                    }
                }
            })
    }
);


app.run(function ($rootScope, $state, $stateParams, auth, $sessionStorage) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    if(!$sessionStorage.user) {
        $sessionStorage.user = {};
        $sessionStorage.user.user_role = 0;
    }

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, $location){
            $("#loading").css("display", "block");

            $('html, body').animate({scrollTop : 0 },50);

            if ($sessionStorage.user.user_role == 0 && toState.name != 'login' && toState.name != 'enroll' && toState.name != 'thank-you' && toState.name != 'listings' && toState.name != 'listings.agent-offer') {
                event.preventDefault();
                $state.go("login", {}, {reload: true});
                $("#loading").css("display", "none");
            } else if ($sessionStorage.user.user_role != 0 && toState.name == 'login') {
                event.preventDefault();
                $state.go('properties', {}, {reload: true});
                $("#loading").css("display", "none");
            }
        }
    );


    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          if (toState.name.indexOf("properties.property") !== -1) {
            $stateParams.address = $stateParams.address.replace(/-/g, " ");
            document.title = toState.title + " - " + $stateParams.address + " - Structured Capital";
          } else {
            document.title = toState.title + " - Structured Capital";
          }
          $("#loading").css("display", "none");
        }
    );

});
