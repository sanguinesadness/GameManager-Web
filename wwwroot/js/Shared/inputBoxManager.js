const upperPlaceholders = document.querySelectorAll('.input-box.upper-placeholder');
const errorLabels = document.querySelectorAll('.error-label');

function showInputBoxError(inputBox, errorMsg) {
    const errorLabel = inputBox.querySelector('.error-label');
    const errorText = errorLabel.querySelector('.text');
    const input = inputBox.querySelector('input');
    
    errorText.innerHTML = errorMsg;

    errorText.classList.add('field-validation-error');
    errorText.classList.remove('field-validation-valid');
    input.classList.add('input-validation-error');
    input.classList.remove('valid');
}

function refreshInputBox(inputBox) {
    const errorLabel = inputBox.querySelector('.error-label');
    const input = inputBox.querySelector('input');
    
    if (errorLabel) {
        const errorText = errorLabel.querySelector('.text');

        errorText.innerHTML = "";

        errorText.classList.remove('field-validation-error');
        errorText.classList.remove('field-validation-valid');
    }
    
    input.classList.remove('input-validation-error');
    input.classList.remove('valid');
}

errorLabels.forEach((label) => {
    const errorText = label.querySelector('.text');

    $('body').on('DOMSubtreeModified', errorText, () => {
        if (errorText.classList.contains('field-validation-error')) {
            label.style.visibility = "visible";
        }
        else if (errorText.classList.contains('field-validation-valid')) {
            label.style.visibility = "hidden";
        }
    });
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