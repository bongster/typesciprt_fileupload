const Utils = {};
const MAX_JSON_FILE_SIZE = 2000;

Utils.AlertTemplate = function (alertType, message) {
  return `
  <div class="alert ${alertType}-alert">
    <i class="alert-img ${alertType}-img"></i>
    ${message}
  </div>
  `
}

Utils.showAlert = function(Ele, alertType, message) {
  Ele.innerHTML = Utils.AlertTemplate(alertType, message);
}

Utils.clearAlert = function (Ele) {
  Ele.innerHTML = '';
}


/*
  *
  * checkbox click event
  *
  * */
document.addEventListener('click', function (event) {
  const el = event.target;
  if (el.className.indexOf('checkbox') === -1) {
    return
  }

  if (el.className.indexOf('checked') === -1) {
    el.classList.add('checked');
    el.value = true;
  } else {
    el.classList.remove('checked');
    el.value = false;
  }
})