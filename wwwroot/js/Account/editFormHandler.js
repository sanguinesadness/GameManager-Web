const confirmDialog = document.getElementById('password-confirm-dialog-box');
const noChangesDialog = document.getElementById('no-changes-dialog-box');
const successDialog = document.getElementById('successful-changes-dialog-box');
const failedDialog = document.getElementById('failed-changes-dialog-box');

const saveChangesButton = document.getElementById('save-changes-button');
const discardChangesButton = document.getElementById('discard-changes-button');
const confirmChangesButton = document.getElementById('confirm-changes-button');
const cancelConfirmDialog = confirmDialog.querySelector('button.cancel');

function showErrorDialog(errorMsg, title = "Ошибка") {
    const titleElement = failedDialog.querySelector('.dialog-box__title');
    const errorMsgElement = failedDialog.querySelector('.dialog-box__message');
    
    errorMsgElement.innerText = errorMsg;
    titleElement.innerText = title;

    showDialog(failedDialog);
}

function sendPutRequest() {
    let editViewModel = getEditViewModel();
    
    $.ajax({
        type: 'PUT',
        url: '/Account/EditUser',
        data: editViewModel,
        success: () => {
            closeDialog(confirmDialog);
            showDialog(successDialog);
            requestUserInfo();
        },
        error: (xhr, textStatus, errorThrown) => {
            closeDialog(confirmDialog);
            showErrorDialog(xhr.responseJSON.detail, "Изменение данных");
            refreshInputBox(oldPassword.parentElement);
        }
    });
}

function getEditViewModel() {
    return {
        id: id.value,
        userName: userName.value,
        email: email.value,
        birthDate: birthDate.value,
        genderId: gender.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    };
}

function isAllDataCorrect() {
    let isCorrect = true;
    
    const inputFields = document.querySelectorAll('form[name="edit-user-form"] .input-grid input');
    inputFields.forEach((input) => {
        if (input.classList.contains('input-validation-error'))
            isCorrect = false;
    });
    
    return isCorrect;
}

saveChangesButton.addEventListener('click', () => {
    if (!isAllDataCorrect()) {
        showErrorDialog("Проверьте правильность введенных данных.", "Ошибка ввода");
        return;
    }
    
    if (isDataChanged()) {
        oldPassword.value = "";
        showDialog(confirmDialog);
    }
    else {
        showDialog(noChangesDialog);
    }
});

discardChangesButton.addEventListener('click', () => {
   requestUserInfo();
});

oldPassword.addEventListener('keyup', (event) => {
    if (event.code === "Enter") {
        sendPutRequest();
    }
});

confirmChangesButton.addEventListener('click', () => {
    sendPutRequest();
});

cancelConfirmDialog.addEventListener('click', () => {
   refreshInputBox(oldPassword.parentElement); 
});