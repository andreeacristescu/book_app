function HomepageConfig($stateProvider) {
    $stateProvider
        .state('app.homepage', {
            url:         '/homepage',
            title:       'Homepage',
            controller:  'HomepageCtrl as $ctrl',
            templateUrl: 'pages/homepage/template.html',
            resolve:     {
                ensureAuth: function (User) {
                    return User.ensureAuth(true);
                },
            }
        });
}

export {HomepageConfig};
