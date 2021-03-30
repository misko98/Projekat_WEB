import { Bataljon } from "./bataljon.js";
export class Puk {
  constructor(br, tip, faktorSnage, maxBataljona) {
    this.idPuka = 0;
    this.br = br;
    this.tip = tip;
    this.faktorSnage = faktorSnage;
    this.brBataljona = 0;
    this.maxBataljona = maxBataljona;
    this.bataljoni = [];
    this.pukKontejner = null;
  }
  vratiID() {
    return this.idPuka;
  }
  vratiTip() {
    return this.tip;
  }
  vratiBoju() {
    if (this.tip == "avionski") return "#ff5555";
    else if (this.tip == "tenkovski") return "#5555ff";
    else if (this.tip == "pesadijski") return "#55ff55";
  }
  crtajPuk(host) {
    this.pukKontejner = document.createElement("div");
    this.pukKontejner.className = "puk";
    this.pukKontejner.style.backgroundColor = this.vratiBoju();
    host.appendChild(this.pukKontejner);
    var label = document.createElement("label");
    label.className = "pukLabel";
    label.innerHTML = "0 bataljona";
    this.pukKontejner.appendChild(label);

    let bataljoni = document.createElement("div");
    bataljoni.classList.add("bataljoniDiv");
    this.pukKontejner.appendChild(bataljoni);
  }
  dodajBataljon(vojska) {
    if (this.brBataljona >= this.maxBataljona) {
      alert("Maksimalno bataljona u puku!");
      return;
    }
    if (vojska.novac < 1000) {
      alert("Nedovoljno novca!");
      return;
    }
    let b = new Bataljon(this.br, this.brBataljona, 20);
    this.bataljoni[this.brBataljona] = b;
    this.brBataljona++;
    b.crtajBataljon(this.pukKontejner.querySelector(".bataljoniDiv"), vojska);
    this.pukKontejner.querySelector(".pukLabel").innerHTML =
      this.brBataljona + " bataljona";
    vojska.novac = vojska.novac - 1000;
    vojska.kontejner.querySelector(".novac").innerHTML =
      "Novac: " + vojska.novac + " dinara";
  }
}
