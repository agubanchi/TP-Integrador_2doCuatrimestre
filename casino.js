"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var readline = require("readline-sync");
var colors_1 = require("colors");
var player_1 = require("./player");
//import { TragamonedasGrande } from "./tragamonedasGrande";
//import { Cartas } from "./cartas";
var Casino = /** @class */ (function () {
    function Casino(pCasino) {
        this.casino = pCasino;
    }
    Casino.prototype.welcome = function (pTitulo) {
        console.clear();
        console.log("Bienvenido al ".concat(pTitulo, "\n").grey.bgWhite);
        console.log("************** Mucha suerte **************".grey.bgWhite);
    };
    Casino.prototype.reglas = function (pGame) {
        console.log("\n");
        console.log("Esta Jugando ".concat(pGame));
        console.log((0, colors_1.red)("el juego consiste en lo siguiente: "));
        console.log("\n");
    };
    Casino.prototype.setCasino = function (pCasino) {
        this.casino = pCasino;
    };
    Casino.prototype.mostrarMensaje = function () {
        for (var i = 0; i < this.casino.length; i++) {
            console.log(this.casino[i]);
        }
    };
    Casino.prototype.probabilidades = function () {
        console.log("\n");
        console.log("las probabilidades de ganar que tenes son");
        console.log("\n");
        for (var i = 0; i < this.casino.length; i++) {
            console.log(this.casino[i]);
            console.log("\n");
        }
        console.log("Exitos! ");
    };
    Casino.prototype.mostrarInicio = function (pTitulo) {
        console.log("Disfrute mucho de ".concat(pTitulo));
        console.log("mucha suerte!!");
        console.log("\n");
    };
    Casino.prototype.menuCasino = function () {
        console.log("\n");
        console.log("    Bienvenido al Casino del indio programador".gray.bgYellow);
        console.log("\n");
        console.log("ingresa uno de los n\u00FAmeros para iniciar un juego!".gray.bgYellow);
        console.log("\n");
        console.log("1.------------------Cartas----------------------- ".red.bgWhite);
        console.log("\n");
        console.log("2.----------Tragamoneas de Corazones------------- ".blue.bgWhite);
        console.log("\n");
        console.log("3.-------------Tragamoneas Grande---------------- ".green.bgWhite);
        console.log("\n");
        console.log("4.------------------Dados----------------------- ".black.bgWhite);
        console.log("\n");
        console.log("0.*******************salir*********************** ".yellow);
        console.log("\n");
        return readline.questionInt("Ingrese una opcion del menu: ");
    };
    Casino.prototype.datoMenuIngreso = function (max, min, num, player) {
        var condicion = false;
        switch (num) {
            case 1:
                var valor = readline.questionInt("ingrese un juego: ");
                if (valor < num && valor > max) {
                    console.log("Ingrese una opcion valida del menu...");
                }
                else {
                    condicion = true;
                }
                break;
            default:
                var valor1 = readline.questionInt("Ingrese el monto a apostar: ");
                if (valor1 < min) {
                    console.log("Ingrese una suma positiva por favor...");
                }
                else {
                    if (valor1 > max) {
                        "no puede apostar ".concat(valor1, " excede su saldo ");
                    }
                    else {
                        condicion = true;
                        player.setMontoApuesta(valor1);
                    }
                }
                break;
        }
        this.pausa();
        return condicion;
    };
    Casino.prototype.pausa = function () {
        var pausa;
        pausa = readline.keyInPause("Presione cualquier tecla".trim());
    };
    Casino.prototype.clear = function () {
        console.clear();
    };
    Casino.prototype.launch = function () {
        console.log(casino1.clear());
        console.log(casino1.welcome("Casino del Indio Programador"));
        var pNombre = readline.question("Dime tu nombre: ");
        var pEdad = readline.questionInt("Ahora, dime tu edad: ");
        var pCredito = readline.questionInt("Cuantos creditos deseas comprar? ");
        if (pCredito <= 0) {
            console.log("Ingrese una suma positiva por favor...");
        }
        console.log(casino1.clear());
        var player = new player_1.Player(pNombre, pEdad, pCredito);
        player.validacionDeEdad(pEdad);
        console.log(casino1.clear());
        player.playGame(casino1);
    };
    return Casino;
}());
exports.Casino = Casino;
var casino1 = new Casino([]);
console.log(casino1.launch());
