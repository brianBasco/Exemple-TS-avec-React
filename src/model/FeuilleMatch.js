"use strict";
exports.__esModule = true;
var FeuilleMatch = /** @class */ (function () {
    function FeuilleMatch() {
        this.nomLocaux = "locaux";
        this.nomVisiteurs = "visiteurs";
        this.totaux = [0, 0];
        this.feuille = new Array(5);
        for (var i = 0; i < 5; i++) {
            this.feuille[i] = [0, 0];
        }
    }
    //locaux ont pour numéro d'équipe : 0, visiteurs : 1
    FeuilleMatch.prototype.plus = function (noSet, equipe) {
        this.feuille[noSet - 1][equipe] += 1;
        this.totaux[equipe] += 1;
    };
    FeuilleMatch.prototype.moins = function (noSet, equipe) {
        if (this.feuille[noSet - 1][equipe] > 0) {
            this.feuille[noSet - 1][equipe] -= 1;
            this.totaux[equipe] -= 1;
        }
    };
    FeuilleMatch.prototype.getScores = function () {
        var i = 1;
        for (var _i = 0, _a = this.feuille; _i < _a.length; _i++) {
            var unScore = _a[_i];
            console.log("set " + i + "locaux : " + unScore[0] + "visiteurs : " + unScore[1]);
            i++;
        }
    };
    FeuilleMatch.prototype.rapport = function () {
        this.getScores();
        console.log("total LOCAUX : " + this.totaux[0] + ", total VISITEURS : " + this.totaux[1]);
    };
    return FeuilleMatch;
}());
exports.FeuilleMatch = FeuilleMatch;
var fm = new FeuilleMatch();
fm.plus(1, 0);
fm.plus(1, 1);
fm.plus(2, 0);
fm.plus(2, 1);
fm.moins(3, 0);
fm.plus(1, 0);
fm.plus(1, 1);
fm.moins(1, 0);
fm.moins(1, 1);
fm.rapport();
