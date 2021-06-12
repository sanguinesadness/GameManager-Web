const banResultDialogBox = document.getElementById('ban-result-dialog-box');

const banCharacterButton = document.getElementById('ban-character-button');
const unbanCharacterButton = document.getElementById('unban-character-button');

function showBanDialogBox() {
    banResultDialogBox.querySelector('.selected-character-name').innerText = selectedCharacterName;
    banResultDialogBox.querySelector('.selected-player-name').innerText = selectedPlayerName;
    
    banResultDialogBox.querySelector('.ban-result').classList.remove('unbanned');
    banResultDialogBox.querySelector('.ban-result').classList.add('banned');
    
    showDialog(banResultDialogBox);
}

function showUnbanDialogBox() {
    banResultDialogBox.querySelector('.selected-character-name').innerText = selectedCharacterName;
    banResultDialogBox.querySelector('.selected-player-name').innerText = selectedPlayerName;

    banResultDialogBox.querySelector('.ban-result').classList.add('unbanned');
    banResultDialogBox.querySelector('.ban-result').classList.remove('banned');
    
    showDialog(banResultDialogBox);
}

banCharacterButton.addEventListener('click', () => {
    $.ajax({
        type: 'POST',
        url: '/Admin/BanCharacter',
        data: { 
            characterId: selectedCharacterId,
            reason: banReasonInput.value
        },
        success: (result) => {
            closeDialog(banDialogBox);
            showBanDialogBox();
            updateTable();
        },
        error: (xhr, textStatus, errorThrown) => console.log(xhr.responseText)
    });
});

unbanCharacterButton.addEventListener('click', () => {
    $.ajax({
        type: 'DELETE',
        url: '/Admin/UnbanCharacter',
        data: { characterId: selectedCharacterId },
        success: (result) => {
            closeDialog(unbanDialogBox);
            showUnbanDialogBox();
            updateTable();
        },
        error: (xhr, textStatus, errorThrown) => console.log(xhr.responseText)
    });
});