"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tragaMonedasGrande = void 0;
var readline = require("readline-sync");
var colors_1 = require("colors");
var tragaMonedasGrande = /** @class */ (function () {
    function tragaMonedasGrande(pNombre, pPlayer) {
        this.premioMayor = 0;
        this.slots = ["🖤", "🤍", "🧡", "💙", "❤️", "🤎", "💚"];
        this.nombre = pNombre;
        this.player = pPlayer;
    }
    tragaMonedasGrande.prototype.entregaDePremio = function () {
        var premio = this.player.getMontoApuesta();
        if (this.verificarCoincidencia() == true) {
            premio = this.player.getMontoApuesta() * 4;
        }
        return premio;
    };
    tragaMonedasGrande.prototype.entregaPremio = function () {
        var premio1 = new Array();
        var valor = this.entregaDePremio();
        if (valor !== 0) {
            premio1.push("Ha Ganado!! ");
            premio1.push("su premio es: ".concat(valor));
            this.player.setDinero(valor + this.player.getDinero());
        }
        return premio1;
    };
    // inicio el random de los slots que saldran al azar
    tragaMonedasGrande.prototype.randomSlots = function () {
        this.slotsAleatorio = [];
        // sorteo 3 slots al azar del array completod de slots
        for (var i = 0; i < 5; i++) {
            var indiceAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsAleatorio.push(this.slots[indiceAleatorio]);
        }
        return ("SLOTS DE MAQUINA --------->" +
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
    tragaMonedasGrande.prototype.randomSlotsJugador = function () {
        this.slotsjugadorAleatorio = [];
        // sorteo 3 slots al azar para asignar al jugador
        for (var i = 0; i < 5; i++) {
            var jugadorAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsjugadorAleatorio.push(this.slots[jugadorAleatorio]);
        }
        return ("SLOTS DE JUGADOR --------->" +
            this.slotsjugadorAleatorio[0] +
            " | " +
            this.slotsjugadorAleatorio[1] +
            " | " +
            this.slotsjugadorAleatorio[2] +
            " | " +
            this.slotsAleatorio[3] +
            " | " +
            this.slotsAleatorio[4]);
    };
    tragaMonedasGrande.prototype.mostrarEnPantalla = function () {
        var tragamonedas = new tragaMonedasGrande("Tragamonedas", this.player);
        console.log((0, colors_1.yellow)(tragamonedas.randomSlots()));
        console.log((0, colors_1.blue)(tragamonedas.randomSlotsJugador()));
        console.log(tragamonedas.verificarCoincidencia());
    };
    tragaMonedasGrande.prototype.guia = function () {
        var guia = "-----------------------------------------------------------------------------------------------------\n    Un juego de tragamonedas es un tipo de juego de azar. El objetivo del juego es hacer que los s\u00EDmbolos coincidan en una l\u00EDnea de pago activa.\n    Este juego,  consiste en que el jugador recibe un grupo de 5 slots al azar, cada uno interpretado por un \"corazon\"(Indice) el cual corresponde a su grupo de slots.\n    Al mismo tiempo, la maquina tambien arroja un grupo de 5 slots al azar.\n    Si los slots generados por la maquina, coinciden con los slots del jugador, este ultimo recibira sus creditos, acorde a la coincidencia de los mismos.\n    Cuanto mayor sea el numero de coincidencias, mayor sera el premio que recibira el jugador.\n    \n       -----------------------------------------------------------------------------------------------------";
        return guia;
    };
    tragaMonedasGrande.prototype.verificarCoincidencia = function () {
        var premio = this.player.getMontoApuesta();
        var indicesCoinciden = true;
        for (var i = 0; i < this.slotsAleatorio.length; i++) {
            if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
                indicesCoinciden = false;
                break;
            }
        }
        if (indicesCoinciden) {
            var premiomayor = 2500;
            console.log("Felicidades, Usted Gano el premio Mayor!! recibio: ".concat((premiomayor =
                premiomayor * 3)));
        }
        else if (this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
            this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
            this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2] ||
            this.slotsAleatorio[3] === this.slotsjugadorAleatorio[3] ||
            this.slotsAleatorio[4] === this.slotsjugadorAleatorio[4]) {
            console.log("Usted acert\u00F3 uno de los slots!! usted gano ".concat(premio * 1, " creditos "));
        }
        else {
            var premio_1 = this.player.getMontoApuesta();
            console.log("usted no gano,perdi\u00F3 ".concat((premio_1 = premio_1 / 2), " siga participando"));
        }
    };
    tragaMonedasGrande.prototype.play = function (casino) {
        var hCasino;
        console.log(casino.clear());
        console.log(casino.reglas(this.nombre));
        console.log(this.guia());
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
            //hCasino.push.apply(hCasino, this.entregaPremio());
            casino.setCasino(hCasino);
            casino.mostrarMensaje();
        } while (this.player.getDinero() > 0 &&
            readline.keyInYN("Queres volver a intentar? "));
    };
    return tragaMonedasGrande;
}());
exports.tragaMonedasGrande = tragaMonedasGrande;
