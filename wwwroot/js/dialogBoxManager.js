const content = document.querySelector('.content');
const dialogWrappers = document.querySelectorAll('.dialog-wrapper');

function openDialogWrapper(wrapper) {
    gsap.fromTo(wrapper,
        { opacity: 0 },
        { opacity: 1, display: 'flex', ease: 'power4.out', duration: 0.4 });
}

function openDialogBox(box) {
    gsap.fromTo(box,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power4.out', duration: 0.4 });
}

function closeDialogWrapper(wrapper) {
    gsap.to(wrapper,
        { opacity: 0, display: 'none', ease: 'power4.out', duration: 0.4 });
}

function closeDialogBox(box) {
    gsap.to(box,
        { scale: 0, opacity: 0, ease: 'power4.out', duration: 0.4 });
}

// main methods
function showDialog(dialogWrapper) {
    content.insertBefore(dialogWrapper, content.firstElementChild);

    const dialogBox = dialogWrapper.querySelector('.dialog-box');

    openDialogBox(dialogBox);
    openDialogWrapper(dialogWrapper);
}

function closeDialog(dialogWrapper) {
    const dialogBox = dialogWrapper.querySelector('.dialog-box');

    closeDialogBox(dialogBox);
    closeDialogWrapper(dialogWrapper);
}

// initial initializations
dialogWrappers.forEach((wrapper) => {
    const dialogBox = wrapper.querySelector('.dialog-box');
    const closeButton = dialogBox.querySelector('button.cancel, button.close');

    // открытие диалогового окна
    openDialogBox(dialogBox);
    openDialogWrapper(wrapper);

    // закрытие диалогового окна
    closeButton.addEventListener('click', () => {
        closeDialogBox(dialogBox);
        closeDialogWrapper(wrapper);
    });
});