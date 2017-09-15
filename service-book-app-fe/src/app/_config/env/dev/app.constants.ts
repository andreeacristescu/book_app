const AppConstants = new function () {
    this.forceSSL = false;
    this.baseAPI  = 'http://localhost:8000';

    this.api = {
        library: `${this.baseAPI}/library`,
    };

    this.appName    = 'Book App';
    this.tokenKey   = 'book_app-auth';
    this.cookieName = 'book_app-t';
};

export {AppConstants};