function ShowIfAuthed(User) {
    return {
        restrict: 'A',
        link:     function (scope, element) {
            if (User.checkIfLoggedIn(false)) {
                element.css({display: 'inherit'});
            }
            else {
                element.css({display: 'none'});
            }
        }
    };
}

export {ShowIfAuthed};
