"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var readline = require("readline-sync");
var readlineSync = require("readline-sync");
var menu_1 = require("./menu");
var Player = /** @class */ (function () {
    function Player(pNombre, pEdad, pDinero) {
        this.nombre = pNombre;
        this.edad = pEdad;
        this.dinero = pDinero;
        this.montoApuesta = 0;
    }
    Player.prototype.getNombre = function () {
        return this.nombre;
    };
    Player.prototype.setNombre = function (pNombre) {
        this.nombre = pNombre;
    };
    Player.prototype.getEdad = function () {
        return this.edad;
    };
    Player.prototype.setEdad = function (pEdad) {
        this.edad = pEdad;
    };
    Player.prototype.validacionDeEdad = function (pEdad) {
        pEdad = this.edad;
        if (pEdad >= 18) {
            console.log("Bienvenido al Casino del indio programador!");
        }
        else {
            console.log("Usted no puede ingresar al establecimiento");
            process.exit();
        }
        return pEdad;
    };
    Player.prototype.getDinero = function () {
        return this.dinero;
    };
    Player.prototype.setDinero = function (pDinero) {
        this.dinero = pDinero;
    };
    Player.prototype.getMontoApuesta = function () {
        return this.montoApuesta;
    };
    Player.prototype.setMontoApuesta = function (pMontoApuesta) {
        this.montoApuesta = pMontoApuesta;
    };
    Player.prototype.apuesta = function (i) {
        do { } while (i.datoMenuIngreso(this.dinero, 1, 2, this) === false);
        this.dinero = this.dinero - this.montoApuesta;
    };
    Player.prototype.AgregarDinero = function () {
        var monto;
        if (readlineSync.keyInYN("desea agregar más crédito?")) {
            monto = readline.questionInt("Ingrese los créditos que desea agregar");
            if (monto >= 0) {
                this.dinero = this.dinero + monto;
            }
            else {
                console.log("el monto debe ser mayor a cero");
            }
        }
    };
    Player.prototype.playGame = function (pPlay) {
        var valor;
        do {
            valor = pPlay.menuCasino();
            if (valor > 0 && valor < 5) {
                var menu = new menu_1.Menu();
                menu.factory(valor, this, pPlay);
            }
            else {
                if (valor < 0 || valor >= 5) {
                    console.log("Debe ingresar un número que este en el menú");
                    pPlay.clear();
                    pPlay.menuCasino();
                }
            }
        } while (valor != 0);
    };
    return Player;
}());
exports.Player = Player;
