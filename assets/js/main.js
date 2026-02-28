document.addEventListener('DOMContentLoaded', () => {
    const passportCard = document.getElementById('passport');

    passportCard.addEventListener('click', () => {
        // Додаємо або забираємо клас перевороту
        passportCard.classList.toggle('is-flipped');
    });
});