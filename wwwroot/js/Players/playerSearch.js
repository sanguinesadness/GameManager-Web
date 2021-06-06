const searchInput = document.getElementById('player-search');

searchInput.addEventListener('keyup', () => {
    const inputValue = searchInput.value.toLowerCase().trim();
    
    if (!inputValue) {
        playerItemElements.forEach((element) => element.style.display = "flex");
        emptyBlock.style.display = "none";
        playerList.style.display = "block";
        return;
    }
    
    let foundCount = 0;
    playerItemElements.forEach((element) => {
        const name = element.querySelector('.player-name').innerText.toLowerCase();
        
        if (name.includes(inputValue)) {
            element.style.display = "flex";
            foundCount++;
        }
        else {
            element.style.display = "none";
        }
    });
    
    if (foundCount === 0 && emptyBlock.style.display === "none") {
        emptyBlock.querySelector('.empty-players-block__text').innerText = "Ничего не найдено";
        
        emptyBlock.style.display = "flex";
        playerList.style.display = "none";
    }
    else if (foundCount > 0) {
        emptyBlock.style.display = "none";
        playerList.style.display = "block";
    }
});