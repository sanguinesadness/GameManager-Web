const logoutDialog = document.getElementById('logout-confirm-dialog-box');
const closeDialogButton = logoutDialog.querySelector('.dialog-box__buttons .close');

const actions = document.querySelectorAll('.account-page .account-sections__item');
const editAction = document.getElementById('edit-account-section');
const logoutAction = document.getElementById('logout-section');

editAction.addEventListener('click', (event) => {
    if (editAction.classList.contains('selected')) {
        event.preventDefault();
        return;
    }

    setInitialUserData();

    scaleIn(rightSection);
    scaleOut(infoSection);
});

logoutAction.addEventListener('click', () => {
    showDialog(logoutDialog);

    if (rightSection.style.display && rightSection.style.display != 'none') {
        scaleOut(rightSection);
        scaleIn(infoSection);
    }
});

actions.forEach((action) => {
    action.addEventListener('click', () => {
        actions.forEach((a) => a.classList.remove('selected'));
        action.classList.add('selected');
    });
});

closeDialogButton.addEventListener('click', () => {
    actions.forEach((a) => a.classList.remove('selected'));
});