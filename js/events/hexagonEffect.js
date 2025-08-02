const grid = document.querySelector('.hex-grid');
const spacingHex = 2;
const spacingRows = 2;
const hexagonWidth = 20;
const altTopLine = 2;

document.documentElement.style.setProperty('--spacing', `${spacingHex}px`);
document.documentElement.style.setProperty('--hexwidth', `${hexagonWidth}px`);

const totalWidth = window.innerWidth;
const TotalRows = 150;
const TotalHexs = Math.floor((totalWidth / (hexagonWidth + spacingHex)) + 1);

// Geração da grade de hexágonos
for (let row = 0; row < TotalRows; row++) {
    const line = document.createElement('div');
    line.className = 'hex-row';
    const topLine = altTopLine + row * (hexagonWidth - altTopLine);
    line.style.top = `${topLine}px`;

    for (let hex = 0; hex < TotalHexs; hex++) {
        const hexagon = document.createElement('div');
        hexagon.className = 'hexagon';
        line.appendChild(hexagon);
    }

    if (row % 2 !== 0) {
        line.style.marginLeft = `-${hexagonWidth / 2 + spacingHex}px`;
    }

    grid.appendChild(line);
}

const alvos = document.querySelectorAll('.hexagon');
const classesFake = ['hover-fake', 'hover-fake1', 'hover-fake2'];

let mouseData = null;
let ticking = false;
let mouseStopTimeout = null;

document.addEventListener('mousemove', (e) => {
    mouseData = e;

    if (!ticking) {
        requestAnimationFrame(() => {
            processHover(mouseData);
            ticking = false;
        });
        ticking = true;
    }

    // Limpa classes após 50ms parado
    clearTimeout(mouseStopTimeout);
    mouseStopTimeout = setTimeout(() => {
        clearAllHoverClasses();
    }, 50);
});

function processHover(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (let i = 0; i < alvos.length; i++) {
        const alvo = alvos[i];
        const rect = alvo.getBoundingClientRect();

        const dx = Math.max(rect.left - mouseX, mouseX - rect.right, 0);
        const dy = Math.max(rect.top - mouseY, mouseY - rect.bottom, 0);
        const distancia = Math.sqrt(dx * dx + dy * dy);

        let novaClasse = null;

        if (distancia <= 5) {
            novaClasse = 'hover-fake';
        } else if (distancia <= 20) {
            novaClasse = 'hover-fake1';
        } else if (distancia <= 50) {
            novaClasse = 'hover-fake2';
        }

        if (novaClasse) {
            // Remove todas as classes antes de adicionar a nova
            classesFake.forEach(classe => alvo.classList.remove(classe));
            alvo.classList.add(novaClasse);
            alvo.dataset.currentHoverClass = novaClasse;
        } else {
            // Se nenhuma classe se aplica, remove todas
            classesFake.forEach(classe => alvo.classList.remove(classe));
            delete alvo.dataset.currentHoverClass;
        }
    }
}

function clearAllHoverClasses() {
    for (const alvo of alvos) {
        classesFake.forEach(classe => alvo.classList.remove(classe));
        delete alvo.dataset.currentHoverClass;
    }
}