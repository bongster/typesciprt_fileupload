
document.addEventListener('click', function (event) {

  if (event.target.tagName === "A") {
    return
  }
  if (event.target.type === 'checkbox') {
    return
  }
  event.preventDefault();
  if (event.target.matches('#login-btn')) {
    var emailInput = document.getElementById('email-input');
    var pwdInput = document.getElementById('pwd-input');
    var rememberMeCheckBox = document.getElementById('remember-checkbox');
    var data = {
      email: emailInput.value,
      password: pwdInput.value,
      remember: rememberMeCheckBox.checked,
    };
    Http.Post('/api/auth/login', data)
      .then(() => {
        window.location.href = '/users';
      }, err => {
        alert(err, err.message);
      })
  }
}, false)
