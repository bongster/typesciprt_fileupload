
document.addEventListener('click', function (event) {

  if (event.target.tagName === "A") {
    return
  }
  if (event.target.type === 'checkbox') {
    return
  }
  event.preventDefault();
  if (event.target.matches('#login-btn')) {
    var nameInput = document.getElementById('name-input');
    var pwdInput = document.getElementById('pwd-input');
    var rememberMeCheckBox = document.getElementById('remember-checkbox');
    var data = {
      name: nameInput.value,
      password: pwdInput.value,
      remember: rememberMeCheckBox.checked,
    };
    Http.Post('/api/auth/login', data)
      .then(() => {
        window.location.href = '/users';
      }, err => {
        return err.json().then(({ error }) => {
          Utils.showAlert(document.getElementById('alert'), 'danger', error);
        });
      }).catch(err => {
          Utils.showAlert(document.getElementById('alert'), 'danger', err.message);
      })
  }
}, false)

function validation() {
  var nameInput = document.getElementById('name-input');
  var pwdInput = document.getElementById('pwd-input');
  return !!(nameInput.value && pwdInput.value);
}

document.addEventListener('change', function (e) {
  document.getElementById('login-btn').disabled = !validation();
})

document.addEventListener('blur', function (e) {
  document.getElementById('login-btn').disabled = !validation();
})
