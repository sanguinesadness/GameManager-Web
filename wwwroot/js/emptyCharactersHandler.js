function checkEmptyCharactersList() {
    const block = document.querySelector('.empty-characters-block');

    if (document.querySelectorAll('.character-item').length == 0) {
        scaleIn(block, true);
    }
    else {
        scaleOut(block, true);
    }
}

checkEmptyCharactersList();