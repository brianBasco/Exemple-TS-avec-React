import { Match } from "./Match";

export class Equipe {

    nom: string;
    //score est un tableau comprenant un score à chaque index
    private score: number[];
    tpsMort: {id:number,pasPris:boolean}[];
    match: Match;
    setGagnes: number;

    constructor(nom: string, match: Match) {
        this.match = match;
        this.nom = nom;
        this.tpsMort = [{id:1,pasPris:true},{id:2,pasPris:true}];
        this.setGagnes = 0;
        
        this.score = new Array();

        for(let i = 0; i<5 ;i++) {
            this.score.push(0);
        }
    }

    // getters
    getsetGagnes():number {
        return this.setGagnes;
    }
    
    getLeScore(noSet:number) : number{
        return this.score[noSet-1];
    }

    // setters
    setNom(n: string) {
        this.nom = n;
    }

    private putLeScore(noSet:number, score:number) {
        this.score[noSet-1] = score;
    }

    plus(noSet:number) {
        let score = this.getLeScore(noSet);
        this.putLeScore(noSet, score+1);
        this.observeTpsMortTech(noSet);
    }

    moins(noSet:number) {
        let score = this.getLeScore(noSet);
        if(score > 0) this.putLeScore(noSet, score-1);
    }

    observeTpsMortTech(noSet:number) {
        let score = this.getLeScore(noSet);
        if(score == 8 || score == 16)
            this.match.alertTpsMortTech(score);
    }

    initTpsMorts() {
        this.tpsMort.map(tps => tps.pasPris = true);
    }
}

