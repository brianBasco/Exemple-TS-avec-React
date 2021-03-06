export class FeuilleMatch {

    nomLocaux: string;
    nomVisiteurs: string;
    feuille: number[][];
    totaux : number[];

    constructor() {
        this.nomLocaux = "locaux";
        this.nomVisiteurs = "visiteurs";
        this.totaux = [0,0];
        this.feuille = new Array(5);
        for (let i = 0; i<5; i++) {
            this.feuille[i] = [0,0];
        }
    }

    //locaux ont pour numéro d'équipe : 0, visiteurs : 1
    plus(noSet: number, equipe: number) {
        this.feuille[noSet - 1][equipe] += 1;
        this.totaux[equipe] += 1;
    }

    moins(noSet: number, equipe: number) {
        if(this.feuille[noSet - 1][equipe] > 0) {
            this.feuille[noSet - 1][equipe] -= 1;
            this.totaux[equipe] -= 1;
        }
        
    }

    getScores() {
        let i:number = 1;
        for (let unScore of this.feuille) {
            console.log("set " + i + "locaux : " + unScore[0] + "visiteurs : " + unScore[1]);
            i++;
        }
    }

    rapport() {
        this.getScores();
        console.log("total LOCAUX : " + this.totaux[0] + ", total VISITEURS : " + this.totaux[1]);
    }
}

let fm: FeuilleMatch = new FeuilleMatch();

fm.plus(1,0);
fm.plus(1,1);
fm.plus(2,0);
fm.plus(2,1);
fm.moins(3,0);

fm.plus(1,0);
fm.plus(1,1);
fm.moins(1,0);
fm.moins(1,1);

fm.rapport();
