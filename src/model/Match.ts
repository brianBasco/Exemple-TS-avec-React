import { Controller } from "./Controller";
import { Equipe } from "./Equipe";

//A faire : Remplacer les appels aux équipes par la méthode GETSCORE !!!!!!!!!!!!!!

export class Match {

    set:number;
    equipes: Equipe[];
    isPrisTpsMortTech: boolean[];
    controller: Controller;

    constructor() {
        this.nouveauMatch();
    }

    addController(controller: Controller) {this.controller = controller;} 
    
    nouveauSet(): boolean {

        
        //setGagne d'une équipe + 1
        if(this.getScore(0) == this.getScore(1)) {
            console.log("égalité !!! can't increment the set");
            return false;
        }

        let vainqueur=null;
        if(this.getScore(0) > this.getScore(1)) vainqueur=this.equipes[0];
        else vainqueur=this.equipes[1];
        

        this.set += 1;
        //gestion des temps mort techniques
        if(this.set < 5) {
            this.isPrisTpsMortTech[0] = false;
            this.isPrisTpsMortTech[1] = false;
        }
        else {
            this.isPrisTpsMortTech[0] = true;
            this.isPrisTpsMortTech[1] = true;
        }

        //remettre 2 temps-morts par équipe
        this.equipes.map(e => e.initTpsMorts());

        // un set de gagné en plus pour le vainqueur
        vainqueur.setGagnes +=1;

        return true;
    }

    nouveauMatch() {
        this.set = 1;
        this.equipes = new Array();
        this.equipes.push(new Equipe("locaux",this));
        this.equipes.push(new Equipe("visiteurs",this));
        //isPrisTpsMortTech est un tableau de booléens
        //correspondant au tpsMort à 8 et 16
        this.isPrisTpsMortTech = new Array();
        this.isPrisTpsMortTech.push(false);
        this.isPrisTpsMortTech.push(false);
    }

    // getters
    getSet(): number {
        return this.set;
    }

    getEquipeSet(equipe: number): number {
        return this.equipes[equipe].getsetGagnes();
    }

    //délégation des équipes
    plus(equipe:number) {
        this.equipes[equipe].plus(this.set);
        this.observeFinDeSet();
    }

    moins(equipe:number) {
        this.equipes[equipe].moins(this.set);
    }

    getScore(equipe:number): number {
        return this.equipes[equipe].getLeScore(this.set);
    }

    getNomEquipe(equipe: number): string { return this.equipes[equipe].nom }

    setNomEquipe(equipe:number, n:string) {this.equipes[equipe].setNom(n);}

    getTempsMorts(equipe: number): {id:number,pasPris:boolean}[] {
        return this.equipes[equipe].tpsMort;
    }

    prendreTempsMort(equipe: number, idTpsMort: number) {
        this.equipes[equipe].tpsMort.map(tps => {if (tps.id == idTpsMort) tps.pasPris = false})
    }

    alertTpsMortTech(score:number) {
        if (this.set <= 4) {
            switch (score) {
                case (8): {
                    if(!this.isPrisTpsMortTech[0]) {
                        this.controller.alertTpsMortTech(score);
                        this.isPrisTpsMortTech[0] = true;
                        
                    }
                    break;
                }
                case (16): {
                    if(!this.isPrisTpsMortTech[1]) {
                        this.controller.alertTpsMortTech(score);
                        this.isPrisTpsMortTech[1] = true;
                    }
                    break;
                }
            }
        }
    }

    
    observeFinDeSet() {

        let locaux: number = this.getScore(0);
        let visiteurs : number = this.getScore(1);
        if((locaux >= 25 || visiteurs >= 25) && Math.abs(locaux-visiteurs) >= 2) {
            this.controller.alertApp();
        }
        
    }
}


