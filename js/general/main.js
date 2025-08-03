const date = new Date();

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
const ArrayDatas = [DataHoje, DataAmanha, DataDepoisDeAmanha, DataTresDiasDepois, DataQuatroDiasDepois, DataCincoDiasDepois, DataSeisDiasDepois];

const DiasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const DiasGerados = [];

for (let i = 0; i < 7; i++) {
const data = new Date(date);
data.setDate(date.getDate() + i);
const DiaDaSemana = DiasDaSemana[data.getDay()];
DiasGerados.push(DiaDaSemana);
}

const DiaSelecionar = document.querySelector(".body-container-five .select-day .days");

DiasGerados.forEach(day => {
const el = document.createElement("h2");
el.className = "select-day-cont-five";
el.textContent = day;
DiaSelecionar.appendChild(el);
});

const daysContFive = document.querySelectorAll('.select-day-cont-five');

for (let dayNumFive = 0; dayNumFive < daysContFive.length; dayNumFive++) {
    let daySelFive = daysContFive[dayNumFive];
    let txtContentDaySelFive = daySelFive.textContent;
    if (dayNumFive === 0) {
        daySelFive.textContent = `Hoje - ${DataHoje}`;
    }
    else if (dayNumFive === 1) {
        daySelFive.textContent = `Amanhã - ${DataAmanha}`;
    }
    else if (dayNumFive === 2) {
        daySelFive.textContent = `${txtContentDaySelFive} - ${DataDepoisDeAmanha}`;
    }
    else if (dayNumFive === 3) {
        daySelFive.textContent = `${txtContentDaySelFive} - ${DataTresDiasDepois}`;
    }
    else if (dayNumFive === 4) {
        daySelFive.textContent = `${txtContentDaySelFive} - ${DataQuatroDiasDepois}`;
    }
    else if (dayNumFive === 5) {
        daySelFive.textContent = `${txtContentDaySelFive} - ${DataCincoDiasDepois}`;
    }
    else if (dayNumFive === 6) {
        daySelFive.textContent = `${txtContentDaySelFive} - ${DataSeisDiasDepois}`;
    }
    if (dayNumFive >= 1) daySelFive.classList.add('desativado');
}

let DayPresMomentFive = null;
let BlockAltPosFive = false;

const domingo = document.querySelectorAll('.body-container-five .select-hour .hours .domingo button');
const segunda = document.querySelectorAll('.body-container-five .select-hour .hours .segunda button');
const terça = document.querySelectorAll('.body-container-five .select-hour .hours .terça button');
const quarta = document.querySelectorAll('.body-container-five .select-hour .hours .quarta button');
const quinta = document.querySelectorAll('.body-container-five .select-hour .hours .quinta button');
const sexta = document.querySelectorAll('.body-container-five .select-hour .hours .sexta button');
const sábado = document.querySelectorAll('.body-container-five .select-hour .hours .sábado button');
const ArraySemanaC5 = [domingo, segunda, terça, quarta, quinta, sexta, sábado];

const hoursFdsSelFive = [7, 8, 9, 10, 19, 20];

ActiveHours();

function AltDayPosFive() {
    if (BlockAltPosFive) return;
    BlockAltPosFive = true;

    DayPresMomentFive = (DayPresMomentFive + 1) % 7;

    daysContFive.forEach(d => {
        if (d.classList.contains('desativado')) {
            d.classList.remove('desativado');
        }
        if (d !== daysContFive[DayPresMomentFive]) d.classList.add('desativado');
    });

    BlockAltPosFive = false;
    ActiveHours();
}
function AltDayAntFive() {
    if (BlockAltPosFive) return;
    BlockAltPosFive = true;

    DayPresMomentFive = (DayPresMomentFive - 1 + 7) % 7;

    daysContFive.forEach(d => {
        if (d.classList.contains('desativado')) {
            d.classList.remove('desativado');
        }
        if (d !== daysContFive[DayPresMomentFive]) d.classList.add('desativado');
    });

    BlockAltPosFive = false;
    ActiveHours();
}

