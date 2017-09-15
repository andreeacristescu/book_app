class NhButtonCtrl {
    private theme;
    private type;
    private onClick;
    private acceptedThemes = [
        'dark-purple',
        'white',
        'rock-blue',
        'dark-yellow'
    ];

    private acceptedTypes = [
        'button',
        'reset',
        'submit'
    ];

    $onInit() {
        this.type  = (this.type || 'button');
        this.theme = (this.theme || 'dark-purple');
        
        if (this.acceptedThemes.indexOf(this.theme) == -1) {
            throw new Error(`nh-button theme attribute must be one of the following: ${this.acceptedThemes.join(',')}`);
        }
        
        if (this.acceptedTypes.indexOf(this.type) == -1) {
            throw new Error(`nh-button type attribute must be one of the following: ${this.acceptedTypes.join(',')}`);
        }

    }

    clicked() {
        this.onClick();
    }

}

const NhButton = {
    bindings: {
        onClick: '&',
        theme: '@',
        type: '@'
    },
    controller: NhButtonCtrl,
    templateUrl: 'components/nh-button/template.html',
    transclude: true
};

export { NhButton };