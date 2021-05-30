// tables from Database
let heroList, locationList, itemList, mobList;

const descriptionWrapper = document.querySelector('.game-description__wrapper');

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createDescription(item) {
    const description = document.createElement('div');
    description.classList.add('game-description');

    const title = document.createElement('span');
    title.classList.add('game-description__title');
    title.innerText = item.name;

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('game-description__text');

    const text = document.createElement('p');
    text.innerText = item.description;

    textWrapper.appendChild(text);
    description.appendChild(title);
    description.appendChild(textWrapper);
    descriptionWrapper.appendChild(description);
}

function addGameElementsClickEvent(list) {
    const elements = document.querySelectorAll('.game-page .game-elements__item');

    elements.forEach((element) => {
        element.addEventListener('click', () => {
            elements.forEach((e) => e.classList.remove('selected'));
            element.classList.add('selected');

            let id = element.firstElementChild.innerText;
            const listItem = list.find((li) => li.id == id);

            if (!rightSection.style.display || rightSection.style.display === 'none') {
                scaleIn(rightSection);
            }

            clearChildren(descriptionWrapper);
            createDescription(listItem);
            descriptionWrapper.scrollTo(0, 0);
        });
    });
}