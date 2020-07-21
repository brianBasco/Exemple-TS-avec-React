import * as React from "react";
import { Match } from "../model/Match";

export class Recap extends React.Component<{match: Match}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {

        const sets = [1,2,3,4,5];
        const equipes = this.props.match.equipes;

        const noms = equipes.map(e => e.nom)
        
        //retourne un tableau mappé du score pour chaque set
        //une ligne pour le résultat des 2 équipes
        let res = sets.map(ligne => ({id:ligne,locaux:equipes[0].getLeScore(ligne),visiteurs:equipes[1].getLeScore(ligne)})); 
        
        const UIresults = res.map(result => <tr key={result.id}><td>{result.locaux}</td><td>{result.visiteurs}</td></tr>);
        const totLoc = res.reduce( (acc,r) => acc + r.locaux, 0 );
        const totVis = res.reduce( (acc,r) => acc + r.visiteurs, 0 );

        return (
            <div className="recap">
                <table>
                    <thead>
                    <tr><th>{noms[0]}</th><th>{noms[1]}</th></tr>
                    </thead>
                    <tbody>
                        { UIresults }
                        <tr><td>{totLoc}</td><td>{totVis}</td></tr>
                     </tbody>                
                </table>    
            </div>
        )
    }
}

