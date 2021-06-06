const table = document.getElementById('query-table');

const topRatingButton = document.getElementById('top-rating-button');
const mostActiveButton = document.getElementById('most-active-button');
const topInventoriesButton = document.getElementById('top-inventories-button');
const richestPlayersButton = document.getElementById('richest-players-button');
const topLevelsButton = document.getElementById('top-levels-button');

const allButtons = document.querySelectorAll('.reports-page .reports-queries__item');

function fillTableHeaders(headers) {
    const thead = table.querySelector('thead');
    clearChildren(thead);

    const headersRow = document.createElement('tr');

    const numHeader = document.createElement('th');
    numHeader.className = "number__header";
    numHeader.innerText = "#";
    headersRow.appendChild(numHeader);

    headers.forEach((header) => {
        const th = document.createElement('th');
        th.innerText = header;
        headersRow.appendChild(th);
    });

    thead.appendChild(headersRow);
}

function fillTableData(list) {
    const tbody = table.querySelector('tbody');
    clearChildren(tbody);

    let count = 0;

    list.forEach((item) => {
        const tr = document.createElement('tr');

        const numValue = document.createElement('td');
        numValue.className = "number__value";
        numValue.innerText = ++count;
        tr.appendChild(numValue);

        for (var prop in item) {
            const td = document.createElement('td');
            td.innerText = item[prop];
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    });
}

function showTable() {
    gsap.fromTo(table,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.inOut(2)' });
}

function setQueryTitle(title) {
    const queryTitle = document.getElementById('query-title');

    queryTitle.innerText = title;
    gsap.fromTo(queryTitle,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.inOut(2)' });
}

topRatingButton.addEventListener('click', () => {
    if (topRatingButton.classList.contains('selected')) {
        return;
    }

    let headers = [ "Персонаж", "Рейтинг", "Игрок" ];
    const title = topRatingButton.querySelector('.query-name').innerText;

    $.ajax({
        type: 'GET',
        url: '/Admin/GetTopRatingReport',
        success: (result) => {
            fillTableHeaders(headers);
            fillTableData(result);
            setQueryTitle(title);
            showTable();
        }
    });
});

mostActiveButton.addEventListener('click', () => {
    if (mostActiveButton.classList.contains('selected')) {
        return;
    }

    let headers = ["Игрок", "Персонажей", "Всего часов", "Часов в среднем"];
    const title = mostActiveButton.querySelector('.query-name').innerText;

    $.ajax({
        type: 'GET',
        url: '/Admin/GetMostActiveReport',
        success: (result) => {
            fillTableHeaders(headers);
            fillTableData(result);
            setQueryTitle(title);
            showTable();
        }
    });
});

topInventoriesButton.addEventListener('click', () => {
    if (topInventoriesButton.classList.contains('selected')) {
        return;
    }

    let headers = ["Персонаж", "Предметов", "Стоимость", "Игрок"];
    const title = topInventoriesButton.querySelector('.query-name').innerText;

    $.ajax({
        type: 'GET',
        url: '/Admin/GetTopInventoriesReport',
        success: (result) => {
            fillTableHeaders(headers);
            fillTableData(result);
            setQueryTitle(title);
            showTable();
        }
    });
});

richestPlayersButton.addEventListener('click', () => {
    if (richestPlayersButton.classList.contains('selected')) {
        return;
    }

    let headers = ["Игрок", "Персонажей", "Всего золота"];
    const title = richestPlayersButton.querySelector('.query-name').innerText;

    $.ajax({
        type: 'GET',
        url: '/Admin/GetRichestPlayersReport',
        success: (result) => {
            fillTableHeaders(headers);
            fillTableData(result);
            setQueryTitle(title);
            showTable();
        }
    });
});

topLevelsButton.addEventListener('click', () => {
    if (topLevelsButton.classList.contains('selected')) {
        return;
    }

    let headers = ["Персонаж", "Уровень", "Игрок"];
    const title = topLevelsButton.querySelector('.query-name').innerText;

    $.ajax({
        type: 'GET',
        url: '/Admin/GetTopLevelsReport',
        success: (result) => {
            fillTableHeaders(headers);
            fillTableData(result);
            setQueryTitle(title);
            showTable();
        }
    });
});

allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        allButtons.forEach((b) => b.classList.remove('selected'));
        button.classList.add('selected');

        if (!rightSection.style.display) {
            scaleIn(rightSection);
            scaleOut(infoSection);
        }
    });
});