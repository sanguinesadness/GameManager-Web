const inventoryDialog = document.getElementById('inventory-dialog-box');

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function getSelectedCharacterId() {
    const id = document.querySelector('.character-info__table .row-id__value').innerText;
    return parseInt(id);
}

function createInventoryTableRow(item) {
    const row = document.createElement('tr');
    row.classList.add('inventory-table__values-row');

    const numberCell = document.createElement('td');
    numberCell.classList.add('number__value');
    numberCell.innerText = item.number;

    const iconCell = document.createElement('td');
    iconCell.classList.add('icon__value');

    const icon = document.createElement('img');
    icon.alt = "";
    icon.src = `/pictures/item_icons/${item.icon}`;

    iconCell.appendChild(icon);

    const nameCell = document.createElement('td');
    nameCell.classList.add('name__value');
    nameCell.innerText = item.name;

    const amountCell = document.createElement('td');
    amountCell.classList.add('amount__value');
    amountCell.innerText = item.amount;

    row.appendChild(numberCell);
    row.appendChild(iconCell);
    row.appendChild(nameCell);
    row.appendChild(amountCell);

    return row;
}

function fillInventoryTable(table) {
    const tbody = inventoryDialog.querySelector('.inventory-table tbody');

    clearChildren(tbody);

    table.forEach((item) => {
        const row = createInventoryTableRow(item);
        tbody.appendChild(row);
    });
}

$('#open-inventory-button').click(() => {
    const charId = getSelectedCharacterId();

    $.ajax({
        type: 'GET',
        url: '/Player/GetCharacterItems',
        data: { characterId: charId },
        success: (result) => {
            if (result.length == 0) {
                inventoryDialog.classList.add('empty');
            }
            else {
                inventoryDialog.classList.remove('empty');
            }

            fillInventoryTable(result);
            showDialog(inventoryDialog);
        }
    });
});