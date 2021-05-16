const genderResult = document.getElementById('gender-result');

// отслеживание изменений радио-кнопок
const genderRadioButtons = document.reg.genderRadioButton;
var prev = null;

for (var i = 0; i < genderRadioButtons.length; i++) {
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