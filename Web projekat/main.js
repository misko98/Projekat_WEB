import { Vojska } from "./vojska.js";
import { Puk } from "./puk.js";
import { Bataljon } from "./bataljon.js";

let vojska = [];
let br = 0;
const napraviForma = document.createElement("div");
napraviForma.className = "napraviForma";
document.body.appendChild(napraviForma);

var elLabela = document.createElement("h3");
elLabela.innerHTML = "Napravi vojsku";
napraviForma.appendChild(elLabela);

elLabela = document.createElement("label");
elLabela.innerHTML = "Unesi ime vojske";
napraviForma.appendChild(elLabela);

let tb = document.createElement("input");
tb.id = "ime";
napraviForma.appendChild(tb);

elLabela = document.createElement("label");
elLabela.innerHTML = "Odaberi državu";
napraviForma.appendChild(elLabela);

tb = document.createElement("select");
tb.id = "drzava";
let listaDrzava = [
  "Srbija",
  "Hrvatska",
  "Bosna i Hercegovina",
  "Slovenija",
  "Crna Gora",
  "Makedonija",
];


listaDrzava.forEach((drzava, index) => {
  var option = document.createElement("option");
  option.text = drzava;
  tb.add(option);
});
napraviForma.appendChild(tb);

elLabela = document.createElement("label");
elLabela.innerHTML = "Početni kapital: ";
napraviForma.append(elLabela);

tb = document.createElement("input");
tb.id = "kapital";
tb.type = "number";
tb.defaultValue = 10000;
tb.step = 1000;
napraviForma.appendChild(tb);

let btn = document.createElement("button");
btn.id = "napraviVojsku";
btn.innerHTML = "Napravi";
napraviForma.append(btn);

elLabela = document.createElement("label");
elLabela.innerHTML = "Ucitaj vojsku";
napraviForma.appendChild(elLabela);

tb = document.createElement("select");
tb.id = "loadVojska";

function updateLoad() {
fetch("https://localhost:5001/Vojska/PreuzmiVojske").then((p) => {
  p.json().then((data) => {
    data.forEach((voj) => {
      var option = document.createElement("option");
      option.text = voj.id + "." + voj.naziv;
      document.getElementById("loadVojska").add(option);
    });
  });
});
}
updateLoad();
napraviForma.appendChild(tb);

btn = document.createElement("button");
btn.id = "ucitajVojsku";
btn.innerHTML = "Učitaj";
napraviForma.append(btn);


document.getElementById("napraviVojsku").onclick = function () {
  vojska[br] = new Vojska(
    document.getElementById("ime").value,
    document.getElementById("drzava").value,
    document.getElementById("kapital").value
  );
  vojska[br].crtajVojsku(document.body);
  br++;
};

document.getElementById("ucitajVojsku").onclick = function () {
  var id = document
    .getElementById("loadVojska")
    .value.slice(0, document.getElementById("loadVojska").value.indexOf("."));
  fetch("https://localhost:5001/Vojska/PreuzmiVojsku/" + id).then((p) => {
    p.json().then((data) => {
      console.log(data);
      vojska[br] = new Vojska(data.naziv, data.drzava, data.novac);
      vojska[br].idVojske = data.id;
      vojska[br].crtajVojsku(document.body);

      data.pukovi.forEach((PUK) => {
        var sel = vojska[br].kontejner.querySelector(".vrstaPuka");
        let puk;
        switch (PUK.tip) {
          case "pesadijski":
            if (sel[1].disabled) sel[1].disabled = false;
            puk = new Puk(vojska[br].brPukova[0], "pesadijski", 1, 5);
            puk.idPuka = PUK.id;
            vojska[br].pukovi[vojska[br].brPukova[0]] = puk;
            vojska[br].brPukova[0]++;
            puk.crtajPuk(vojska[br].kontejner.querySelector(".kontPesadija"));
            break;
          case "tenkovski":
            if (sel[2].disabled) sel[2].disabled = false;
            puk = new Puk(vojska[br].brPukova[1] + 3, "tenkovski", 5, 5);
            puk.idPuka = PUK.id;
            vojska[br].pukovi[vojska[br].brPukova[1] + 3] = puk;
            vojska[br].brPukova[1]++;
            puk.crtajPuk(vojska[br].kontejner.querySelector(".kontTenkovi"));
            break;
          case "avionski":
            puk = new Puk(vojska[br].brPukova[2] + 6, "avionski", 10, 5);
            puk.idPuka = PUK.id;
            vojska[br].pukovi[vojska[br].brPukova[2] + 6] = puk;
            vojska[br].brPukova[2]++;
            puk.crtajPuk(vojska[br].kontejner.querySelector(".kontAvioni"));
            break;
        }

        PUK.bataljoni.forEach((BAT) => {
          let b = new Bataljon(
            puk.br,
            puk.brBataljona,
            BAT.maxJedinica,
            BAT.brJedinica
          );
          b.idBataljona = BAT.id;
          vojska[br].snaga += BAT.brJedinica * puk.faktorSnage;
          vojska[br].kontejner.querySelector(".snaga").innerHTML = "Snaga: " + vojska[br].snaga;
          puk.bataljoni[puk.brBataljona] = b;
          puk.brBataljona++;
          b.crtajBataljon(puk.pukKontejner.querySelector(".bataljoniDiv"), vojska[br]);
          puk.pukKontejner.querySelector(".pukLabel").innerHTML =
            puk.brBataljona + " bataljona";
        });
      });

      var select = vojska[br].kontejner.querySelector(".pukSelect");
      var length = select.options.length;
      for (var i = length - 1; i >= 0; i--) {
        select.remove(i);
      }

      vojska[br].pukovi.forEach((pukk, i) => {
        var option = document.createElement("option");
        option.text = i + 1 + ". " + pukk.vratiTip() + " puk";
        select.add(option);
      });
    });
  });
  br++;
};

  

