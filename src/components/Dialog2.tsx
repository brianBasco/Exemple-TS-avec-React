import * as React from "react";
import ReactDOM = require("react-dom");

interface DialogInterface {
    titre: string,
    accepter: any
}

export class Dialog2 extends React.Component<DialogInterface, {ouvert: boolean}> {

    constructor(props: DialogInterface) {
        super(props);
        this.state = {ouvert: true}
    }
    
    accepter = ()=> {
        //méthode reçue en message à exécuter
        this.props.accepter();
        //fermer le POP-UP
        this.refuser();
     }

    // il se ferme depuis la fonction fermeture du parent
    refuser = () => {
        this.setState( {ouvert: false})

        setTimeout(function() {
            const element: any = null;
            ReactDOM.render(element, document.getElementById('dialog'));
        },2000);
    }

      render() {

        let titre: string = this.props.titre;
        let classDialog = "demande ferme";
        //Le pop up est ouvert depuis le parent (this.props.ouverture): boolean
        if (this.state.ouvert) classDialog = "demande";

        return (
            <div className={classDialog} >
                <h1>{titre}</h1>                
                <button className="btnConfirmation oui" onClick={this.accepter}>Oui</button>                
                <button className="btnConfirmation non" onClick={this.refuser}>Non</button>                
            </div>
        )
    }
}