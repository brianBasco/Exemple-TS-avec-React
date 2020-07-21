import * as React from "react";
import * as ReactDOM from "react-dom";

import { Banniere } from "./Banniere";
import { Menu } from "./Menu";
import { Match } from "../model/Match";

import * as interfaces from "./Interfaces";
import { TpsMort } from "./TpsMort";
import { Recap } from "./Recap";
import { Set2 } from "./Set2";
import { Dialog2 } from "./Dialog2";
import { Score } from "./Score";


export class App extends React.Component
    <
    //props
    interfaces.Controller, 
    //state
    {
        match: Match,
        inverse: boolean,
    }
    >{

    constructor(props: interfaces.Controller) {
        super(props);

        this.props.controller.addApp(this);
        
        this.state = {
            match: this.props.controller.getMatch(),
            inverse: false,
        }
    }

    
   alertFinDeSet = () => { 
    this.creerDialog("Nouveau Set ?",this.nouveauSet);
   }

   alertTpsMortTech = () => {
    this.creerDialog("Temps-Mort technique",this.lancerTpsMort);
    }

    creerDialog = (titre: string, fonction: any) => {
        const element = <Dialog2 titre={titre} accepter={fonction} />;
        ReactDOM.render(element, document.getElementById('dialog'));
    }
    
    nouveauMatch = () => {
        this.props.controller.nouveauMatch();
        this.setState({inverse: false})
    }

    nouveauSet = () => {
        // nouveauSet contrôle s'il y a égalité des scores, ne se déclenche pas en cas d'égalité
        if(this.props.controller.nouveauSet()) {
            this.inverser();
        }
    }

    inverser = () => {
        this.setState({inverse: !this.state.inverse});
    }

    lancerTpsMort = () => {
        const t =  <TpsMort tpsDeBase={30} match={this.state.match} />;
        ReactDOM.render(t, document.getElementById("tempsMort"));

        this.updateUIMatch();
    }

    updateUIMatch = () => {
        this.setState( {match: this.props.controller.getMatch()})
    }

    render() {

        const locaux: number = 0;
        const visiteurs: number = 1;
        
        return (
            <div className="main_content">
                <Banniere />
                <Menu 
                    inverser={this.inverser}
                    nouveauSet={this.nouveauSet}
                    nouveauMatch={this.nouveauMatch}
                />
                {/* <Set set={this.state.match.getSet() }/> */}
                <Set2 m={this.state.match }/>

                <Score 
                    equipe={locaux} 
                    inverse={this.state.inverse}
                    placement={" Adroite"}
                    lancerTpsMort={this.lancerTpsMort}
                    controller={this.props.controller}
                    updateUi={this.updateUIMatch}
                />
                <Score 
                    equipe={visiteurs} 
                    inverse={this.state.inverse}
                    placement={" Agauche"}
                    lancerTpsMort={this.lancerTpsMort}
                    controller={this.props.controller}
                    updateUi={this.updateUIMatch}
                />
                <Recap match={this.state.match} />
                
            </div>
            
        )
    }
}

