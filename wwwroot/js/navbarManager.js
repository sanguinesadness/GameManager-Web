const navbarLinks = document.querySelectorAll('a.navbar__item');

navbarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        link.classList.add('selected');
    });
});