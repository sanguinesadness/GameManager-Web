const rightSection = document.querySelector('.players-page > .right-section');
const infoSection = document.querySelector('.players-page > .info');
const emptySection = document.querySelector('.players-page > .empty-characters-section');

const playerList = document.querySelector('.players-page .player-list');
const emptyBlock = document.querySelector('.players-page .empty-players-block');

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

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