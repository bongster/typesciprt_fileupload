/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
  event.preventDefault();
  var ele = event.target;
  if (ele.matches('#register-btn')) {
    registerUser();
  } else if (ele.matches('#logout-btn')) {
    logoutUser();
  }
}, false)

document.addEventListener('change', function (event) {
  document.getElementById('register-btn').disabled = !required();
})


function registerUser() {
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
  Http.Post('/api/register', data)
    .then(() => {
      window.location.href = '/';
    })
}


/******************************************************************************
 *                        Validation
 ******************************************************************************/

function required() {
  var NameInput = document.getElementById('user-name-input');
  var pwdInput = document.getElementById('pwd-input');
  var pwdConfirmInput = document.getElementById('pwd-confirm-input');
  return (NameInput.value && pwdInput.value && pwdConfirmInput.value);
}

function validation() {
  const errors = {};
  var pwdInput = document.getElementById('pwd-input');
  var pwdConfirmInput = document.getElementById('pwd-confirm-input');
  
  if (pwdInput.value !== pwdConfirmInput.value) {
    errors['pwd-confirm-input'] = 'Passwords do not match, please try again';
  }

  return errors;
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
