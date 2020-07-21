import * as React from "react";
import { Controller } from "../model/Controller";

export interface ScoreInterface {
    equipe:number,
    inverse: boolean,
    placement: string,
    lancerTpsMort: any,
    controller: Controller,
    updateUi: any
}
  
export class Score extends React.Component<ScoreInterface, {}> {

    constructor(props: ScoreInterface) {
        super(props);
    }

    majScore = () => {
        this.props.updateUi();
    }

    render() {

        let position = "bloc_equipe anime";
        //on rajoute à position Adroite ou Agauche si on doit inverser
        //if(this.props.inverse) position = this.position(position);
        if(this.props.inverse) position = position + this.props.placement;

        return(
            <div className={position}>
                <SetEquipe set={this.props.controller.getMatch().equipes[this.props.equipe].getsetGagnes()} />
                <NomEquipe equipe={this.props.equipe} controller={this.props.controller} updateUI={this.props.updateUi} />
                <ButtonScore 
                    updateUI={this.majScore} 
                    equipe= {this.props.equipe}
                    controller={this.props.controller}
                />
                {/*<InputScore score={this.props.score} /> */}
                <InputScore score={this.props.controller.getScore(this.props.equipe)} />
                <TempsMorts
                    equipe={this.props.equipe}
                    lancerUItpsMort={this.props.lancerTpsMort}
                    controller={this.props.controller}
                     />
                
            </div>
        )
    }
}

export class SetEquipe extends React.Component<{set: number}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="setEquipe">
                <input readOnly type="text" value={ this.props.set } />
            </div>
        )
    }
}

export class NomEquipe extends React.Component< {equipe: number, controller: Controller, updateUI: any}, {} > {
    constructor(props: any) {
        super(props);
    }

    setNom = (e:any) => {
        this.props.controller.getMatch().setNomEquipe(this.props.equipe, e.target.value);
        this.props.updateUI();
    }
    render() {

        const n = this.props.controller.getMatch().getNomEquipe(this.props.equipe);
        console.log(n);

        return (
            <div className="container_equipe">
                <div className="equipe">
                    <div className="contenu">
                        <input className="nom" type="text" placeholder={ n } onBlur={this.setNom} />
                    </div>
                </div>
            </div>
        )
    }
}
        
export class ButtonScore extends React.Component<{updateUI: any, equipe: number, controller: Controller}, {}> {
    constructor(props: any) {
        super(props);
    }

    plus = () => {
        this.props.controller.plus(this.props.equipe);
        this.props.updateUI();
    }

    moins = () => {
        this.props.controller.moins(this.props.equipe);
        this.props.updateUI();
    }

    render() {
        return (
            <div className="container_btn">
                <div className="score">
                    <button className="btn btn-score btn_moins" onClick={this.moins}></button>
                </div>
                <div className="score">
                    <button className="btn btn-score btn_plus" onClick={this.plus}></button>
                </div>
            </div>
        )
    }
}

export class InputScore extends React.Component<{score: number}, {}> {
    render() {
        return (
            <input className="unScore scoreGauche" readOnly value={this.props.score} />
        )
    }
}

export class TempsMorts extends React.Component<{equipe:number, lancerUItpsMort: any, controller: Controller }, {}> {

    constructor(props: any) {
        super(props);

        }
        
    demarrerTpsMort = (e: any) => {
        //updateUI : 
        this.props.lancerUItpsMort();
        //MAJ du modèle
        this.props.controller.getMatch().prendreTempsMort(this.props.equipe, e.target.value);
    }
    
    render() {

        const tpsMorts = this.props.controller.getMatch().getTempsMorts(this.props.equipe);

        console.log(tpsMorts);

        const res = (
            
        tpsMorts.map(tps => 
            (
            <div key={tps.id}>
                <button onClick={this.demarrerTpsMort } className={"btn " + tps.pasPris} value={tps.id}></button>
            </div>
            )
        )
        )

        return (
            <div className="temps-mort">

                { res }
                
            </div>
        )
    }
}

        
