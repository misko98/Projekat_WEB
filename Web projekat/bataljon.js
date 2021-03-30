export class Bataljon{
    constructor(brPuk,br,maxJedinica,brJedinica=0){
        this.idBataljona = 0;
        this.brPuk = brPuk;
        this.br=br;
        this.maxJedinica=maxJedinica;
        this.brJedinica=brJedinica;
        this.bataljonKontejner = null;
    }
    vratiID(){
        return this.idBataljona;
    }
    crtajBataljon(host,vojska){
        this.bataljonKontejner = document.createElement("div");
        this.bataljonKontejner.className="bataljon";
        host.appendChild(this.bataljonKontejner);
        var label = document.createElement("label");
        label.className ="bataljonLabel";
        label.innerHTML=this.brJedinica+" jedinica";
        this.bataljonKontejner.appendChild(label);
        let btn = document.createElement("button");
        btn.innerHTML='+';
        let thisBataljon = this;
        btn.onclick = function () {
            if(thisBataljon.brJedinica >= thisBataljon.maxJedinica) return;
            if(thisBataljon.brPuk <= 2){ 
                if(vojska.novac<100) {
                    alert("Nedovoljno novca!");
                    return;
                }
                vojska.novac-=100;
                vojska.snaga+=1;
            }
            else if (thisBataljon.brPuk > 2 && thisBataljon.brPuk < 6) {
                if(vojska.novac<500) {
                    alert("Nedovoljno novca!");
                    return;
                }
                vojska.novac-=500;
                vojska.snaga+=5;
            }
            else {
                if(vojska.novac<1000) {
                    alert("Nedovoljno novca!");
                    return;
                }
                vojska.novac-=1000;
                vojska.snaga+=10;
            }
            thisBataljon.brJedinica++;
            thisBataljon.bataljonKontejner.querySelector(".bataljonLabel").innerHTML=thisBataljon.brJedinica + " jedinica";
            vojska.kontejner.querySelector(".snaga").innerHTML="Snaga: " + vojska.snaga;
            vojska.kontejner.querySelector(".novac").innerHTML="Novac: " + vojska.novac +" dinara";
        }
        this.bataljonKontejner.appendChild(btn);
    }
}