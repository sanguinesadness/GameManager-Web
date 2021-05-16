const dialogWrapper = document.querySelector('.dialog-wrapper');
const dialogBox = dialogWrapper.querySelector('.dialog-box');
const closeButton = dialogBox.querySelector('.dialog-box__button');

let animDuration = 0.4;
let easeFunction = 'power4.out';

// открытие диалогового окна
gsap.fromTo(dialogBox,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: easeFunction, duration: animDuration });

gsap.fromTo(dialogWrapper,
            { opacity: 0 },
            { opacity: 1, ease: easeFunction, duration: animDuration });

// закрытие диалогового окна
function hideDialog() {
    dialogWrapper.style.display = 'none';
}

closeButton.addEventListener('click', () => {
    gsap.to(dialogBox, 
            { scale: 0, opacity: 0, ease: easeFunction, duration: animDuration });

    gsap.to(dialogWrapper,
            { opacity: 0, ease: easeFunction, duration: animDuration, onComplete: hideDialog});
});