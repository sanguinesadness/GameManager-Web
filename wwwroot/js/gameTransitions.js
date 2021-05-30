const infoSection = document.querySelector('.game-page > .info');
const middleSection = document.querySelector('.game-page > .middle-section');
const rightSection = document.querySelector('.game-page > .right-section');

function scaleIn(element, isFlex = false) {
    if (isFlex)
        element.style.display = "flex";
    else
        element.style.display = "initial";

    gsap.fromTo(element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, xPercent: 0, ease: 'back.inOut(2)' });
}

function scaleOut(element) {
    gsap.fromTo(element,
        { scale: 1, opacity: 1 },
        { scale: 0, opacity: 0, duration: 0.5, display: 'none', ease: 'back.inOut(2)' });
}

function addGameSectionsClickEvent() {
    const sections = document.querySelectorAll('.game-page .game-sections__item');
    const elements = document.querySelectorAll('.game-page .game-elements__item');

    sections.forEach((section) => {
        section.addEventListener('click', () => {
            elements.forEach((element) => element.classList.remove('selected'));
            sections.forEach((section) => section.classList.remove('selected'));
            section.classList.add('selected');
        });
    })
}