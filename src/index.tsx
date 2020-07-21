import * as React from "react";
import * as ReactDOM from "react-dom";

import { Match } from "./model/Match";
import { Controller } from "./model/Controller";

import { App } from "./components/App";

var match = new Match();
var controller = new Controller();
controller.addMatch(match);
match.addController(controller);

// J'ai fait le choix d'utiliser un controller, mais on pourrait s'en passer
// et n'utiliser que Match comme modèle

ReactDOM.render(
    <App controller={ controller }/>,
    document.getElementById("app")
)

