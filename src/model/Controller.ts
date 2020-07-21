import { Match } from "./Match";
import { App } from "../components/App";

export class Controller {

    match: Match;
    app: App;

    constructor() {
        //document.getElementById("plus").addEventListener("click", this.plus.bind(this));
        //document.getElementById("moins").addEventListener("click", this.moins.bind(this));
        //document.getElementById("nouveauSet").addEventListener("click", this.nouveauSet.bind(this));
        //document.getElementById("nouveauMatch").addEventListener("click", this.nouveauMatch.bind(this));
    }

    test(): number {
        return this.match.getScore(0);
    }

    alertApp() { this.app.alertFinDeSet(); }

    addMatch(match: Match) {this.match = match;}

    addApp(app: App) { this.app = app; }

    getMatch(): Match {return this.match;}

    plus(equipe: number) {
        this.match.plus(equipe);
        console.log("équipe " + this.match.getNomEquipe(equipe) + "score du set nO " + this.match.set + " : " + this.match.getScore(equipe));
    }
    
    moins(equipe:number) {
        this.match.moins(equipe);
        console.log("équipe " + this.match.getNomEquipe(equipe) + "score du set nO " + this.match.set + " : " + this.match.getScore(equipe));
    }

    getScore(equipe: number): number {
        return this.match.getScore(equipe);
    }
    
    nouveauSet(): boolean {
        //retourne un booléen, false en cas d'égalité de score, sinon true
        return this.match.nouveauSet();
    }
    
    nouveauMatch() {
        this.match.nouveauMatch();
    }

    alertTpsMortTech(score: number) {
        this.app.alertTpsMortTech();
    }
}