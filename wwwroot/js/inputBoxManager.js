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