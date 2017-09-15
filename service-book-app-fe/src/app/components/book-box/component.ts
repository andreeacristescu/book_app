class BookBoxCtrl {
    public booksList;

    constructor(private Library) {
        this.Library.getBooks();
        this.booksList = this.Library.books;
        console.log(this.booksList);
    }

    confirmationForm() {
        this.Library.openConfirmationForm();
    }
}

const BookBox = {
    bindings:    {
        book:    '=',
        resolve: '<',
        close:   '&',
        dismiss: '&'
    },
    controller:  BookBoxCtrl,
    templateUrl: 'components/book-box/template.html'
};

export {BookBox};
