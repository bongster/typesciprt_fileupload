/******************************************************************************
 *                        Document Events
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


/******************************************************************************
 * Callback Function
 ******************************************************************************/

function showError(errors) {
  resetError();
  let EL, errMsgEL, id;
  Object.keys(errors).map(key => {
    id = DataIdMap[key];
    const EL = document.getElementById(id);
    EL.parentElement.classList.add('danger');
    errMsgEL = document.getElementById(`${id}-error-message`)
    if (errMsgEL) {
      errMsgEL.innerText = errors[key];
    }
  });
}

function resetError() {
  Object.keys(DataIdMap).map(key => {
    document.getElementById(DataIdMap[key]).parentElement.classList.remove('danger');
    errMsgEL = document.getElementById(`${DataIdMap[key]}-error-message`);
    if (errMsgEL) {
      errMsgEL.innerText = '';
    }
  });
}

/******************************************************************************
 * API
 ******************************************************************************/

const DataIdMap = {
  name: 'user-name-input',
  first_name: 'first-name-input',
  last_name: 'last-name-input',
  password: 'pwd-input',
  password_confirm: 'pwd-confirm-input',
}

function getData() {
  return Object.keys(DataIdMap).reduce((pre, key) => {
    pre[key] = document.getElementById(DataIdMap[key]).value;
    return pre;
  }, {});
}

function registerUser() {
  var data = getData();

  Validate(data).then(validatedData => {
    Http.Post('/api/register', {
      user: validatedData,
    })
      .then(() => {
        window.location.href = '/';
      },
      err => {
        err.json().then(data => {
          Utils.showAlert(document.getElementById('alert'), 'danger', data.error);
        })
      }).catch(err => {
        Utils.showAlert(document.getElementById('alert'), 'danger', 'Something went wrong, please try again!');
      })
  }, errors => {
    showError(errors);
  })
}


/******************************************************************************
 *                        Validation
 ******************************************************************************/

function required(d) {
  const data = d || getData();
  return (data.name && data.password && data.password_confirm);
}

function Validate(values) {
  const errors = {};
  return new Promise((resolve, reject) => {
    if (values.password !== values.password_confirm) {
      errors.password_confirm = 'Passwords do not match, please try again';
    }

    if (values.password.length < 6 || values.password.length > 20) {
      errors.password = 'Please enter 6-20 alpha-numeric or symbol characters';
    }

    if (Object.keys(errors).length) {
      return reject(errors);
    } else {
      return resolve(values);
    }
  })
}

