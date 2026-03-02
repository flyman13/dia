(function(){
    const slider = document.querySelector('.slider-container');
    const dots = document.querySelectorAll('.dot');

    if (!slider || !dots || dots.length === 0) return;

    const cards = slider.querySelectorAll('.card');

    // Оновлюємо активну точку по скроллу
    slider.addEventListener('scroll', () => {
        // Визначаємо індекс за найближчим положенням картки
        let index = 0;
        let closest = Infinity;
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const sliderCenter = window.innerWidth / 2;
            const dist = Math.abs(center - sliderCenter);
            if (dist < closest) {
                closest = dist;
                index = i;
            }
        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }, {passive: true});

    // Клік по точці — прокрутка до відповідної картки
    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = cards[i];
            if (!card) return;
            // Зручно використовувати scrollIntoView щоб розмістити картку по центру
            card.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'});
        });
    });

    // Ініціалізація: відзначимо першу точку при завантаженні
    dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
})();