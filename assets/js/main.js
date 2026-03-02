document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        const inner = card.querySelector('.card-inner');
        const qrContainer = card.querySelector('.card-back [class^="qrcode"]');
        let rotation = 0;

        // Ініціалізація QR, якщо контейнер існує
        if (qrContainer) {
            new QRCode(qrContainer, {
                text: `https://diia.gov.ua/verify/doc-${index}`,
                width: 170,
                height: 170,
                colorDark : "#000000",
                colorLight : "#ffffff"
            });
        }

        // Обробка кліку для нескінченного оберту
        card.addEventListener('click', () => {
            rotation += 180;
            inner.style.transform = `rotateY(${rotation}deg)`;
        });
    });
});

const bgElement = document.getElementById('app-bg');

// Кольори, які я знайшов у твоєму бандлі
const diiaColors = [
    ['#b3d3ea', '#d3e9dc'], // Фаза 1 (спокійна)
    ['#eeb6bb', '#beaae7'], // Фаза 2 (тепла)
    ['#1982d2', '#bcabdf'], // Фаза 3 (активна)
    ['#82d8d5', '#d1a7f0']  // Фаза 4 (як на скріншоті)
];

let step = 0;

function updateDiiaBackground() {
    const bg = document.querySelector('.dynamic-mesh-bg');
    if (!bg) return;

    const [color1, color2] = diiaColors[step];
    
    // Міняємо кольори
    bg.style.setProperty('--bg-color-1', color1);
    bg.style.setProperty('--bg-color-2', color2);

    // Переходимо до наступної фази
    step = (step + 1) % diiaColors.length;
}

// Запуск зміни кожні 15 секунд
setInterval(updateDiiaBackground, 15000);

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-container');
    const cards = document.querySelectorAll('.card');

    function updateActiveCard() {
        // Знаходимо центр слайдера
        const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;
        
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            // Знаходимо центр кожної картки
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            
            // Рахуємо відстань від центру картки до центру слайдера
            const distance = Math.abs(sliderCenter - cardCenter);

            // Шукаємо картку з найменшою відстанню (найближчу до центру)
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        // Видаляємо клас active з усіх карток
        cards.forEach(card => card.classList.remove('active'));
        
        // Додаємо клас active найближчій до центру картці
        if (closestCard) {
            closestCard.classList.add('active');
        }
    }

    // Відстежуємо подію скролу на слайдері
    slider.addEventListener('scroll', updateActiveCard);
    
    // Викликаємо функцію один раз при завантаженні, щоб підсвітити першу картку
    updateActiveCard(); 
});