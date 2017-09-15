import angular = require('angular');

class NhInputCtrl {

    private error;
    private inputId;

    constructor(private $document) {
    }


    $onInit() {
    }

    nhFilePickerCallback(callback, value, meta) {
        if (meta.filetype == 'image') {
            const element = angular.element(this.$document[0].querySelector(`#${this.inputId}-upload`));

            element[0].click();
            element.on('change', function () {
                let file      = this.files[0];
                let reader    = new FileReader();
                reader.onload = function (e: any) {
                    callback(e.target.result, {
                        alt: ''
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    resetError() {
        this.error = '';
    }
}

const NhInput = {
    bindings:    {
        error:       '<',
        type:        '@',
        inputId:     '@',
        placeholder: '@',
        label:       '@',
        accept:      '@',
        bind:        '=',
    },
    controller:  NhInputCtrl,
    templateUrl: 'components/nh-input/template.html'
};

function NhFile(User) {
    return {
        restrict: 'A',
        scope:    {
            nhFile:        "=",
            nhFilePreview: "="
        },
        link:     function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.nhFile  = changeEvent.target.files[0];
                var reader    = new FileReader();
                reader.onload = function (loadEvent: any) {
                    scope.$apply(function () {
                        scope.nhFilePreview = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(scope.nhFile);
            });
        }
    };
}


export {NhInput, NhFile};