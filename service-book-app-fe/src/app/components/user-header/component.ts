declare const gapi: any;

class UserHeaderCtrl {
    public currentUser: any;
    public selectedFilter;
    public selectedTab = 'allBooks';
    public booksList;

    constructor(private $scope, private User, private $state, private Library) {
        this.Library.getBooks();
        this.booksList      = this.Library.books;
        this.currentUser    = User.current;
        this.$state         = $state;
        this.selectedFilter = this.selectedTab;
        this.getUpdatedBooksList();
        $scope.$watch('$ctrl.selectedFilter', () => this.getUpdatedBooksList());
    }

    signOut() {
        this.User.logOut().then(_ => this.$state.go('app.login'));
    }

    countBooks(filter) {
        return this.Library.books.filter(
            (value) => (value.status == filter)).length;
    }

    getUpdatedBooksList() {
        return this.Library.books.filter(
            (value) => (value.status == this.selectedFilter))
    }

    selectFilter(filter) {
        this.selectedFilter = filter;
    }
}

const UserHeader = {
    bindings:    {},
    controller:  UserHeaderCtrl,
    templateUrl: 'components/user-header/template.html'
};

export {UserHeader};
