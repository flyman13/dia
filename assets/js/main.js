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