const itemDialogWrapper = document.getElementById('item-selected-dialog-box');

function fillItemDialogBox(item) {
    const id = itemDialogWrapper.querySelector('.dialog-item__id');
    const icon = itemDialogWrapper.querySelector('.dialog-item__icon');
    const name = itemDialogWrapper.querySelector('.item-name__value');
    const amountSelector = itemDialogWrapper.querySelector('.item-amount__value > select');
    const price = itemDialogWrapper.querySelector('.item-price__value');

    id.innerText = item.id;
    icon.src = `/pictures/item_icons/${item.icon}`;
    name.innerText = item.name;
    amountSelector.value = 1;
    price.innerText = item.price;

    amountSelector.addEventListener('change', () => {
        price.innerText = item.price * amountSelector.value;
    });
}

function addItemClickEvent(itemElement, item) {
    itemElement.addEventListener('click', () => {
        fillItemDialogBox(item);
        showDialog(itemDialogWrapper);
    });
}