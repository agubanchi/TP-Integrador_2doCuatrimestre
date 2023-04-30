"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var ruletaLogica_1 = require("./ruletaLogica");
var tragamonedasChico_1 = require("./tragamonedasChico");
var cartas_1 = require("./cartas");
var tragamonedasGrande_1 = require("./tragamonedasGrande");
var Menu = /** @class */ (function () {
    function Menu() {
    }
    Menu.prototype.factory = function (i, player, casino) {
        var game;
        switch (i) {
            case 0:
                console.log("Gracias por haber jugado en el casino del Indio Programador");
                break;
            case 1:
                game = new cartas_1.Cartas("Cartas", player);
                game.play(casino);
                break;
            case 2:
                game = new tragamonedasChico_1.tragaMonedasChica("Tragamonedas Corazon", player);
                game.play(casino);
                break;
            case 3:
                game = new tragamonedasGrande_1.tragamonedasGrande("Tragamonedas Premium", player);
                game.play(casino);
                break;
            case 4:
                game = new ruletaLogica_1.Ruleta("ruleta", player);
                game.play(casino);
                break;
            default:
                console.log("ingrese algun número del indice por favor: ");
        }
    };
    return Menu;
}());
exports.Menu = Menu;
