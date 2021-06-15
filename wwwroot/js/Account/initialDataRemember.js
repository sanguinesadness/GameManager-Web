let initData;

function updateRememberedData() {
    rememberUserData();
    setInitialUserData();
}

function rememberUserData() {
    initData = {
        email: email.value,
        birthdate: birthDate.value,
        genderId: gender.value
    };
}

function setInitialUserData() {
    if (!initData) {
        return;
    }
    
    email.value = initData.email;
    birthDate.value = initData.birthdate;
    gender.value = initData.genderId;
    newPassword.value = "";
    newPassword.previousElementSibling.classList.remove('lifted-up');
    
    gender.value = initData.genderId;
    checkGenderResult();
}

function isDataChanged() {
    let isChanged = false;

    if (initData.email !== email.value || initData.birthdate !== birthDate.value || initData.genderId !== gender.value || newPassword.value) {
        isChanged = true;
    }

    return isChanged;
}

// remember data on start
rememberUserData();