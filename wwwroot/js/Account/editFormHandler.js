const confirmDialog = document.getElementById('password-confirm-dialog-box');

const saveChangesButton = document.getElementById('save-changes-button');
const discardChangesButton = document.getElementById('discard-changes-button');
const confirmChangesButton = document.getElementById('confirm-changes-button');

saveChangesButton.addEventListener('click', () => {
   showDialog(confirmDialog); 
});

discardChangesButton.addEventListener('click', () => {
   setInitialUserData();
});