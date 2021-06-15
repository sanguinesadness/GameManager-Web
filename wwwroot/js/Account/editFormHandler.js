const confirmDialog = document.getElementById('password-confirm-dialog-box');
const noChangesDialog = document.getElementById('no-changes-dialog-box');
const successDialog = document.getElementById('successful-changes-dialog-box');

const saveChangesButton = document.getElementById('save-changes-button');
const discardChangesButton = document.getElementById('discard-changes-button');
const confirmChangesButton = document.getElementById('confirm-changes-button');

function sendPutRequest() {
    const inputData = getInputData();

    $.ajax({
        type: 'PUT',
        url: '/Account/EditUser',
        data: inputData,
        success: () => {
            updateRememberedData();
            closeDialog(confirmDialog);
            showDialog(successDialog);
        },
        error: (xhr, textStatus, errorThrown) => {
            // show validation errors
        }
    })
}

function getInputData() {
    return {
        id: id.value,
        email: email.value,
        birthdate: birthDate.value,
        genderId: gender.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    };
}

saveChangesButton.addEventListener('click', () => {
    if (isDataChanged()) {
        oldPassword.value = "";
        showDialog(confirmDialog);
    }
    else {
        showDialog(noChangesDialog);
    }
});

discardChangesButton.addEventListener('click', () => {
   setInitialUserData();
});

oldPassword.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        sendPutRequest();
    }
})

confirmChangesButton.addEventListener('click', () => {
    sendPutRequest();
});