class NhInfoBoxCtrl {
    private type;
    private class;

    constructor() {}

    $onInit() {
        switch(this.type) {
            case 'error':
                this.class = 'error-message';
                break;
            case 'success':
                this.class = 'success-message';
                break;
            case 'warning':
                this.class = 'warning-message';
                break;
            case 'info':
            default:
                this.class = 'info-message';
                break;
        }
    }
}

const NhInfoBox= {
    bindings: {
        message: "@",
        type: "@"
    },
    controller: NhInfoBoxCtrl,
    templateUrl: 'components/nh-info-box/template.html',
    transclude: true
};

export { NhInfoBox };
