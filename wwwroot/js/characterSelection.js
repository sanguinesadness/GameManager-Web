const charItems = document.querySelectorAll('.character-item');

function clearAllCharSelection() {
    charItems.forEach((item) => {
        item.classList.remove('selected');
    });
}

function setCharSelection(item) {
    item.classList.add('selected');
}

charItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        clearAllCharSelection();
        setCharSelection(item);
    });
});