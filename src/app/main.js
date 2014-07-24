angular
    .module('notes.web')
    .run(function($rootScope, $state) {
        
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/partials/home.tmpl.html'
                // resolve: {
                //     auth: function(){
                //         return true;
                //     }
                // }
            });

        $urlRouterProvider.otherwise('/');
    });