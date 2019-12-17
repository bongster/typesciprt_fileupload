/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#regist-btn')) {
        reigstUser();
    } else if (ele.matches('#logout-btn')) {
        logoutUser();
    }
}, false)


function reigstUser() {
    var firstNameInput = document.getElementById('first-name-input');
    var lastNameInput = document.getElementById('last-name-input');
    var NameInput = document.getElementById('user-name-input');
    var pwdInput = document.getElementById('pwd-input');
    var pwdConfirmInput = document.getElementById('pwd-confirm-input');

    var data = {
        user: {
            name: NameInput.value,
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            password: pwdInput.value,
            password_confirm: pwdConfirmInput.value,
        },
    };
    Http.Post('/api/users/add', data)
        .then(() => {
            window.location.herf = '/';
        })
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

function logoutUser() {
    Http.Get('/api/auth/logout')
        .then(() => {
            window.location.href = '/';
        })
}
