const upperPlaceholders = document.querySelectorAll('.input-box.upper-placeholder');
const errorLabels = document.querySelectorAll('.error-label');

errorLabels.forEach((label) => {
    const text = label.querySelector('.text');

    if (!text.innerText) {
        label.style.display = 'none';
    }
    else {
        label.style.display = 'flex';
    }
});

upperPlaceholders.forEach((inputBox) => {
    const label = inputBox.querySelector('label');
    const input = inputBox.querySelector('input');
    
    if (input.value) {
        label.classList.add('lifted-up');
    }
    
    input.addEventListener('focus', () => {
       label.classList.add('lifted-up');
    });
    
    input.addEventListener('change', () => {
       label.classList.add('lifted-up'); 
    });
    
    input.addEventListener('focusout', () => {
        if (!input.value) {
            label.classList.remove('lifted-up');
        }
    });
});