function hideCharItem(characterItem) {
    gsap.to(characterItem,
        {
            scale: 0, opacity: 0, duration: 0.5, ease: 'back.inOut(2)',
            onComplete: () => {
                characterItem.remove();
                checkEmptyCharactersList();
            }
        });

    showInfoPage();

    setTimeout(() => {
        setInitialPositions();
    }, 1000);
}

function removeCharacter(charId) {
    $.ajax({
        type: 'DELETE',
        url: '/Player/RemoveCharacter',
        data: { characterId: charId },
        success: () => {
            hideCharItem($('.character-item.selected'));
        }
    });
}

$('#delete-character-button').click(() => {
    let selectedCharId = $('.character-item.selected .character__id').text();
    removeCharacter(selectedCharId);
});