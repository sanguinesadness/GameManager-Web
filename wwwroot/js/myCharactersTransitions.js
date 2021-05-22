// buttons
const createCharacterButton = document.querySelector('.my-characters-page .left-section .create-character-button');
const charButtons = document.querySelectorAll('.my-characters-page .left-section .character-item');

// pages
const characters = document.querySelector('.my-characters-page .right-section .characters');
const heroes = document.querySelector('.my-characters-page .right-section .heroes');
const info = document.querySelector('.my-characters-page .right-section .info');

function slideFromLeft(element) {
    element.style.display = "initial";
    gsap.fromTo(element,
        { xPercent: -100 },
        { xPercent: 0, duration: 1, ease: "power2.out" });
}

function slideToRight(element) {
    gsap.fromTo(element,
        { xPercent: 0 },
        { xPercent: 100, duration: 1, ease: "power2.out" });
}

function slideFromRight(element) {
    element.style.display = "initial";
    gsap.fromTo(element,
        { xPercent: 100 },
        { xPercent: 0, duration: 1, ease: "power2.out" });
}

function slideToLeft(element) {
    gsap.fromTo(element,
        { xPercent: 0 },
        { xPercent: -100, duration: 1, ease: "power2.out" });
}

function showCharactersPage() {
    if (characters.classList.contains('selected'))
        return;

    if (info.classList.contains('selected')) {
        characters.style.display = "initial";
        slideFromLeft(characters);
        characters.classList.add('selected');

        info.classList.remove('selected');
        slideToRight(info);
        setTimeout(() => {
            info.style.display = "none";
        }, 1000);
        
        return;
    }

    slideFromLeft(characters);
    slideToRight(heroes);

    characters.classList.add('selected');
    heroes.classList.remove('selected');
}

function showHeroesPage() {
    if (heroes.classList.contains('selected'))
        return;

    if (info.classList.contains('selected')) {
        heroes.style.display = "initial";
        slideFromRight(heroes);
        heroes.classList.add('selected');

        info.classList.remove('selected');
        slideToLeft(info);
        setTimeout(() => {
            info.style.display = "none";
        }, 1000);

        return;
    }

    slideToLeft(characters);
    slideFromRight(heroes);
    
    characters.classList.remove('selected');
    heroes.classList.add('selected');
    
    clearAllCharSelection();
}

createCharacterButton.addEventListener('click', () => {
    showHeroesPage();
});

charButtons.forEach((item) => item.addEventListener('click', () => {
    showCharactersPage();
}));