const gameElements = middleSection.querySelector('.game-elements');

function createGameElement(element, elementName) {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add(`${elementName}-element__wrapper`);

    const itemElement = document.createElement('div');
    itemElement.classList.add(`${elementName}-element`);
    itemElement.classList.add('game-elements__item');

    const id = document.createElement('span');
    id.setAttribute('hidden', true);
    id.classList.add(`${elementName}-element__id`);
    id.innerText = element.id;

    const icon = document.createElement('img');
    icon.classList.add(`${elementName}-element__icon`);
    icon.src = `/pictures/${elementName}_icons/${element.icon}`;
    icon.alt = "";

    const name = document.createElement('span');
    name.classList.add(`${elementName}-element__name`);
    name.innerText = element.name;

    itemElement.appendChild(id);
    itemElement.appendChild(icon);
    itemElement.appendChild(name);
    itemWrapper.appendChild(itemElement);
    gameElements.append(itemWrapper);

    if (middleSection.style.display) {
        scaleIn(itemWrapper, true);
    }
}

function showGameElementList(elementList, elementName) {
    const elementDivs = document.querySelectorAll(`.${elementName}-element__wrapper .${elementName}-element`);
    if (elementDivs.length > 0) {
        return;
    }

    scaleOut(infoSection);

    if (rightSection.style.display) {
        scaleOut(rightSection);
    }

    if (!middleSection.style.display) {
        scaleIn(middleSection);
    }

    clearChildren(gameElements);
    elementList.forEach((element) => createGameElement(element, elementName));

    addGameElementsClickEvent(elementList);
}

$('#heroes-section').click(() => {
    // if mobList has already been filled in
    if (heroList) {
        showGameElementList(heroList, 'hero');
    }
    // otherwise make GET request
    else {
        $.ajax({
            type: 'GET',
            url: '/Player/GetHeroes',
            success: (result) => {
                heroList = result;
                showGameElementList(result, 'hero');
            }
        });
    }
});

$('#mobs-section').click(() => {
    if (mobList) {
        showGameElementList(mobList, 'mob');
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Player/GetMobs',
            success: (result) => {
                mobList = result;
                showGameElementList(result, 'mob');
            }
        });
    }
});

$('#items-section').click(() => {
    if (itemList) {
        showGameElementList(itemList, 'item');
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Player/GetItems',
            success: (result) => {
                itemList = result;
                showGameElementList(result, 'item');
            }
        });
    }
});

$('#locations-section').click(() => {
    if (locationList) {
        showGameElementList(locationList, 'location');
    }
    else {
        $.ajax({
            type: 'GET',
            url: '/Player/GetLocations',
            success: (result) => {
                locationList = result;
                showGameElementList(result, 'location');
            }
        });
    }
});

addGameSectionsClickEvent();