class ConfirmationFormCtrl {

    public booksList;
    public confirmText;
    public cancelText;
    public text;
    public close;


    constructor(private Library) {
        this.confirmText = this.confirmText || 'Ok';
        this.cancelText  = this.cancelText || 'Cancel';
        this.text        = this.text || 'Are you sure? ';
    }

    removeBook() {
        this.booksList = {};
        this.Library.removeBooks(this.booksList);
        this.close();
        window.location.reload(true);
    }
}


const ConfirmationForm = {
    bindings:    {
        resolve: '<',
        close:   '&',
        dismiss: '&'
    },
    controller:  ConfirmationFormCtrl,
    templateUrl: 'components/confirmation-form/template.html',
};

export {ConfirmationForm};



