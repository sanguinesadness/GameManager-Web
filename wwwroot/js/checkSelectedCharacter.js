const shopLink = document.getElementById('shop-link');

shopLink.addEventListener('click', (event) => {
    $.ajax({
        type: 'GET',
        url: '/Player/CheckSelectedCharacter',
        async: false,
        success: (result) => {
            if (!result) {
                event.preventDefault();

                shopLink.classList.remove('selected');

                const dialogBox = document.getElementById('no-character-dialog-box');
                showDialog(dialogBox);
            }
        }
    });
});