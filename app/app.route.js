app.config(
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);

        $stateProvider
            // USER STATES
            .state('login', {
                url: '/login',
                template: '<login user="user"></login>'
            })
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>',
                resolve: {
                    getDefaultSettings: ['proforma', function(proforma) {
                      return proforma.getDefaultSettings('defaultProForma');
                    }],
                    getLenders: ['partners', function(partners) {
                      return partners.getLenders('getLenders');
                    }],
                    getEntityVesting: ['partners', function(partners) {
                      return partners.getEntityVesting('getEntityVesting');
                    }],
                    getSupervisors: ['partners', function(partners) {
                      return partners.getSupervisors('getSupervisors');
                    }],
                    getAssetManagers: ['partners', function(partners) {
                      return partners.getAssetManagers('getAssetManagers');
                    }],
                    getTasks: ['tasks', function(tasks) {
                      return tasks.getTasks('tasks');
                    }],
                    getSections: ['sections', function(sections) {
                      return sections.getSections('sections');
                    }]
                }
            })
            .state('add-user', {
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
                      return sections.getSections('sections');
                    }]
                }
            })
            // PROPERTY STATES
            .state('properties', {
                url: '/properties',
                template: '<properties></properties>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('properties');
                    }],
                    getOpenBids: ['bids', function(bids) {
                      return bids.getOpenBids('openBids');
                    }],
                    getSections: ['sections', function(sections) {
                      return sections.getSections('sections');
                    }],
                    getRehabs: ['rehab', function(rehab) {
                        return rehab.getAllRehabs('rehab');
                    }],
                    getLenders: ['partners', function(partners) {
                      return partners.getLenders('getLenders');
                    }],
                    getEntityVesting: ['partners', function(partners) {
                      return partners.getEntityVesting('getEntityVesting');
                    }],
                    getSupervisors: ['partners', function(partners) {
                      return partners.getSupervisors('getSupervisors');
                    }],
                    getAssetManagers: ['partners', function(partners) {
                      return partners.getAssetManagers('getAssetManagers');
                    }]
                }
            })  
            // asset stats
            .state('properties.asset-stats', {
                url: '/asset-stats',
                views: {'@': {
                  template: '<asset-stats></asset-stats>'
                }},
            })    
            .state('properties.new', {
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
                url: '/{pid}',
                views: {'@': {
                    template: '<view-property></view-property>'
                }},
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $pid = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('properties', $pid);
                    }],
                    getPropertyComments: ['comments', function(comments) {
                      return comments.get('comments', $pid);
                    }],
                    getRehab: ['rehab', function(rehab) {
                        return rehab.get('rehab', $pid);
                    }],
                    getOffers: ['offers', function(offers) {
                      return offers.getOffers('getOffers', $pid);
                    }],
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('proforma', $pid);
                    }]
                }
            })
            // PROPERTY TABS
            /* -- Dashboard -- */
            .state('properties.property.dashboard', {
                url: '/dashboard',
                params: {
                    pid: null
                },
                template: '<property-dashboard></property-dashboard>'
            })
             /* -- Pro Forma -- */
            .state('properties.property.proforma', {
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
                      return proforma.getPurchaseCosts('purchaseCosts', $pid);
                    }],
                    getSellingCosts: ['proforma', function(proforma) {
                      return proforma.getSellingCosts('sellingCosts', $pid);
                    }],
                    getProjected: ['proforma', function(proforma) {
                      return proforma.getProjected('projectedProForma', $pid);
                    }],
                    getActual: ['proforma', function(proforma) {
                      return proforma.getActual('actualProForma', $pid);
                    }]
                }
            })
            .state('properties.property.proforma.live', {
                url: '/live',
                template: '<proforma-live proforma="proforma"></proforma-live>'
            })
            .state('properties.property.proforma.projected', {
                url: '/projected',
                template: '<proforma-projected proforma="proforma"></proforma-projected>',
                resolve: {
                    getProjected: ['proforma', function(proforma) {
                      return proforma.getProjected('projectedProForma', $pid);
                    }]
                }
            })
            .state('properties.property.proforma.actual', {
                url: '/actual',
                template: '<proforma-actual proforma="proforma"></proforma-actual>',
                resolve: {
                    getActual: ['proforma', function(proforma) {
                      return proforma.getActual('actualProForma', $pid);
                    }]
                }
            })
            /* -- Bids -- */
            .state('properties.property.bids', {
                url: '/bids',
                template: '<bids></bids>',
                resolve: {
                    getOpenBids: ['bids', function(bids) {
                      return bids.getOpenBids('openBids');
                    }]
                }
            })
            .state('properties.property.new-bid', {
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
                      return singleproperty.get('properties', $pid);
                    }],
                    getTasks: ['tasks', function(tasks) {
                      return tasks.getTasks('tasks');
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
                url: '/rehab',
                template: '<view-rehab></view-rehab>'
            })
            /* -- Listings -- */
            .state('properties.property.listing', {
                url: '/listing',
                template: '<view-listing></view-listing>'
            })
            .state('properties.property.new-offer', {
                url: '/new-offer',
                template: '<new-offer></new-offer>',
            })
            .state('properties.property.offers', {
                url: '/offers',
                template: '<offers></offers>',
                resolve: {
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('proforma', $pid);
                    }]
                }
            })
            .state('properties.property.edit-offer', {
                url: '/offers/{offer_id}/edit-offer',
                template: '<edit-offer></edit-offer>',
                params: {
                    offer_id: null
                },
                resolve: {
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('proforma', $pid);
                    }]
                }
            })
            /* -- Escrow -- */
            .state('properties.property.escrow', {
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
                      return escrow.getEscrowForms('escrowForms', $pid);
                    }]
                }
            })
            /* -- Comments -- */
            .state('properties.property.comments', {
                url: '/comments',
                template: '<comment-box></comment-box>'
            })
            /* -- Virtual Flyer */
            .state('properties.property.email', {
                url: '/email',
                template: '<property-email></property-email>',
                resolve: {
                    getAgents: ['agents', function(agents) {
                        return agents.getAgents('agents');
                    }]
                }
            })            
            // REHAB STATES
            .state('rehabs', {
                url: '/rehabs',
                template: '<rehabs></rehabs>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('properties');
                    }]
                }
            })
            // LISTING STATES
            .state('listings', {
                url: '/listings',
                template: '<listings></listings>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('properties');
                    }]
                }
            })
            .state('listings.agent-offer', {
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
                      return singleproperty.get('properties', $pid);
                    }]
                }
            })
            // ESCROW STATES
            .state('escrows', {
                url: '/escrows',
                template: '<escrows></escrows>',
                resolve: {
                    getProperties: ['properties', function(properties) {
                        return properties.getProperties('properties');
                    }]
                }
            })
            // AGENT STATES
            .state('enroll', {
                url: '/enroll',
                template: '<agent-enroll></agent-enroll>'
            })
            .state('thank-you', {
                url: '/thank-you',
                templateUrl: 'app/components/Agents/agent-enroll/thank-you.html'
            })
            .state('agent-list', {
                url: '/agent-list',
                template: '<agent-list></agent-list>',
                resolve: {
                    getAgents: ['agents', function(agents) {
                        return agents.getAgents('agents');
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
            $("#loading").css("display", "none");
        }
    );

});