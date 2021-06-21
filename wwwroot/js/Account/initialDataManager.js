let currentUserInfo;

function requestUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/Account/GetCurrentUserData',
        success: (editViewModel) => {
            currentUserInfo = editViewModel;
            currentUserInfo.birthDate = currentUserInfo.birthDate.slice(0, -9);
            setUserInfo();
        },
        error: (xhr, statusCode, errorThrown) => {
            console.log(xhr.responseJSON.detail);
        }
    });
}

function setUserInfo() {
    email.value = currentUserInfo.email;
    birthDate.value = currentUserInfo.birthDate;
    gender.value = currentUserInfo.genderId;
    
    newPassword.value = "";
    newPassword.previousElementSibling.classList.remove('lifted-up');
    
    gender.value = currentUserInfo.genderId;
    checkGenderResult();
}

function isDataChanged() {
    let isChanged = false;

    if (currentUserInfo.email != email.value
        || currentUserInfo.birthDate != birthDate.value
        || currentUserInfo.genderId != gender.value
        || newPassword.value) {
        isChanged = true;
    }
    
    return isChanged;
}