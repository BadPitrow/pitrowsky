let adicionado1 = false;
let adicionado2 = false;

function scrollActive() {
        if (adicionado1 && adicionado2) return;

    const altura = window.innerHeight;
    document.querySelectorAll('.body-container-two div').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (altura > rect.top) {
            adicionado1 = true;
            setTimeout(() => {
            el.classList.add('scrollActive');
            }, i * 100);
        }
    });
    const containerThree = document.querySelector('.body-container-three');
    const rectThree = containerThree.getBoundingClientRect();
    if (altura > rectThree.top - 400) {
        containerThree.classList.add('scrollActive');
        adicionado2 = true;
    }
}

window.addEventListener('scroll', scrollActive);