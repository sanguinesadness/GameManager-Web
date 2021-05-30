function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createItemElement(item) {
    const wrapper = document.createElement('div');

    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const itemId = document.createElement('span');
    itemId.classList.add('item__id');
    itemId.setAttribute('hidden', true);

    const itemIcon = document.createElement('img');
    itemIcon.classList.add('item__icon');
    itemIcon.src = `/pictures/item_icons/${item.icon}`;
    itemIcon.alt = "";

    const itemName = document.createElement('span');
    itemName.classList.add('item__name');
    itemName.innerText = item.name;

    itemElement.appendChild(itemId);
    itemElement.appendChild(itemIcon);
    itemElement.appendChild(itemName);
    wrapper.appendChild(itemElement);

    return wrapper;
}

function fillItemsGrid(items) {
    const itemsGrid = document.querySelector('.items__grid');

    clearChildren(itemsGrid);

    items.forEach((item) => {
        const itemElement = createItemElement(item);
        itemsGrid.appendChild(itemElement);
        addItemClickEvent(itemElement, item);

        if (rightSection.style.display) {
            scaleIn(itemElement);
        }
    });
}

function setCategoryTitle(title) {
    document.querySelector('.items__title').innerText = title;
}

function handleCategoryClick(category) {
    categories.forEach((c) => c.classList.remove('selected'));
    category.classList.add('selected');

    if (!rightSection.style.display || rightSection.style.display === 'none') {
        scaleIn(rightSection);
    }

    scaleOut(infoSection);
}

categories.forEach((category) => {
    category.addEventListener('click', () => {
        let id = category.querySelector('.category__id').innerText;
        let name = category.querySelector('.category__name').innerText;

        $.ajax({
            type: 'GET',
            url: '/Player/GetCategoryItems',
            data: { categoryId: id },
            success: (result) => {
                setCategoryTitle(name);
                fillItemsGrid(result);
            }
        });

        handleCategoryClick(category);
    });
});