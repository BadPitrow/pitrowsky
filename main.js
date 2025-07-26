const grid = document.querySelector('.hex-grid');
const spacingHex = 2;
const spacingRows = 2;
const hexagonWidth = 20;
const altTopLine = 2;

document.documentElement.style.setProperty('--spacing', `${spacingHex}px`);
document.documentElement.style.setProperty('--hexwidth', `${hexagonWidth}px`);

const totalWidth = window.innerWidth;
const TotalRows = 100;
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

    let bloqueado = false;
    let menuAtivo = false;

function ListOn() {
  if (bloqueado) return;
  bloqueado = true;

  const icon = document.querySelector('.header-menu i');

  icon.classList.add('fade-out');

  setTimeout(() => {
    const isBars = icon.classList.contains('fa-bars');
    icon.classList.remove('fade-out');
    icon.classList.remove(isBars ? 'fa-bars' : 'fa-xmark');
    icon.classList.add(isBars ? 'fa-xmark' : 'fa-bars');

    icon.classList.add('fade-in');

    setTimeout(() => {
      icon.classList.remove('fade-in');
      bloqueado = false;
    }, 300);

  }, 300);

  const list = document.querySelector('.header-list');
  list.classList.toggle('on');
  if (list.classList.contains('on')) {
    menuAtivo = true;
  } else {
    menuAtivo = false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".body-container-one-card");

  const linhas = Array.from(container.querySelectorAll("h2 > .fade-text, h4"));

  linhas.forEach((linha, index) => {
    linha.classList.add("fade-line");

    setTimeout(() => {
      linha.classList.add("apareceu");
    }, index * 100);
  });

  const duracaoAnimacao = 400;
  const intervaloEntreLinhas = 100;

  const totalTempo = (linhas.length - 1) * intervaloEntreLinhas + duracaoAnimacao + 100;

  setTimeout(() => {
    linhas.forEach((linha) => {
      linha.classList.remove("fade-line", "apareceu");
    });
  }, totalTempo);
});

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
window.addEventListener('load', atualizarData);

const date = new Date();

function atualizarData() {

    function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
    }

const DataOntemSemFormatacao = new Date(date);
DataOntemSemFormatacao.setDate(date.getDate() - 1);
const DataOntemFormatada = formatarData(DataOntemSemFormatacao);

const DataHojeFormatada = formatarData(date);

const DataAmanhaSemFormatacao = new Date(date);
DataAmanhaSemFormatacao.setDate(date.getDate() + 1);
const DataAmanhaFormatada = formatarData(DataAmanhaSemFormatacao);

const diasFuturos = [];

for(let i = 2; i <= 6; i++) {
  const dataFutura = new Date(date);
  dataFutura.setDate(date.getDate() + i);
  diasFuturos.push(formatarData(dataFutura));
}

const DataOntem = DataOntemFormatada;
const DataHoje = DataHojeFormatada;
const DataAmanha = DataAmanhaFormatada;
const DataDepoisDeAmanha = diasFuturos[0];
const DataTresDiasDepois = diasFuturos[1];
const DataQuatroDiasDepois = diasFuturos[2];
const DataCincoDiasDepois = diasFuturos[3];
const DataSeisDiasDepois = diasFuturos[4];

console.log(DataOntem);
console.log(DataHoje);
console.log(DataAmanha);
console.log(DataDepoisDeAmanha);
console.log(DataTresDiasDepois);
console.log(DataQuatroDiasDepois);
console.log(DataCincoDiasDepois);
console.log(DataSeisDiasDepois);

  const DiasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const DiasGerados = [];

  for (let i = 0; i < 7; i++) {
    const data = new Date(date);
    data.setDate(date.getDate() + i);
    const DiaDaSemana = DiasDaSemana[data.getDay()];
    DiasGerados.push(DiaDaSemana);
  }

  const DateCalendarContFour = document.getElementById("date-calendar-cont-four");

  DiasGerados.forEach(day => {
    const el = document.createElement("h2");
    el.className = "calendar-tittle-cont-four";
    el.textContent = day;
    DateCalendarContFour.appendChild(el);
});

const titulosContFour = document.querySelectorAll('.calendar-tittle-cont-four');

    for (let numberCalendarContFour = 0; numberCalendarContFour <= 6; numberCalendarContFour++) {
        let titulo = titulosContFour[numberCalendarContFour];
        let textContentTittle = titulo.textContent;
        if (numberCalendarContFour === 0) {
            titulo.textContent = `Hoje - ${DataHoje}`;
        }
        else if (numberCalendarContFour === 1) {
            titulo.textContent = `Amanhã - ${DataAmanha}`;
        }
        else if (numberCalendarContFour === 2) {
            titulo.textContent = `Depois de Amanhã - ${DataDepoisDeAmanha}`;
        }
        else if (numberCalendarContFour === 3) {
            titulo.textContent = `${textContentTittle} - ${DataTresDiasDepois}`;
        }
        else if (numberCalendarContFour === 4) {
            titulo.textContent = `${textContentTittle} - ${DataQuatroDiasDepois}`;
        }
        else if (numberCalendarContFour === 5) {
            titulo.textContent = `${textContentTittle} - ${DataCincoDiasDepois}`;
        }
        else if (numberCalendarContFour === 6) {
            titulo.textContent = `${textContentTittle} - ${DataSeisDiasDepois}`;
        }
    }
    activeDateInitial();
}

function recarregarAoMeiaNoite() {
  const agora = new Date();

  // Próxima meia-noite (amanhã, 00:00:00)
  const proximaMeiaNoite = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate() + 1, // amanhã
    0, 0, 0, 0
  );

  const tempoRestante = proximaMeiaNoite - agora; // diferença em ms

  setTimeout(() => {
    window.location.reload();
  }, tempoRestante);
}

window.addEventListener('load', recarregarAoMeiaNoite);

function activeDateInitial() {
    const TittleContFour = document.querySelectorAll('.calendar-tittle-cont-four');
    if (TittleContFour.length > 0) {
    TittleContFour[0].classList.add('ativo');
    }
}

console.log(document.querySelector('.ativo'));
