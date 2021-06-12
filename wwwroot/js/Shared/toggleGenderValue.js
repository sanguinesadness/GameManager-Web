const genderSelection = document.querySelector('.gender-selection');
const genderResult = document.getElementById('gender-result');
const genderRadioButtons = genderSelection.querySelectorAll('input[name="genderRadioButton"]');

// отслеживание изменений радио-кнопок
for (let i = 0; i < genderRadioButtons.length; i++) {
    genderRadioButtons[i].addEventListener('change', (e) => {
        genderResult.setAttribute('value', e.target.getAttribute('genderId'));
    });
}

// включение индикатора об ошибке
if (genderResult.classList.contains('input-validation-error')) {
    const genderTitle = genderResult.parentElement.querySelector('span');

    genderTitle.style.opacity = 0.8;
    genderTitle.style.color = '#f4364f';
    genderTitle.style.fontWeight = 500;
}

// todo error
function checkGenderResult() {
    genderRadioButtons.forEach((radioButton) => {
        if (radioButton.getAttribute('genderId') === genderResult.value) {
            radioButton.setAttribute('checked', 'true');
        }
    });
}

if (genderResult.value) {
    checkGenderResult();
}