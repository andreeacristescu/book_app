const AppConstants = new function () {
    this.forceSSL = true;

    this.api = {
        library: `${this.baseAPI}/library`,
    };

    this.appName    = 'Mentorina';
    this.tokenKey   = 'mentorina-auth';
    this.cookieName = 'mentorina-t';
};

export {AppConstants};