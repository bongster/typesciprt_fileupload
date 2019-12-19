
/**
 * Utils function
 */

//const MAX_JSON_FILE_SIZE = 1000000;
const MAX_JSON_FILE_SIZE = 2000;

function AlertTemplate (alertType, message) {
  return `
  <div class="alert ${alertType}-alert">
    <i class="alert-img ${alertType}-img"></i>
    ${message}
  </div>
  `
}
function showAlert(Ele, alertType, message) {
  Ele.innerHTML = AlertTemplate(alertType, message);
}

function clearAlert(Ele) {
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

/**
 * Click Event
 */

const alertDiv = document.getElementById('alert');

let SelectedFiles = [];
document.addEventListener('click', function (event) {
  if (event.target.type === 'file') {
    return;
  };
  if (event.target.type === 'checkbox') {
    return
  }
  event.preventDefault();
  if (event.target.matches('#upload-btn')) {
    var files = document.getElementById('file-input').files;
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      const nameSplit = files[i].name.split('.');
      const postfix = nameSplit[nameSplit.length - 1];
      if (postfix === 'json') {
        formData.append('json_file', files[i]);
      } else if (postfix === 'apk') {
        formData.append('apk_file', files[i]);
      }
    }

    Validate(formData).then(validatedData => {
      Http.Upload('/api/upload', validatedData)
        .then(() => {
          showAlert(alertDiv, 'success', 'Your file was successfully uploaded!')
          //window.location.href = '/upload';
        }, err => {
          showAlert(alertDiv, 'danger', 'Something went wrong, please try again!');
        })
    });
  } else if (event.target.matches('.logout-btn')) {
    window.location.href = '/api/auth/logout';
  } else if (event.target.matches('.browser')) {
    document.getElementById('file-input').click();
  }
}, false);


document.addEventListener('change', function (event) {
  const ele = event.target;
  if (ele.matches('#file-input')) {
    showSelectedFiles(Array.from(ele.files));
  }
}, false);

/**
 * Validate Function
 * Checking file length and file size
 */
function Validate(data) {
  return new Promise((resolve, reject) => {
    if (Array.from(data).length !== 2) {
      return reject(new Error('have to select two files'));
    }
    return resolve(data);
  });
};


function FileTemplate(file, i) {
  return `
  <div class="upload-file">
     <span class="upload-file-name">${file.name}</span>
     <button class="delete_btn" onclick="removeFile(${i})"/>
  </div>
`;
};

function removeFile(i) {
  SelectedFiles.splice(i, 1);
  showSelectedFiles(SelectedFiles);
}

function disableUploadBtn(files) {
  clearAlert(alertDiv);
  if (files.length !== 2) {
    showAlert(alertDiv, 'warning', 'You have to select two files apk, json');
    document.getElementById('upload-btn').disabled = true;
    return
  }

  const postfix = SelectedFiles.map(file => file.name.split(".").pop());

  if (postfix.indexOf('json') !== -1 && postfix.indexOf('apk') !== -1) {
    const jsonFile = SelectedFiles.filter(file => file.name.split(".").pop() === 'json')[0];
    if (jsonFile.size > MAX_JSON_FILE_SIZE) {
      showAlert(alertDiv, 'warning', '[filename.json] exceeded maximum upload limit!');
      return;
    }
    document.getElementById('upload-btn').disabled = false;
  } else {
    showAlert(alertDiv, 'warning', 'Please checking file postfix type, only allow apk, json');
    document.getElementById('upload-btn').disabled = true;
  }
}

function showSelectedFiles(files = SelectedFiles) {
  SelectedFiles = files;
  disableUploadBtn(SelectedFiles);
  const uploadFileListDiv = document.getElementsByClassName('upload-file-list')[0];
  uploadFileListDiv.innerHTML = files.reduce((pre, file, i) => {
    pre += FileTemplate(file, i);
    return pre;
  }, '');
}

/**
 * Drag and Drop Event
 */
function dragAndDropEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  const ele = e.target;
  console.log(ele.type, ele)
  if (ele.matches('.upload-drag-and-drop') && e.type == 'drop') {
    showSelectedFiles(Array.from(e.dataTransfer.files));
    return
  }
}

document.addEventListener('drag', dragAndDropEvent, false);
document.addEventListener('dragstart', dragAndDropEvent, false);
document.addEventListener('dragend', dragAndDropEvent, false);
document.addEventListener('dragover', dragAndDropEvent, false);
document.addEventListener('dragenter', dragAndDropEvent, false);
document.addEventListener('dragleve', dragAndDropEvent, false);
document.addEventListener('drop', dragAndDropEvent, false);

