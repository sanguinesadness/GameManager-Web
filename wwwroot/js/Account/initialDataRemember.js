const userName = document.getElementById('username');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const gender = document.getElementById('gender-result');

let initData;

function rememberUserData() {
    initData = {
        username: userName.value,
        email: email.value,
        birthdate: birthDate.value,
        genderId: gender.value
    };
}

function setInitialUserData() {
    if (!initData) {
        return;
    }
    
    userName.value = initData.username;
    email.value = initData.email;
    birthDate.value = initData.birthdate;
    gender.value = initData.genderId;
    
    gender.setAttribute('value', initData.genderId);
    checkGenderResult();
}

// remember data on start
rememberUserData();