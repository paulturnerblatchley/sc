app.config(
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/login');

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
                            $state.go("dashboard");
                        }
                    },
                    getCategories: ['categories', function(categories) {
                      return categories.getCategories('categories');
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
                    getCategories: ['categories', function(categories) {
                      return categories.getCategories('categories');
                    }]
                }
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
                        $r = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('properties', $r);
                    }],
                    getPropertyComments: ['comments', function(comments) {
                      return comments.get('comments', $r);
                    }],
                    getRehab: ['rehab', function(rehab) {
                        return rehab.get('rehab', $r);
                    }]
                }
            })
            // PROPERTY TABS
            /* -- Dashboard -- */
            .state('properties.property.dashboard', {
                url: '/dashboard',
                template: '<property-dashboard></property-dashboard>'
            })
             /* -- Pro Forma -- */
            .state('properties.property.proforma', {
                url: '/proforma',
                template: '<pro-forma></pro-forma>',
                resolve: {
                    getDefaultSettings: ['proforma', function(proforma) {
                      return proforma.getDefaultSettings('defaultProForma');
                    }],
                    getPurchaseCosts: ['proforma', function(proforma) {
                      return proforma.getPurchaseCosts('purchaseCosts');
                    }],
                    getProforma: ['proforma', function(proforma) {
                      return proforma.getProforma('proforma');
                    }]
                }
            })
            /* -- Bids -- */
            .state('properties.property.bids', {
                url: '/bids',
                template: '<bids></bids>'
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
            /* -- Escrow -- */
            .state('properties.property.escrow', {
                url: '/escrow',
                template: '<manage-escrow></manage-escrow>'
            })
            /* -- Comments -- */
            .state('properties.property.comments', {
                url: '/comments',
                template: '<comment-box></comment-box>'
            })
            /* -- Virtual Flyer */
            .state('properties.property.email', {
                url: '/email',
                views: {'@': {
                    template: '<property-email></property-email>'
                }},
                params: {
                    pid: null
                },
                resolve: {
                    getAgents: ['agents', function(agents) {
                        return agents.getAgents('agents');
                    }]
                }
            })
            // BID STATES
            .state('properties.property.bids.new-bid', {
                url: '/new-bid',
                views: {'@': {
                    template: '<new-bid></new-bid>'
                }},
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $r = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('properties', $r);
                    }],
                    getTasks: ['tasks', function(tasks) {
                      return tasks.getTasks('tasks');
                    }],
                    checkAdmin: function($sessionStorage, $state) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $state.go("properties");
                        }
                    }
                }
            })
            .state('properties.property.bids.open-bid', {
                url: '/open/{bid_id}',
                views: {'@': {
                    template: '<open-bid></open-bid>'
                }},
                params: {
                    pid: null,
                    bid_id: null
                },
                resolve: {
                    bid_id: ['$stateParams', function($stateParams){
                        $r = $stateParams.bid_id;
                    }],
                    getOpenBid: ['bids', function(bids) {
                      return bids.getSingleOpenBid('openBids', $r);
                    }]
              }
            })
            .state('properties.property.bids.submitted-bid', {
                url: '/submitted/{bid_id}',
                views: {'@': {
                    template: '<submitted-bid></submitted-bid>'
                }},
                params: {
                    pid: null,
                    bid_id: 1
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $r = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('properties', $r);
                    }],
                    checkAdmin: function($sessionStorage, $state) {
                        if ($sessionStorage.user.user_role == 1) {
                           return
                        } else {
                            $state.go("properties");
                        }
                    }
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
            .state('escrows.manage-escrow', {
                url: '/{pid}/manage-escrow',
                views: {'@': {
                    template: '<manage-escrow></manage-escrow>'
                }},
                params: {
                    pid: null
                },
                resolve: {
                    pid: ['$stateParams', function($stateParams){
                        $r = $stateParams.pid;
                    }],
                    getSingleProperty: ['singleproperty', function(singleproperty) {
                      return singleproperty.get('properties', $r);
                    }],
                    getEscrowProgress: ['escrow', function(escrow) {
                      return escrow.getEscrowProgress('escrowProgress', $r);
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
                            $state.go("dashboard");
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
            if ($sessionStorage.user.user_role == 0 && toState.name != 'login' && toState.name != 'enroll' && toState.name != 'thank-you') {
                event.preventDefault();
                $state.go("login");
                $("#loading").css("display", "none");
            } else if ($sessionStorage.user.user_role != 0 && toState.name == 'login') {
                event.preventDefault();
                $state.go('properties');
                $("#loading").css("display", "none");
            }
    });
    
    
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $("#loading").css("display", "none");
    });

});