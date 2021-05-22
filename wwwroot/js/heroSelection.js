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

heroButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showCreationPage();
    });
});

returnButton.addEventListener('click', () => {
    showSelectionPage();
});