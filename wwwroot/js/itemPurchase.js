function changeBalance(newBalance) {
    const balanceElement = document.querySelector('.gold-balance__value');

    balanceElement.innerText = newBalance;
    scaleIn(balanceElement);
}

$('#buy-item-button').click(() => {
    const charId = document.querySelector('.shop-page .character__id').innerText;
    const itemId = itemDialogWrapper.querySelector('.dialog-item__id').innerText;
    const amount = itemDialogWrapper.querySelector('.item-amount__value > select').value;

    const currentBalance = parseInt(document.querySelector('.gold-balance__value').innerText);
    const totalPrice = parseInt(document.querySelector('.item-price__value').innerText);

    if (currentBalance < totalPrice) {
        closeDialog(itemDialogWrapper);
        showDialog(document.getElementById('failed-purchase-dialog-box'));
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/Player/BuyItem',
        data: {
            characterId: charId,
            itemId: itemId,
            amount: amount
        },
        success: (result) => {
            if (result != currentBalance) {
                changeBalance(result);
                closeDialog(itemDialogWrapper);
                showDialog(document.getElementById('successful-purchase-dialog-box'));
            }
        }
    });
});