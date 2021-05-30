// button
const createCharacterButton = document.querySelector('.my-characters-page .left-section .create-character-button');

// pages
const characters = document.querySelector('.my-characters-page .right-section .characters');
const heroes = document.querySelector('.my-characters-page .right-section .heroes');
const info = document.querySelector('.my-characters-page .right-section .info');
var selectedPage = info;

function slideFromLeft(element) {
    element.style.display = "initial";
    gsap.fromTo(element,
        { scale: 1, opacity: 1 },
        { xPercent: 0, duration: 1, ease: "power2.out" });
}

function slideToRight(element) {
    gsap.to(element,
        { xPercent: 100, duration: 1, ease: "power2.out" });
}

function slideFromRight(element) {
    element.style.display = "initial";
    gsap.fromTo(element,
        { scale: 1, opacity: 1 },
        { xPercent: 0, duration: 1, ease: "power2.out" });
}

function slideToLeft(element) {
    gsap.to(element,
        { xPercent: -100, duration: 1, ease: "power2.out" });
}

function scaleIn(element, isFlex = false) {
    if (isFlex)
        element.style.display = "flex";
    else
        element.style.display = "initial";

    gsap.fromTo(element,
        { scale: 0, opacity: 0, xPercent: 0 },
        { scale: 1, opacity: 1, duration: 0.5, xPercent: 0, ease: 'back.inOut(2)' });
}

function scaleOut(element, displayNoneOnComplete = false) {
    gsap.fromTo(element,
        { scale: 1, opacity: 1, xPercent: 0 },
        {
            scale: 0, opacity: 0, duration: 0.5, ease: 'back.inOut(2)',
            onComplete: () => { if (displayNoneOnComplete) element.style.display = "none" }
        });
}

// note: Uses translateX animation
function showCharactersPage() {
    if (characters.classList.contains('selected'))
        return;

    slideToRight(selectedPage);
    slideFromLeft(characters);

    characters.classList.add('selected');
    selectedPage.classList.remove('selected');
    selectedPage = characters;
}

// note: Uses translateX animation
function showHeroesPage() {
    if (heroes.classList.contains('selected'))
        return;

    slideToLeft(selectedPage);
    slideFromRight(heroes);

    heroes.classList.add('selected');
    selectedPage.classList.remove('selected');
    selectedPage = heroes;
    
    clearAllCharSelection();
}

// note: Uses scale animation
function showInfoPage() {
    if (info.classList.contains('selected'))
        return;

    scaleOut(selectedPage);
    scaleIn(info);

    info.classList.add('selected');
    selectedPage.classList.remove('selected');
    selectedPage = info;

    clearAllCharSelection();
}

function setInitialPositions() {
    gsap.to(characters, { xPercent: -100, duration: 0 });
    gsap.to(heroes, { xPercent: 100, duration: 0 });
}

createCharacterButton.addEventListener('click', () => {
    showHeroesPage();
});

setInitialPositions();