function AppRun(AppConstants, $rootScope, $location, $window, $state) {

    if (AppConstants.forceSSL) {
        if ($location.protocol() !== 'https') {
            $window.location.href = $location.absUrl().replace('http', 'https');
        }
    }

    $rootScope.$on('$stateChangeError', function (evt, to, toParams, from, fromParams, error) {
        if (error.redirectTo) {
            $state.go(error.redirectTo, {}, { reload: true });
        } else {
            $state.go('app.login', { status: error.status }, { reload: true })
        }

        return false;
    });

    /* change page title based on state */
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.setPageTitle(toState.title);
    });

    /* helper method for setting the page's title */
    $rootScope.setPageTitle = (title) => {
        $rootScope.pageTitle = '';
        if (title) {
            $rootScope.pageTitle += title;
            $rootScope.pageTitle += ' \u2014 ';
        }
        $rootScope.pageTitle += AppConstants.appName;
    };
}

export { AppRun };
