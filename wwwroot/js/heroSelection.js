// buttons
const heroButtons = document.querySelectorAll('.hero-item');
const returnButton = document.querySelector('.my-characters-page .right-section .heroes .hero-creation .return-button');

// pages
const heroSelection = document.querySelector('.my-characters-page .right-section .heroes .hero-selection');
const heroCreation = document.querySelector('.my-characters-page .right-section .heroes .hero-creation');

function showCreationPage() {
    gsap.fromTo(heroSelection,
        { scale: 1, opacity: 1 },
        { scale: 0.5, opacity: 0, duration: 0.5, ease: 'power3.out' });
    heroCreation.style.display = "initial";
    gsap.fromTo(heroCreation,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    setTimeout(() => {
        heroSelection.style.display = "none";
    }, 400);

    const inputBox = document.querySelector('.hero-creation__input .input-box');
    const errorLabel = inputBox.querySelector('.error-label');
    const errorText = errorLabel.querySelector('.text');
    const input = document.getElementById('hero-creation__name');

    input.classList.remove('input-validation-error');
    errorText.innerText = "";
    errorLabel.style.display = "none";
    input.value = "";
}

function showSelectionPage() {
    gsap.fromTo(heroCreation,
        { scale: 1, opacity: 1 },
        { scale: 0.5, opacity: 0, duration: 0.5, ease: 'power3.out' });
    heroSelection.style.display = "initial";
    gsap.fromTo(heroSelection,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    setTimeout(() => {
        document.querySelector('.hero-creation__description').scrollTo(0, 0);
        heroCreation.style.display = "none";
    }, 400);
}

function fillHeroData(hero) {
    const heroId = document.querySelector('.selected-hero__id');
    const avatar = document.querySelector('.hero-creation .hero-brief .hero-brief__avatar');
    const heroName = document.querySelector('.hero-creation .hero-brief .name > .name__value');
    const heroClass = document.querySelector('.hero-creation .hero-brief .class > .class__value');
    const lore = document.querySelector('.hero-creation .hero-lore > .hero-lore__text');

    heroId.innerText = hero.id;
    avatar.src = `/pictures/hero_avatars/${hero.avatar}`;
    heroName.innerText = hero.name;
    heroClass.innerText = hero.heroClass.name;
    lore.innerText = hero.description;
}

function getSelectedHero(heroItem) {
    $.ajax({
        type: 'GET',
        url: '/Player/GetSelectedHero',
        data: { heroId: heroItem.querySelector('.hero-item__id').innerText },
        success: (result) => {
            fillHeroData(result);
        }
    });
}

heroButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showCreationPage();

        getSelectedHero(button);
    });
});

returnButton.addEventListener('click', () => {
    showSelectionPage();
});