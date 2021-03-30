import { Puk } from "./puk.js";

export class Vojska {
  constructor(naziv, drzava, novac) {
    this.idVojske = 0;
    this.naziv = naziv;
    this.drzava = drzava;
    this.novac = novac;
    this.snaga = 0;
    this.kontejner = null;
    this.brPukova = [0, 0, 0];
    this.pukovi = [];
  }

  crtajVojsku(host) {
    if (!host) throw new Exception("Roditeljski element ne postoji");
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("kontejner");
    host.appendChild(this.kontejner);

    let thisVojska = this;

    this.crtajFormu(this.kontejner);
    this.crtajPukove(this.kontejner);

    let dugmad = document.createElement("div");
    dugmad.className = "dugmad";
    this.kontejner.appendChild(dugmad);

    let btn = document.createElement("button");
    btn.className = "btnNapad";
    btn.innerHTML = "Napad";
    btn.onclick = function () {
      thisVojska.novac += thisVojska.snaga;
      thisVojska.kontejner.querySelector(".novac").innerHTML =
        "Novac: " + thisVojska.novac + " dinara";
    };
    dugmad.appendChild(btn);

    btn = document.createElement("button");
    btn.className = "sacuvajVojsku";
    btn.innerHTML = "Sačuvaj";

    btn.onclick = async function () {
      if (thisVojska.idVojske == 0) {
        let responseV = await fetch("https://localhost:5001/Vojska/UpisiVojsku", {
          method: "POST",
          body: JSON.stringify({
            naziv: thisVojska.naziv,
            drzava: thisVojska.drzava,
            novac: thisVojska.novac,
            snaga: thisVojska.snaga,
            brPukova:
            thisVojska.brPukova[0] + thisVojska.brPukova[1] + thisVojska.brPukova[2],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        thisVojska.idVojske = await responseV.json();
  
        thisVojska.pukovi.forEach(async (PUK) => {
          let responseP = await fetch(
            "https://localhost:5001/Vojska/UpisiPuk/" + thisVojska.idVojske,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tip: PUK.tip,
                brBataljona: PUK.brBataljona,
                maxBataljona: PUK.maxBataljona,
              }),
            }
          );
  
          PUK.idPuka = await responseP.json();
  
          PUK.bataljoni.forEach(async (BAT) => {
            await fetch(
              "https://localhost:5001/Vojska/UpisiBataljon/" + PUK.vratiID(),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  brPuk: BAT.brPuk,
                  br: BAT.br,
                  maxJedinica: BAT.maxJedinica,
                  brJedinica: BAT.brJedinica,
                }),
              }
            ).then((p) => {
              if (p.ok) {
                p.json().then((q) => {
                  BAT.idBataljona = q;
                });
              }
            });
          });
        });
      } else {
        fetch("https://localhost:5001/Vojska/IzmeniVojsku/" + thisVojska.idVojske, {
          method: "PUT",
          body: JSON.stringify({
            naziv: thisVojska.naziv,
            drzava: thisVojska.drzava,
            novac: thisVojska.novac,
            snaga: thisVojska.snaga,
            brPukova:
            thisVojska.brPukova[0] + thisVojska.brPukova[1] + thisVojska.brPukova[2],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        thisVojska.pukovi.forEach(async (PUK) => {
          if (PUK.idPuka == 0) {
            let response = await fetch(
              "https://localhost:5001/Vojska/UpisiPuk/" + thisVojska.idVojske,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tip: PUK.tip,
                  brBataljona: PUK.brBataljona,
                  maxBataljona: PUK.maxBataljona,
                }),
              }
            );
  
            PUK.idPuka = await response.json();
          } else {
            fetch(
              "https://localhost:5001/Vojska/IzmeniPuk/" +
              thisVojska.idVojske +
                "/" +
                PUK.vratiID(),
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tip: PUK.tip,
                  brBataljona: PUK.brBataljona,
                  maxBataljona: PUK.maxBataljona,
                }),
              }
            );
          }
  
          PUK.bataljoni.forEach(async (BAT) => {
            if (BAT.idBataljona == 0) {
              await fetch(
                "https://localhost:5001/Vojska/UpisiBataljon/" + PUK.vratiID(),
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    brPuk: BAT.brPuk,
                    br: BAT.br,
                    maxJedinica: BAT.maxJedinica,
                    brJedinica: BAT.brJedinica,
                  }),
                }
              ).then((p) => {
                if (p.ok) {
                  p.json().then((q) => {
                    BAT.idBataljona = q;
                  });
                }
              });
            } else {
              fetch(
                "https://localhost:5001/Vojska/IzmeniBataljon/" +
                thisVojska.idVojske +
                  "/" +
                  PUK.vratiID() +
                  "/" +
                  BAT.vratiID(),
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    brPuk: BAT.brPuk,
                    br: BAT.br,
                    maxJedinica: BAT.maxJedinica,
                    brJedinica: BAT.brJedinica,
                  }),
                }
              );
            }
          });
        });
      }
    };

    dugmad.appendChild(btn);

    btn = document.createElement("button");
    btn.className = "obrisiVojsku";
    btn.innerHTML = "Obriši vojsku";

    btn.onclick = function () {
      if (
        confirm(
          "Da li ste sigurni da zelite da izbrisete ovu vojsku? Vojska ce biti izgubljena zauvek."
        )
      ) {
        if (thisVojska.idVojske != 0) {
          fetch(
            "https://localhost:5001/Vojska/IzbrisiVojsku/" +
              thisVojska.idVojske,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
        }
        thisVojska.pukovi.forEach((puk) => {
          puk.bataljoni.forEach((bat) => {
            bat = null;
          });
          puk = null;
        });
        thisVojska.kontejner.remove();
        thisVojska = null;
      }
    };

    dugmad.appendChild(btn);
  }
  crtajFormu(host) {
    const kontForma = document.createElement("div");
    kontForma.className = "kontForma";
    host.appendChild(kontForma);

    var labela = document.createElement("h3");
    labela.innerHTML = this.naziv;
    kontForma.appendChild(labela);

    labela = document.createElement("h3");
    labela.innerHTML = this.drzava;
    kontForma.appendChild(labela);

    labela = document.createElement("h3");
    labela.className = "novac";
    labela.innerHTML = "Novac: " + this.novac + " dinara";
    kontForma.appendChild(labela);

    labela = document.createElement("h3");
    labela.className = "snaga";
    labela.innerHTML = "Snaga: " + this.snaga;
    kontForma.appendChild(labela);

    labela = document.createElement("h3");
    labela.innerHTML = "Dodaj puk";
    kontForma.appendChild(labela);

    let tb = document.createElement("select");
    tb.className = "vrstaPuka";
    var option = document.createElement("option");
    option.text = "Pešadijski puk (1000 din)";
    tb.add(option);
    option = document.createElement("option");
    option.text = "Tenkovski puk (5000 din)";
    option.disabled = true;
    tb.add(option);
    option = document.createElement("option");
    option.text = "Avionski puk (10000 din)";
    option.disabled = true;
    tb.add(option);
    kontForma.appendChild(tb);

    let btn = document.createElement("button");
    btn.className = "dodajPuk";
    btn.innerHTML = "Dodaj";
    kontForma.append(btn);

    labela = document.createElement("h3");
    labela.innerHTML = "Dodaj bataljon <br> (1000 din)";
    kontForma.appendChild(labela);

    tb = document.createElement("select");
    tb.className = "pukSelect";
    kontForma.appendChild(tb);

    btn = document.createElement("button");
    btn.className = "dodajBataljon";
    btn.innerHTML = "Dodaj";
    kontForma.append(btn);
  }
  crtajPukove(host) {
    const kontVojska = document.createElement("div");
    kontVojska.className = "kontVojska";
    host.appendChild(kontVojska);

    const kontAvioni = document.createElement("div");
    kontAvioni.className = "kontAvioni";
    kontAvioni.innerHTML =
      "<label>Avioni</label><label>1000 din po jedinici</label>";
    kontVojska.appendChild(kontAvioni);

    const kontTenkovi = document.createElement("div");
    kontTenkovi.className = "kontTenkovi";
    kontTenkovi.innerHTML =
      "<label>Tenkovi</label><label>500 din po jedinici</label>";
    kontVojska.appendChild(kontTenkovi);

    const kontPesadija = document.createElement("div");
    kontPesadija.className = "kontPesadija";
    kontPesadija.innerHTML =
      "<label>Pesadija</label><label>100 din po jedinici</label>";
    kontVojska.appendChild(kontPesadija);
    let thisVojska = this;
    this.kontejner.querySelector(".dodajPuk").onclick = function () {
      var sel = thisVojska.kontejner.querySelector(".vrstaPuka");
      let puk;
      switch (sel.selectedIndex) {
        case 0:
          if (thisVojska.brPukova[0] == 3) {
            alert("Imate maksimalno pesadijskih pukova!");
            return;
          }
          if (thisVojska.novac < 1000) {
            alert("Nedovoljno novca!");
            return;
          }
          thisVojska.novac = thisVojska.novac - 1000;
          if (sel[1].disabled) sel[1].disabled = false;
          puk = new Puk(thisVojska.brPukova[0], "pesadijski", 1, 5);
          thisVojska.pukovi[thisVojska.brPukova[0]] = puk;
          thisVojska.brPukova[0]++;
          puk.crtajPuk(kontPesadija);
          break;
        case 1:
          if (thisVojska.brPukova[1] == 3) {
            alert("Imate maksimalno tenkovskih pukova!");
            return;
          }
          if (thisVojska.novac < 5000) {
            alert("Nedovoljno novca!");
            return;
          }
          thisVojska.novac = thisVojska.novac - 5000;
          if (sel[2].disabled) sel[2].disabled = false;
          puk = new Puk(thisVojska.brPukova[1] + 3, "tenkovski", 5, 5);
          thisVojska.pukovi[thisVojska.brPukova[1] + 3] = puk;
          thisVojska.brPukova[1]++;
          puk.crtajPuk(kontTenkovi);
          break;
        case 2:
          if (thisVojska.brPukova[2] == 3) {
            alert("Imate maksimalno avionskih pukova!");
            return;
          }
          if (thisVojska.novac < 10000) {
            alert("Nedovoljno novca!");
            return;
          }
          thisVojska.novac = thisVojska.novac - 10000;
          puk = new Puk(thisVojska.brPukova[2] + 6, "avionski", 10, 5);
          thisVojska.pukovi[thisVojska.brPukova[2] + 6] = puk;
          thisVojska.brPukova[2]++;
          puk.crtajPuk(kontAvioni);
          break;
      }
      var select = thisVojska.kontejner.querySelector(".pukSelect");
      var length = select.options.length;
      for (var i = length - 1; i >= 0; i--) {
        select.remove(i);
      }

      thisVojska.pukovi.forEach((pukk, i) => {
        var option = document.createElement("option");
        option.text = i + 1 + ". " + pukk.vratiTip() + " puk";
        select.add(option);
      });
      thisVojska.kontejner.querySelector(".novac").innerHTML =
        "Novac: " + thisVojska.novac + " dinara";
    };
    thisVojska.kontejner.querySelector(".dodajBataljon").onclick = function () {
      var lbl = thisVojska.kontejner.querySelector(".pukSelect").value;
      thisVojska.pukovi[lbl[0] - 1].dodajBataljon(thisVojska);
    };
  }
}
