import * as React from "react";
import { Dialog2 } from "./Dialog2";
import ReactDOM = require("react-dom");

export class Menu extends React.Component
    <
    //props
        {
            inverser: any,
            nouveauSet: any,
            nouveauMatch: any
        },
    //state
        {}> {

   constructor(props: any) {
       super(props);
   }

   inverser = () => {
       this.props.inverser();
   }

    nouveauSet = () => {
        this.creerDialog("Nouveau Set ?", this.props.nouveauSet);
    }

    nouveauMatch = () => {
        this.creerDialog("Nouveau Match ?", this.props.nouveauMatch);
    }

    creerDialog = (titre: string, fonction: any) => {
        const e = <Dialog2 titre={titre} accepter={fonction} />;
        ReactDOM.render(e, document.getElementById("dialog"));
    }


    render() {
        return ( 
            <header className="header">
                <button onClick={this.nouveauMatch} className="btn" >Nouveau match</button>
                <button onClick={this.nouveauSet} className="btn" >nouveau Set</button>
                <button onClick={this.inverser} className="btn">inverser</button>
            </header>
        )
    }
}







            

  