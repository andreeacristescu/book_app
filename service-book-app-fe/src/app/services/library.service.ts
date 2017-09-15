import angular = require('angular');

class LibraryService {
    books = [];
    modalInstance;

    constructor(private $uibModal) {
    }

    getBooks() {
        let books = JSON.parse(localStorage.getItem('booksList')) || [];
        for (let i = 0, len = books.length; i < len; ++i) {
            localStorage.getItem(localStorage.key(i));
        }
        this.books = books;
        return books;
    }

    addBooks(title, description, upload) {
        let oldBooks = JSON.parse(localStorage.getItem('booksList')) || [];
        upload       = this.uploadFile();
        let newBook  = {
            'bookTitle':       title,
            'bookDescription': description,
            'bookUpload':      upload
        };
        oldBooks.push(newBook);
        this.books = oldBooks;
        this.modalInstance.close();
        localStorage.setItem('booksList', JSON.stringify(oldBooks));
    };

    removeBooks(booksIndex) {
        let booksList = JSON.parse(localStorage.booksList);
        let index     = booksList.indexOf(booksIndex);
        booksList.splice(index, 1);
        this.books = booksList;
        localStorage.setItem('booksList', JSON.stringify(booksList));
    }

    openAddNewBookForm() {
        this.modalInstance = this.$uibModal.open({
            component: 'addBooksForm',
            resolve:   {}
        });

        this.modalInstance.result.then(
            (closeData) => {
            },
            (dismissData) => {
            }
        );
    }

    openConfirmationForm() {
        this.modalInstance = this.$uibModal.open({
            component: 'confirmationForm',
            resolve:   {}
        });

        this.modalInstance.result.then(
            (closeData) => {
            },
            (dismissData) => {
            }
        );
    }

    uploadFile() {
        // let imgInput     = document.getElementById("image-input"),
        //     imgContainer = document.getElementById("image-container"),
        //     updateUi     = function () {
        //         (<HTMLImageElement>imgContainer).src = window.localStorage.getItem("image-base64");
        //     },
        //     bindUi       = function () {
        //         imgInput.addEventListener("change", function () {
        //             let files: any;
        //             if (files.length) {
        //                 let reader    = new FileReader();
        //                 reader.onload = function (e: any) {
        //                     window.localStorage.setItem("image-base64", e.target.result);
        //                     updateUi();
        //                 };
        //                 reader.readAsDataURL(files[0]);
        //             }
        //         }, false);
        //     };
        //
        // updateUi();
        // bindUi();


        // let escape;
        //
        // function handleFileSelect(evt) {
        //     let files = evt.target.files;
        //     for (let i = 0, f; f = files[i]; i++) {
        //         if (!f.type.match('image.*')) {
        //             continue;
        //         }
        //         let reader    = new FileReader();
        //         reader.onload = (function (theFile) {
        //             return function (e) {
        //                 let span       = document.createElement('span');
        //                 span.innerHTML = ['<img class="thumb" src="', e.target.result,
        //                     '" title="', escape(theFile.name), '"/>'].join('');
        //                 document.getElementById('list').insertBefore(span, null);
        //                 localStorage.setItem('img', e.target.result);
        //             };
        //         })(f);
        //         reader.readAsDataURL(f);
        //     }
        // }
        //
        // document.getElementById('files').addEventListener('change', handleFileSelect, false);
        // if (localStorage.img) {
        //     let span = document.createElement('span');
        //     span.innerHTML += ['<img class="thumb" src="', localStorage.img,
        //         '" title="test"/>'].join('');
        //     document.getElementById('list').insertBefore(span, null);
        // }


        // let bannerImage = document.getElementById('bannerImg');
        // let res         = document.getElementById('res');
        // let img         = document.getElementById('tableBanner');
        // let files: any;
        //
        // bannerImage.addEventListener('change', function () {
        //     let file = files[0];
        //     if (file.type.indexOf('image') < 0) {
        //         res.innerHTML = 'invalid type';
        //         return;
        //     }
        //     let fReader    = new FileReader();
        //     fReader.onload = function () {
        //         (<HTMLImageElement>img).src = fReader.result;
        //         localStorage.setItem("imgData", getBase64Image(img));
        //     };
        //     fReader.readAsDataURL(file);
        // });
        //
        // function getBase64Image(img) {
        //     let canvas    = document.createElement("canvas");
        //     canvas.width  = img.width;
        //     canvas.height = img.height;
        //     let ctx       = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0);
        //     let dataURL = canvas.toDataURL("image/png");
        //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // }
        //
        // function fetchImage() {
        //     let dataImage               = localStorage.getItem('imgData');
        //     (<HTMLImageElement>img).src = "data:image/png;base64," + dataImage;
        // }
        //
        // fetchImage();

        let bannerImage = document.getElementById('bannerImg');
        let res         = document.getElementById('res');
        let img         = document.getElementById('tableBanner');
        let files: any;

        bannerImage.addEventListener('change', function () {
            let file    = files[0];
            let maxSize = 3000000;

            if (file.type.indexOf('image') < 0) {
                res.innerHTML = 'Invalid type';
                return;
            }
            let fReader    = new FileReader();
            fReader.onload = function () {
                img.onload                  = function () {
                    try {
                        localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
                    }
                    catch (e) {
                        let msg = e.message.toLowerCase();
                        if (msg.indexOf('storage') > -1 || msg.indexOf('quota') > -1) {
                            if (file.type.match(/jpe?g/)) {
                                console.log('reducing jpeg quality');
                                localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
                            }
                            else {
                                console.log('reducing png size');
                                let maxPxSize = 750000,
                                    imgSize   = ((<HTMLImageElement>img).width * (<HTMLImageElement>img).height);
                                localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
                            }
                        }
                    }
                };
                (<HTMLImageElement>img).src = fReader.result;
            };
            fReader.readAsDataURL(file);
        });

        function getBase64Image(img, sizeRatio, type, quality) {
            if (type.indexOf('svg+xml') > 0) return img.src;
            if (type.match(/jpe?g/)) {
                if (sizeRatio <= 1) return img.src;
            }
            else type = 'image/png';
            if (!quality) quality = 1;
            let canvas    = document.createElement("canvas");
            canvas.width  = (sizeRatio > 1) ? (img.width / sizeRatio) : img.width;
            canvas.height = (sizeRatio > 1) ? (img.height / sizeRatio) : img.height;
            let ctx       = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL(type, quality);
        }

        function fetchImage() {
            (<HTMLImageElement>img).src = localStorage.getItem('imgData');
        }

        fetchImage();

    }

}

export {LibraryService};




