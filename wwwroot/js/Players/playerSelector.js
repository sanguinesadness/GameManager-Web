const table = document.getElementById('characters-table');
const playerItemElements = document.querySelectorAll('.player-list__item');

let selectedPlayerId;
let selectedPlayerName;

let selectedSection = infoSection;

function showEmptyCharactersSection(playerName) {
    if (selectedSection === emptySection) {
        return;
    }

    emptySection.querySelector('.selected-player-name').innerText = playerName;
    scaleIn(emptySection);
    scaleOut(selectedSection);
    selectedSection = emptySection;
}

function showRightSection() {
    if (selectedSection === rightSection) {
        return;
    }

    scaleIn(rightSection);
    scaleOut(selectedSection);
    selectedSection = rightSection;
}

function createTableRow(item, number) {
    const row = document.createElement('tr');
    row.classList.add('characters-table-row');
    
    const numberCell = document.createElement('td');
    numberCell.classList.add('number__value');
    numberCell.innerText = number.toString();

    const idCell = document.createElement('td');
    idCell.hidden = true;
    idCell.classList.add('id__value');
    idCell.innerText = item.id.toString();

    const iconCell = document.createElement('td');
    iconCell.classList.add('icon__value');
    
    const icon = document.createElement('img');
    icon.alt = "";
    icon.src = `/pictures/hero_icons/${item.icon}`;
    iconCell.appendChild(icon);

    const nameCell = document.createElement('td');
    nameCell.classList.add('name__value');
    nameCell.innerText = item.name;
    
    const lvlCell = document.createElement('td');
    lvlCell.classList.add('lvl__value');
    lvlCell.innerText = item.level.toString();
    
    const goldCell = document.createElement('td');
    goldCell.classList.add('gold__value');
    goldCell.innerText = item.gold.toString();
    
    const ratingCell = document.createElement('td');
    ratingCell.classList.add('rating__value');
    ratingCell.innerText = item.rating.toString();
    
    const statusCell = document.createElement('td');
    statusCell.classList.add('status__value');
    
    if (item.status != 0) {
        statusCell.classList.add('active');
    }
    else {
        statusCell.classList.add('banned');
    }
    
    row.appendChild(numberCell);
    row.appendChild(idCell);
    row.appendChild(iconCell);
    row.appendChild(nameCell);
    row.appendChild(lvlCell);
    row.appendChild(goldCell);
    row.appendChild(ratingCell);
    row.appendChild(statusCell);
    
    return row;
}

function fillTableData(list) {
    const tbody = table.querySelector('tbody');
    clearChildren(tbody);
    
    let counter = 0;
    
    list.forEach(item => {
       const row = createTableRow(item, ++counter);
       tbody.appendChild(row);
    });
}

function showTable() {
    gsap.fromTo(table,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.inOut(2)' });
}

function updateTable() {
    $.ajax({
        type: 'GET',
        url: '/Admin/GetPlayerCharacters',
        data: { playerId: selectedPlayerId },
        success: (result) => {
            fillTableData(result);
            updateTableEventHandler();
        },
        error: (xhr, textStatus, errorThrown) => console.log(xhr.responseText)
    });
}

function setSelectedPlayerName(name) {
    const title = document.querySelector('.players-page .right-section .title');
    const charNameElement = document.getElementById('selected-player-name');

    charNameElement.innerText = name;
    gsap.fromTo(title,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.inOut(2)' });
}

if (playerItemElements.length === 0) {
    scaleIn(emptyBlock, true);
    playerList.style.display = "none";
}
else {
    emptyBlock.style.display = "none";
    scaleIn(playerList);
    playerList.style.display = "block";
}

playerItemElements.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            return;
        }
        
        playerItemElements.forEach((b) => b.classList.remove('selected'));
        button.classList.add('selected');

        selectedPlayerId = button.querySelector('.player-id').innerText;
        selectedPlayerName = button.querySelector('.player-name').innerText;
        
        $.ajax({
            type: 'GET',
            url: '/Admin/GetPlayerCharacters',
            data: { playerId: selectedPlayerId },
            success: (result) => {
                setSelectedPlayerName(selectedPlayerName);

                showRightSection();

                fillTableData(result);
                updateTableEventHandler();
                showTable();
            },
            error: (xhr, textStatus, errorThrown) => showEmptyCharactersSection(selectedPlayerName)
        })
    });
});