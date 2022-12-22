const sv = [
  `Мак. јазик
Математика
Англиски
Втор јазик
Ликовно
Музичко
Природни науки
Техничко образ.
Информатика
Географија
Историја
Физичко
Изборен
Поведение`,
  `Мак. јазик
Математика
Англиски
Втор јазик
Ликовно
Музичко
Информатика
Географија
Историја
Етика
Биологија
Физичко
Изборен
Поведение`,
  `Мак. јазик
Математика
Англиски
Втор јазик
Ликовно
Музичко
Географија
Историја
Граѓанско
Биологија
Физика
Хемија
Физичко
Изборен
Поведение`,
  `Мак. јазик
Математика
Англиски
Втор јазик
Ликовно
Музичко
Географија
Историја
Граѓанско
Биологија
Физика
Хемија
Иновации
Физичко
Изборен
Поведение`,
];
function checkIsEverythingOk() {
  const lista = document.querySelectorAll(".change-color");
  if (lista.length < 59) {
    return false;
  } else {
    return true;
  }
}
function presmetajPoeni(struka) {
  let ocenki = [];
  let suma = 0;
  let lista = document.querySelectorAll(".change-color");
  lista.forEach((el) => {
    ocenki.push(Number(el.textContent));
  });
  ocenki.forEach((el) => {
    suma += el;
  });
  let poeniOdSredenUspeh =
    ((suma - ocenki[13] - ocenki[27] - ocenki[42] - ocenki[58]) / 55) * 10;
  let poeniOdPovedenie =
    (ocenki[13] + ocenki[27] + ocenki[42] + ocenki[58]) / 4;
  let poeniOdMakJaz =
    (ocenki[0] + ocenki[14] + ocenki[14 + 14] + ocenki[28 + 15]) / 4;
  let poeniOdMatem =
    (ocenki[1] + ocenki[15] + ocenki[14 + 15] + ocenki[29 + 15]) / 4;
  let poeniOdAngljaz =
    (ocenki[2] + ocenki[16] + ocenki[16 + 14] + ocenki[30 + 15]) / 4;
  let poeniOdFiz = (ocenki[53] + ocenki[38]) / 2;
  let poeniOdBiologija = (ocenki[24] + ocenki[37] + ocenki[52]) / 3;

  let poeniOdHemija = ocenki[36] + ocenki[54];

  let poeniOdStr =
    struka == "licni"
      ? poeniOdMakJaz + poeniOdAngljaz + poeniOdBiologija + poeniOdHemija
      : poeniOdMakJaz + poeniOdAngljaz + poeniOdMatem + poeniOdFiz;
  let poeni = poeniOdSredenUspeh + poeniOdPovedenie + poeniOdStr;
  poeniEl.textContent = poeni;
}
const form = document.querySelector("form");
const tables = document.querySelectorAll("table");
const error = document.querySelector(".error");
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");

const poeniEl = document.querySelector(".poeni");

tables.forEach((table, index) => {
  let svPredmeti = [];
  let html = ``;
  svPredmeti = sv[index].split("\n");
  svPredmeti.forEach((predmet) => {
    html += `<tr><th>${predmet}</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>`;
  });
  table.innerHTML = html;
});
const povedenie = document.querySelectorAll(`table tr:last-child`);

povedenie.forEach((el) => {
  el.innerHTML = `<tr><th>Поведение</th><th></th><th>0</th><th>3</th><th>5</th></tr>`;
});
tables.forEach((table) => {
  table.addEventListener("click", (e) => {
    if (e.target) {
      if (e.target.closest("tr")) {
        let row = e.target.closest("tr");
        let th = row.querySelectorAll("th");
        let th1 = [...th];

        th1.forEach((el) => {
          el.classList.remove("change-color");
        });
      }
    }
    let firstColumnEl = table.querySelectorAll("tr th:first-child");

    let firstColumnElList = [...firstColumnEl];

    if (!firstColumnElList.includes(e.target) && e.target !== table) {
      e.target.classList.toggle("change-color");
    }
  });
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!checkIsEverythingOk()) {
    error.textContent = "Пополете ги сите оцени!";
    error.style.color = "red";
    return;
  } else if (form.struka.value == "licni") {
    presmetajPoeni("licni");
  } else presmetajPoeni("electro");
});
reset.addEventListener("click", (e) => {
  e.preventDefault();
  const lista = document.querySelectorAll(".change-color");
  lista.forEach((el) => {
    el.classList.remove("change-color");
    error.innerHTML = "";
  });
});
