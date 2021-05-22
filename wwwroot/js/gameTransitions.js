const sections = document.querySelectorAll('.game-page .game-sections__item');
const elements = document.querySelectorAll('.game-page .game-elements__item');

const infoPage = document.querySelector('.game-page > .info');
const middleSection = document.querySelector('.game-page > .middle-section');
const rightSection = document.querySelector('.game-page > .right-section');

function fadeIn(element) {
    element.style.display = "initial";
    gsap.fromTo(element,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" });
}

function fadeOut(element) {
    gsap.to(element, { opacity: 0, display: "none", duration: 0.5, ease: "power1.out" });
}

// sections selection handler
sections.forEach((section) => {
    section.addEventListener('click', () => {
        elements.forEach((element) => element.classList.remove('selected'));
        sections.forEach((section) => section.classList.remove('selected'));
        section.classList.add('selected');
        
        infoPage.style.display = "none";
        middleSection.style.display = "initial";
        rightSection.style.display = "none";
    });
})

// elements selection handler
elements.forEach((element) => {
   element.addEventListener('click', () => {
       elements.forEach((element) => element.classList.remove('selected'));
       element.classList.add('selected');
       
       rightSection.style.display = "initial";
   });
});
