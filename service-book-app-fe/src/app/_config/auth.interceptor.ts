function AuthInterceptor($window, $q, AppConstants, Token) {
    return {

        request: function(config) {
            if(config.url.indexOf(AppConstants.baseAPI) === 0 && Token.get()) {
                config.headers[AppConstants.tokenKey] = 'Bearer ' + Token.get();
            }

            return config;
        },

        responseError: function(response) {
            if (response.status == 401) {
                Token.destroy();
                $window.location.reload();
            }

            return $q.reject(response);
        }
    }
}

export { AuthInterceptor };
