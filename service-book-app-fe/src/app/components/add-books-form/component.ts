class AddBooksFormCtrl {
    public selectedBook;
    public name: string;
    public booksList;
    public book;

    public title       = '';
    public description = '';
    public upload      = '';
    public escape;

    constructor(private Library) {
        this.selectedBook = null;
        this.name         = '';
    }

    addBook() {
        this.Library.addBooks(this.title, this.description);
        window.location.reload(true);
    }

    // handleFileSelect(evt) {
    //     let files = evt.target.files; // FileList object
    //     // Loop through the FileList and render image files as thumbnails.
    //     for (let i = 0, f; f = files[i]; i++) {
    //         // Only process image files.
    //         if (!f.type.match('image.*')) {
    //             continue;
    //         }
    //         let reader    = new FileReader();
    //         // Closure to capture the file information.
    //         reader.onload = (function (theFile) {
    //             return function (e) {
    //                 // Render thumbnail.
    //                 let span       = document.createElement('span');
    //                 span.innerHTML = ['<img class="thumb" src="', e.target.result,
    //                     '" title="', this.escape(theFile.name), '"/>'].join('');
    //
    //                 document.getElementById('list').insertBefore(span, null);
    //                 localStorage.setItem('img', e.target.result);
    //             };
    //         })(f);
    //         // Read in the image file as a data URL.
    //         reader.readAsDataURL(f);
    //     }
    // }

    // change() {
    //     let variable = document.getElementById('files').addEventListener('change', this.handleFileSelect, false);
    //     if (localStorage.img) {
    //         let span = document.createElement('span');
    //         span.innerHTML += ['<img class="thumb" src="', localStorage.img,
    //             '" title="test"/>'].join('');
    //         document.getElementById('list').insertBefore(span, null);
    //     }
    //
    // }
}

const AddBooksForm = {
    bindings:    {
        resolve: '<',
        close:   '&',
        dismiss: '&'
    },
    controller:  AddBooksFormCtrl,
    templateUrl: 'components/add-books-form/template.html',
};

export {AddBooksForm};



