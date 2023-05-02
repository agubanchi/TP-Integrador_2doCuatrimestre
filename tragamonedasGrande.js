"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tragamonedasGrande = void 0;
var readline = require("readline-sync");
var colors_1 = require("colors");
var tragamonedas_1 = require("./tragamonedas");
var tragamonedasGrande = /** @class */ (function (_super) {
    __extends(tragamonedasGrande, _super);
    function tragamonedasGrande(pNombre, pPlayer) {
        return _super.call(this, pNombre, pPlayer) || this;
    }
    /* Calculamos el premio segun las condiciones =
    1- Si el jugador aceertó todos los slots, recibe un premio de su apuesta multiplicado por 10.
    2' Si el jugador acertó uno o dos slots en su combinación, recibe su apuesta multiplicada por 5.
  
    3' Si el jugador no acertó ninguna conbinación de slots, pierde su dinero apostado.
    
    */
    tragamonedasGrande.prototype.verificarCoincidencia = function () {
        var indicesCoinciden = true;
        for (var i = 0; i < this.slotsAleatorio.length; i++) {
            if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
                indicesCoinciden = false;
                break;
            }
        }
        if (indicesCoinciden) {
            console.log("Felicidades, Ganaste el premio mayor!!! ".concat(this.player.getMontoApuesta() * 10));
            this.player.getDinero(),
                this.player.setDinero(this.player.getDinero() + this.player.getMontoApuesta() * 10);
        }
        else if (this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
            this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
            this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2] ||
            this.slotsAleatorio[3] === this.slotsjugadorAleatorio[3] ||
            this.slotsAleatorio[4] === this.slotsjugadorAleatorio[4]) {
            console.log("Usted acert\u00F3 uno de los slots!! usted gano  ".concat(this.player.getMontoApuesta() * 5));
            this.player.getDinero(),
                this.player.setDinero(this.player.getDinero() + this.player.getMontoApuesta() * 5);
        }
        else {
            console.log("usted no gano,su saldo actual es ".concat(this.player.getDinero()));
        }
    };
    // inicio el random de los slots que saldran al azar
    tragamonedasGrande.prototype.randomSlots = function () {
        this.slotsAleatorio = [];
        // sorteo 5 slots al azar del array completod de slots
        for (var i = 0; i < 5; i++) {
            var indiceAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsAleatorio.push(this.slots[indiceAleatorio]);
        }
        return ("SLOTS DE MAQUINA ---------> " +
            this.slotsAleatorio[0] +
            " | " +
            this.slotsAleatorio[1] +
            " | " +
            this.slotsAleatorio[2] +
            " | " +
            this.slotsAleatorio[3] +
            " | " +
            this.slotsAleatorio[4]);
    };
    // inicio el random de los slots del Jugador
    tragamonedasGrande.prototype.randomSlotsJugador = function () {
        this.slotsjugadorAleatorio = [];
        // sorteo 5 slots al azar para asignar al jugador
        for (var i = 0; i < 5; i++) {
            var jugadorAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsjugadorAleatorio.push(this.slots[jugadorAleatorio]);
        }
        return ("SLOTS DE JUGADOR ---------> " +
            this.slotsjugadorAleatorio[0] +
            " | " +
            this.slotsjugadorAleatorio[1] +
            " | " +
            this.slotsjugadorAleatorio[2] +
            " | " +
            this.slotsjugadorAleatorio[3] +
            " | " +
            this.slotsjugadorAleatorio[4]);
    };
    tragamonedasGrande.prototype.mostrarEnPantalla = function () {
        var tragamonedas = new tragamonedasGrande("TragamonedasGrande", this.player);
        console.log((0, colors_1.yellow)(tragamonedas.randomSlots()));
        console.log((0, colors_1.blue)(tragamonedas.randomSlotsJugador()));
        console.log(tragamonedas.verificarCoincidencia());
    };
    tragamonedasGrande.prototype.guia = function () {
        var guia = "-----------------------------------------------------------------------------------------------------\n    Un juego de tragamonedas es un tipo de juego de azar. El objetivo del juego es hacer que los s\u00EDmbolos coincidan en una l\u00EDnea de pago activa.\n   ------ La Maquina de tragamonedas cuenta con 5 simbolos diferentes. ------\n\n    Este juego,  consiste en que el jugador recibe un grupo de 5 slots al azar, cada uno interpretado por un \"corazon\"(Indice) el cual corresponde a su grupo de slots.\n    Al mismo tiempo, la maquina tambien arroja un grupo de 5 slots al azar.\n    Si los slots generados por la maquina, coinciden con los slots del jugador, este ultimo recibira sus creditos, acorde a la coincidencia de los mismos.\n    Cuanto mayor sea el numero de coincidencias, mayor sera el premio que recibira el jugador.\n    \n       -----------------------------------------------------------------------------------------------------";
        return guia.black.bgCyan;
    };
    tragamonedasGrande.prototype.probabilidades = function () {
        var probabilidades = " -----------------------------------------------------------------------------------------------------En un juego de tragamonedas con 5 símbolos y una línea de pago de 5 símbolos, y con hasta 5 combinaciones posibles de pago, la probabilidad de obtener una combinación ganadora en una sola tirada dependerá del número de combinaciones ganadoras posibles y de la frecuencia con la que aparecen en los símbolos.";
        (" Si asumimos que hay 5 combinaciones ganadoras posibles en la línea de pago y cada una aparece con la misma frecuencia en los símbolos, entonces la probabilidad de ganar en una sola tirada sería de 5/3125, o aproximadamente 0.16%. Esto se puede calcular multiplicando la probabilidad de que aparezca la primera combinación ganadora (1/3125) por el número total de combinaciones ganadoras (5).");
        (" Es importante tener en cuenta que la frecuencia de aparición de cada combinación ganadora dependerá del diseño específico de la máquina tragamonedas.-----------------------------------------------------------------------------------------------------");
        return probabilidades.black.bgYellow;
    };
    tragamonedasGrande.prototype.play = function (casino) {
        var hCasino;
        console.log(casino.clear());
        console.log(casino.reglas(this.nombre));
        console.log(this.guia());
        console.log(this.probabilidades());
        casino.pausa();
        do {
            hCasino = [];
            console.log(casino.clear());
            casino.welcome(this.nombre);
            console.log(casino.clear());
            hCasino.push("su saldo actual es de ".concat(this.player.getDinero()));
            casino.setCasino(hCasino);
            casino.mostrarMensaje();
            hCasino = [];
            this.player.apuesta(casino);
            console.log(casino.clear());
            casino.setCasino(this.mostrarEnPantalla());
            casino.mostrarInicio(this.nombre);
            casino.setCasino(hCasino);
            casino.mostrarMensaje();
        } while (this.player.getDinero() > 0 &&
            readline.keyInYN("Queres volver a intentar? "));
        return this.player.AgregarDinero();
    };
    return tragamonedasGrande;
}(tragamonedas_1.Tragamonedas));
exports.tragamonedasGrande = tragamonedasGrande;
