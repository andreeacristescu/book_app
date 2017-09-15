class TokenService {
    constructor(private AppConstants, private $cookies) {
    }

    save(token) {
        var cookieExp = new Date();

        cookieExp.setDate(cookieExp.getDate() + 7); // 1 week

        this.$cookies.putObject(this.AppConstants.cookieName, token, {
            expires: cookieExp
        });
    }

    get() {
        return this.$cookies.getObject(this.AppConstants.cookieName) || null;
    }

    destroy() {
        this.$cookies.remove(this.AppConstants.cookieName);
    }
}

export { TokenService };
