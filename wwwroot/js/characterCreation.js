function createCharItem(characterInfo) {
    const div = document.createElement('div');
    div.classList.add('character-item');

    const a = document.createElement('a');
    a.classList.add('character');

    const span = document.createElement('span');
    span.classList.add('character__id');
    span.setAttribute('hidden', true);
    span.innerText = characterInfo.id;

    const img = document.createElement('img');
    img.classList.add('character__icon');
    img.alt = "";
    img.src = `/pictures/hero_icons/${characterInfo.heroIcon}`;

    const h4 = document.createElement('h4');
    h4.classList.add('character__name');
    h4.innerText = characterInfo.name;

    a.appendChild(span);
    a.appendChild(img);
    a.appendChild(h4);

    div.appendChild(a);

    $('.my-characters-page .characters-list').append(div);
    setCharacterItemClickEvent(div);

    scaleIn(div, true);
}

function createCharacter(charName, heroId) {
    $.ajax({
        type: 'POST',
        url: '/Player/CreateCharacter',
        data: {
            characterName: charName,
            heroId: heroId
        },
        success: (result) => {
            createCharItem(result);
            checkEmptyCharactersList();
        }
    });
}

function validateCharacterName(name) {
    if (!name) {
        return "Поле обязательно для ввода."
    }
    else if (name.length < 3 || name.length > 30) {
        return "Количество символов - от 3 до 30."
    }
    else if (!name.match(/^[a-z0-9]+$/i)) {
        return "Только цифры и символы латинского алфавита.";
    }
    else if (!name.match(/[a-zA-Z]/g)) {
        return "Имя не может содержать только цифры."
    }
    else {
        return "";
    }
}

$('#create-character-button').click(() => {
    const inputBox = document.querySelector('.hero-creation__input .input-box');
    const errorLabel = inputBox.querySelector('.error-label');
    const errorText = errorLabel.querySelector('.text');

    const input = document.getElementById('hero-creation__name');
    let charName = input.value;
    let errorMsg = validateCharacterName(charName);

    if (errorMsg) {
        input.classList.add('input-validation-error');
        errorText.innerText = errorMsg;
        errorLabel.style.display = "flex";
        return;
    }

    let heroId = $('.selected-hero__id').text();

    createCharacter(charName, heroId);
    showSelectionPage();

    input.classList.remove('input-validation-error');
    errorText.innerText = "";
    errorLabel.style.display = "none";
    input.value = "";
});