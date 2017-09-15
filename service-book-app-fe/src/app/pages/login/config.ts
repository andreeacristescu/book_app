function LoginConfig($stateProvider) {
    $stateProvider
        .state('app.login', {
            url:         '/signin',
            title:       'Login',
            controller:  'LoginCtrl as $ctrl',
            templateUrl: 'pages/login/template.html',
            resolve:     {}
        });
}

export {LoginConfig};