function ActiveHours() {
    if (!DayPresMomentFive) DayPresMomentFive = 0;
    
    ArraySemanaC5.forEach(diasSemana => {
        diasSemana.forEach(d => {
            if (d.classList.contains('desativado')) d.classList.remove('desativado');
        });
    });

    const dataSelect = new Date();
    dataSelect.setDate(dataSelect.getDate() + DayPresMomentFive);
    const daySelect = dataSelect.getDay();

    const classDay = (exc) => {
        ArraySemanaC5.forEach(day => {
            if (day !== exc) day.forEach(d => d.classList.add('desativado'));
        });
    }

    classDay(ArraySemanaC5[daySelect]);

    hoursFdsSelFive.forEach((h, i) => {
        if (DayPresMomentFive === 0) {
            if (daySelect === 0 || daySelect === 6) {
                if (!CheckTime(h, 0)) {
                    const dayArraySemana = ArraySemanaC5[daySelect];
                    dayArraySemana[i].classList.add('desativado');
                }
            } else {
                if (!CheckTime(20, 30)) ArraySemanaC5[daySelect].classList.add('desativado');
            }
        }
    });

    const NoHourDisp = document.querySelector('.body-container-five .hours h2');

    const TodosDesativados = Array.from(ArraySemanaC5[daySelect]).every(e => e.classList.contains('desativado'));

    if (!TodosDesativados) {
        NoHourDisp.classList.add('desativado');
    } else {
        NoHourDisp.classList.remove('desativado');
    }
}

function CheckTime(h, m) {
    const now = new Date();
    const alvo = new Date();
    alvo.setHours(h, m, 0, 0);
    const rest = (alvo - now) / (1000 * 60 * 60);
    return rest >= 3;
}

let blockedListCreating = false;

function SelectDateAndHour() {
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-check')) {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-xmark');
        this.classList.add('selecionado');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-check');
        this.classList.remove('selecionado');
    }
    blockedListCreating = false;
}

ArraySemanaC5.forEach(days => {
    days.forEach(d => {
        d.addEventListener('click', AgendaList);
        d.addEventListener('click', SelectDateAndHour);
    });
});

let listCreates = [];

function AgendaList() {
    if (blockedListCreating) return;
    blockedListCreating = true;

    const noSelect = document.querySelector('.body-container-five .list-selects .h2');

    if (this.querySelector('i').classList.contains('fa-check')) {
        const createVisualDate = document.createElement('h2');
        createVisualDate.textContent = `${ArrayDatas[DayPresMomentFive]}`;
        createVisualDate.className = 'visualDate';
        const list = document.querySelector('.body-container-five .list-selects .list');
        list.appendChild(createVisualDate);
        const textVisualHour = this.textContent;
        const createVisualHour = document.createElement('h2');
        createVisualHour.textContent = `${textVisualHour}`;
        createVisualHour.className = 'visualHour';
        list.appendChild(createVisualHour);
        listCreates.push(`${this.textContent} ${ArrayDatas[DayPresMomentFive]}`);
        if (!noSelect.classList.contains('desativado')) noSelect.classList.add('desativado');
    } else {
        const datesList = document.querySelectorAll('.body-container-five .list-selects .list .visualDate');
        const hoursList = document.querySelectorAll('.body-container-five .list-selects .list .visualHour');

        const IndexThis = listCreates.findIndex(item => item === `${this.textContent} ${ArrayDatas[DayPresMomentFive]}`);
        console.log(`Array hours: ${hoursList}`);
        console.log(`Array dates: ${datesList}`);
        console.log(`Array listCreates: ${listCreates}`);
        console.log(`Index: ${IndexThis}`);
        hoursList[IndexThis].remove();
        datesList[IndexThis].remove();
        listCreates = listCreates.filter(item => item !== `${this.textContent} ${ArrayDatas[DayPresMomentFive]}`);

        if (listCreates.length === 0) {
            noSelect.classList.remove('desativado');
        }
    }
}
