// Declare app level module which depends on filters, and services
angular.module('notes.web')

   // version of this seed app is compatible with angularFire 0.6
   // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
   .constant('version', '0.1')

   // where to redirect users if they need to authenticate (see module.routeSecurity)
   .constant('loginRedirectPath', '/login')

   .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('notes', {
                abstract: true,
                templateUrl: '/partials/layout_main.tmpl.html'
                // resolve: {
                //     auth: function(){
                //         return true;
                //     }
                // }
            })
            .state('notes.home', {
                url: '/',
                templateUrl: '/partials/home.tmpl.html'
            });

        $urlRouterProvider.otherwise('/');
    });