declare const gapi: any;

class LoginCtrl {

    private auth2;
    private userEntity;

    constructor(private $state, private $timeout, private User) {
    }

    $onInit() {
        let auth2;

        this.checkIfLoggedIn();
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '594788563231-pfu7hs2rmuuebsd8bvp1q4e5f715a5st.apps.googleusercontent.com'
            }).then(() => {
                gapi.signin2.render('signInButton',
                    {
                        scope:     'email',
                        width:     250,
                        height:    40,
                        longtitle: true,
                        theme:     'dark',
                        onsuccess: this.signInCallback.bind(this),
                    }
                );
            });
        });
    }

    signInCallback(googleUser) {
        let profile              = googleUser.getBasicProfile();
        this.userEntity          = {};
        this.userEntity.Name     = profile.getName();
        this.userEntity.ImageUrl = profile.getImageUrl();
        this.User.logIn(this.userEntity);
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn(redirect = true) {
        this.$timeout(() => {
            const userLoggedIn = this.User.checkIfLoggedIn();
            if (userLoggedIn) {
                this.$state.go('app.homepage', {}, {reload: true}).catch(err => {
                    console.error(err);
                });
            }
        });
    }
}
export {LoginCtrl};
