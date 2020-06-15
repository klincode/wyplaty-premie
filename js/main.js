// Twoim zadaniem jest stworzenie skryptu, który będzie:
// - Liczył wypłatę dla każdego pracownika i wpisywał je dla każdego pracownika do pola span.wyplata
// Klient chce także, aby od razu doliczana była premia - jeżeli pracownik pracował powyżej 160 godzin, za każdą dodatkową godzinę otrzymuje podwójną stawkę.
// - Zaznaczał czerwonym tłem osoby, które przepracowały mniej niż 100 godzin

// Dodatkowo klient życzy sobie aby wyświetlała się lista trzech najlepszych pracowników - czyli takich, którzy przepracowali najwięcej godzin.
console.log(document.querySelector("#pracownik1").children[3].innerText);
const btn = document.querySelector("button");
const pracownicy = document.querySelectorAll("div[id^='pracownik']");

const obliczWyplaty = () => {
  for (pracownik of [...pracownicy]) {
    let czas = pracownik.children[1].value;
    let stawka = pracownik.children[2].value;
    let wyplata = czas * stawka;
    let premia = 0;
    //nalicz premię
    if (czas > 160) {
      premia = (czas - 160) * stawka;
    }
    //oznacz osoby pracujące < 100h
    if (czas < 100) {
      pracownik.classList.add("len");
    }
    pracownik.children[3].innerText = wyplata + premia;
  }
}

const pokazNajlepszych = () => {
  let najlepsiPrawcownicy = "";
  //sortuj tablicę po wartości wypłaty pacownika
  const najlepsi = [...pracownicy].sort((a, b) => {
    if (Number(a.children[1].value) > Number(b.children[1].value)) return 1
    else if (Number(a.children[1].value) < Number(b.children[1].value)) return -1
    else return 0;
  })

  //wybierz 3 ostatnie elementy tablicy (max wypłata)
  for (let i = najlepsi.length - 1; i > najlepsi.length - 4; i--) {
    najlepsiPrawcownicy += najlepsi[i].children[0].innerText + "\r\n"
  }

  document.querySelector("#najlepsi-pracownicy").innerText = najlepsiPrawcownicy
}

btn.addEventListener("click", obliczWyplaty);
btn.addEventListener("click", pokazNajlepszych);