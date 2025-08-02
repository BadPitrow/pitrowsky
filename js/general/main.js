let adicionado1 = false;
let adicionado2 = false;

const date = new Date();
let ArrayDatas = [];

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
AddClassSabDomingo(el);
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
        titulo.textContent = `${textContentTittle} - ${DataDepoisDeAmanha}`;
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

function AddClassSabDomingo(el) {
    if (el.textContent === "Sábado") el.classList.add('sabado');
    else if (el.textContent === "Domingo") el.classList.add('domingo');
}

window.addEventListener('load', recarregarAoMeiaNoite);