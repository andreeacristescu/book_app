import { AuthInterceptor } from './auth.interceptor';

function AppConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    //$locationProvider.html5Mode(true);

    /* setup http provider for CORS */
    $httpProvider.interceptors.push(AuthInterceptor);

    cfpLoadingBarProvider.includeSpinner = false;

    /* setup main route */

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'layout/app-view.html'
        })
        .state('app.healthy', {
            url: '/healthy',
            template: 'App is working'
        });

    $urlRouterProvider.otherwise('/homepage');
}

export { AppConfig }
