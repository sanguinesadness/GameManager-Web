function clearAllCharSelection() {
    document.querySelectorAll('.character-item').forEach((item) => {
        item.classList.remove('selected');
    });
}

function setCharSelection(item) {
    item.classList.add('selected');
}

function fillCharacterData(characterInfo) {
    const id = document.querySelector('.row-id__value');
    const status = document.querySelector('.row-status__value');
    const location = document.querySelector('.row-location__value');
    const lvl = document.querySelector('.row-level__value');
    const heroClass = document.querySelector('.row-class__value');
    const playerHours = document.querySelector('.row-hours__value');
    const gold = document.querySelector('.gold-balance__value');
    const rating = document.querySelector('.rating-scores__value');
    const creationDate = document.querySelector('.creation-date__value');

    if (characterInfo.status != 0)
        status.classList.add('active');
    else
        status.classList.add('blocked');

    let dateArr = characterInfo.creationDate.slice(0, 10).split('-');      // 0 - year; 1 - month; 2 - day
    let dateStr = `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;             // date in format: 21.05.2004

    id.innerText = characterInfo.id;
    location.innerText = characterInfo.currentLocation;
    lvl.innerText = characterInfo.level;
    heroClass.innerText = characterInfo.heroClass;
    playerHours.innerText = characterInfo.playedHours;
    gold.innerText = characterInfo.gold;
    rating.innerText = characterInfo.rating;
    creationDate.innerText = dateStr;
}

function getSelectedCharacterInfo(characterLink) {
    $.ajax({
        type: 'GET',
        url: '/Player/GetSelectedCharacterInfo',
        data: { characterId: characterLink.querySelector('.character__id').innerText },
        success: (result) => {
            fillCharacterData(result);
        }
    });
}

function sendSelectedCharacter(characterId) {
    $.ajax({
        type: 'POST',
        url: '/Player/SelectCharacter',
        data: { id: characterId },
        success: (result) => result
    });
}

function setCharacterItemClickEvent(item) {
    const link = item.querySelector('a.character');
    link.addEventListener('click', () => {
        clearAllCharSelection();
        setCharSelection(item);

        showCharactersPage();
        getSelectedCharacterInfo(link);

        let characterId = link.querySelector('.character__id').innerText;
        sendSelectedCharacter(characterId);
    });
}

document.querySelectorAll('.character-item').forEach((item) => {
    setCharacterItemClickEvent(item);
});