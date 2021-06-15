const upperPlaceholders = document.querySelectorAll('.input-box.upper-placeholder');
const errorLabels = document.querySelectorAll('.error-label');

function showInputBoxError(inputBox, errorText) {
    const errorLabel = inputBox.querySelector('.error-label');
    const text = errorLabel.querySelector('.text');
    const input = inputBox.querySelector('input');

    text.innerText = errorText;
    errorLabel.style.display = "flex";

    input.classList.add('input-validation-error');
}

function hideInputBoxError(inputBox) {
    const errorLabel = inputBox.querySelector('.error-label');
    const text = errorLabel.querySelector('.text');
    const input = inputBox.querySelector('input');

    text.innerText = "";
    errorLabel.style.display = "none";

    input.classList.remove('input-validation-error');
}

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