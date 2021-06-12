const contextMenu = document.getElementById('characters-table-context-menu');
const blockMenuItem = contextMenu.querySelector('.context-menu-item.block');
const unblockMenuItem = contextMenu.querySelector('.context-menu-item.unblock');

const tableWrapper = document.querySelector('.characters-table__wrapper');

const banDialogBox = document.getElementById('character-ban-dialog-box');
const banReasonInput = banDialogBox.querySelector('.character-ban-reason');

const unbanDialogBox = document.getElementById('character-unban-dialog-box');

let selectedCharacterId;
let selectedCharacterName;

function updateTableEventHandler() {
    const tableRows = document.querySelectorAll('#characters-table tr.characters-table-row');
    tableRows.forEach((row) => {
        row.addEventListener('contextmenu', (event) => {
            selectedCharacterId = parseInt(row.querySelector('.id__value').innerText);
            selectedCharacterName = row.querySelector('.name__value').innerText;
            
            const statusCell = row.querySelector('.status__value');
            
            if (statusCell.classList.contains('active')) {
                blockMenuItem.classList.add('enabled');
                unblockMenuItem.classList.remove('enabled');
            }
            else if (statusCell.classList.contains('banned')) {
                blockMenuItem.classList.remove('enabled');
                unblockMenuItem.classList.add('enabled');
            }
            else {
                blockMenuItem.classList.remove('enabled');
                unblockMenuItem.classList.remove('enabled');
            }
            
            const wrapperPosition = tableWrapper.getBoundingClientRect();
            const yPos = event.clientY - wrapperPosition.top;
            const xPos = event.clientX - wrapperPosition.left;
            
            contextMenu.style.top = `${yPos}px`;
            contextMenu.style.left = `${xPos}px`;

            contextMenu.style.visibility = "visible";

            gsap.fromTo(contextMenu,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.inOut(2)' });
            
            event.preventDefault();
        });
    });
}

// close context menu if clicked outside it
document.addEventListener('click', (event) => {
    const enabledContextMenuItem = contextMenu.querySelector('.context-menu-item.enabled');
    
    if (event.target.id !== contextMenu.id && !event.target.classList.contains('context-menu-item') || event.target.classList.contains('enabled')) {
        gsap.fromTo(contextMenu,
           { scale: 1, opacity: 1 },
           { scale: 0, opacity: 0, duration: 0.3, ease: 'back.inOut(2)',
             onComplete: () => contextMenu.style.visibility = "hidden" });
    }
});

blockMenuItem.addEventListener('click', () => {
    if (!blockMenuItem.classList.contains('enabled')) {
        return;
    }
    
    banReasonInput.value = "";
    banDialogBox.querySelector('.selected-character-name').innerText = selectedCharacterName;
    banDialogBox.querySelector('.selected-player-name').innerText = selectedPlayerName;
    
    showDialog(banDialogBox);
});

unblockMenuItem.addEventListener('click', () => {
    if (!unblockMenuItem.classList.contains('enabled')) {
        return;
    }
    
    unbanDialogBox.querySelector('.selected-character-name').innerText = selectedCharacterName;
    unbanDialogBox.querySelector('.selected-player-name').innerText = selectedPlayerName;
    
    showDialog(unbanDialogBox);
});