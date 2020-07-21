import * as React from "react";
import { Match } from "../model/Match";
import ReactDOM = require("react-dom");

interface TpsMortInterface {
    tpsDeBase: number,
    match: Match
}

export class TpsMort extends React.Component< TpsMortInterface , {tps: number} > {

    timerID: any;

    constructor(props: any) {
        super(props);
        this.state = {tps: this.props.tpsDeBase}
        this.timerID = null;

    }

    
    passer = () => {
        ReactDOM.render(null, document.getElementById("tempsMort"));
    }
    

   componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
  }

    tick() {
        let res = this.state.tps - 1;
        this.setState({tps: res});

        if (this.state.tps == 0) clearInterval(this.timerID);
    }

    render() {

        const locaux=0;
        const visiteurs=1;

        return (
            <div className="tpsMort">

                <div className="row">
                    <div className="col-6">
                        <div className="main">
                            <input readOnly type="text" value={this.props.match.getNomEquipe(locaux)} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main">
                            <input className="score" readOnly type="text" value={this.props.match.getScore(locaux)} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="main">
                            <input readOnly type="text" value={this.props.match.getNomEquipe(visiteurs)} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main">
                            <input className="score" readOnly type="text" value={this.props.match.getScore(visiteurs)} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="main">
                            <button className="btn" onClick={ this.passer }>passer</button>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="main">
                            <input className="chrono" readOnly type="text" value={ this.state.tps} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }



}