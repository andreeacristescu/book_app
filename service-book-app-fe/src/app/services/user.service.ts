import angular = require('angular');
declare const gapi: any;

class UserService {
    public current: any;

    constructor(private $q) {
        this.current   = null;
        const userItem = localStorage.getItem('userEntity');
        this.current   = userItem == null ? null : JSON.parse(userItem);
    }

    logOut() {
        localStorage.removeItem('userEntity');
        this.current  = null;
        const promise = this.$q.defer();
        gapi.load('auth2', () => {
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(promise.resolve).catch(promise.reject);
        });
        return promise.promise;
    }

    logIn(userInfo) {
        this.current = userInfo;
        if (userInfo != null) localStorage.setItem('userEntity', JSON.stringify(userInfo));
        else localStorage.removeItem('userEntity');
    }

    checkIfLoggedIn() {
        return this.current != null;
    }

    ensureAuth(mustBeLoggedIn) {
        if (!this.current && mustBeLoggedIn) {
            return this.$q.reject({redirectTo: 'app.login'}, { reload: true });
        } else if (this.current && !mustBeLoggedIn) {
            return this.$q.reject({redirectTo: 'app.homepage'});
        } else {
            return this.$q.resolve();
        }
    }
}

export {UserService};
