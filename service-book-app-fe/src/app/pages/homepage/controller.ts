class HomepageCtrl {

    public searchTerm;
    public noOfBooks;
    public currentPage;
    public itemsPerPage = 8;
    public booksList;

    addNewBook() {
        this.Library.openAddNewBookForm();
    }

    constructor(private $state, private $scope, private Library) {

        this.Library.getBooks();
        this.booksList = this.Library.books;

        $scope.$watch(() => this.Library.books.length, () => this.booksList = this.Library.books);
        this.noOfBooks = this.booksList.length;
        $scope.$watch('$ctrl.searchTerm', (searchTerm) => {
            this.currentPage = 1;
            this.changePage(this.currentPage);
        });

        $scope.$watch('$ctrl.currentPage', (nextPage, oldPage) => {
            if (parseInt(nextPage) != parseInt(oldPage)) {
                this.changePage(nextPage);
            }
        });
    }

    changePage(page) {
        let list;
        const begin = ((page - 1) * this.itemsPerPage),
            end     = begin + this.itemsPerPage;


        if (this.searchTerm) {
            list = this.Library.books.filter(
                (value) => ((value.bookTitle.toLowerCase().search(this.searchTerm.toLowerCase()) > -1))
            );
        } else {
            list = this.Library.books;
        }

        this.noOfBooks = list.length;
        this.booksList = list.slice(begin, end);

        this.$state.go('app.homepage', {
            page:            page,
            overwriteReload: true
        }, {
            notify: false
        });
    }

}

export {HomepageCtrl};