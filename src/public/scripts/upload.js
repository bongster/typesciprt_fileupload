
/**
 * Click Event
 */

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
          window.location.href = '/upload';
        }, err => {
          console.log(err);
        })
    }, err => alert(err.message));
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
  document.getElementById('upload-btn').disabled = !(files.length === 2);
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

