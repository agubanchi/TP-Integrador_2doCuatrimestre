"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tragaMonedasChica = void 0;
var readline = require("readline-sync");
var colors_1 = require("colors");
var tragaMonedasChica = /** @class */ (function () {
    function tragaMonedasChica(pNombre, pPlayer) {
        this.slots = ["🖤", "🤍", "🧡", "💙"];
        this.nombre = pNombre;
        this.player = pPlayer;
    }
    // inicio el random de los slots que saldran al azar
    tragaMonedasChica.prototype.randomSlots = function () {
        this.slotsAleatorio = [];
        // sorteo 3 slots al azar del array completod de slots
        for (var i = 0; i < 3; i++) {
            var indiceAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsAleatorio.push(this.slots[indiceAleatorio]);
        }
        return ("SLOTS DE MAQUINA --------->" +
            this.slotsAleatorio[0] +
            " | " +
            this.slotsAleatorio[1] +
            " | " +
            this.slotsAleatorio[2]);
    };
    // inicio el random de los slots del Jugador
    tragaMonedasChica.prototype.randomSlotsJugador = function () {
        this.slotsjugadorAleatorio = [];
        // sorteo 3 slots al azar para asignar al jugador
        for (var i = 0; i < 3; i++) {
            var jugadorAleatorio = Math.floor(Math.random() * this.slots.length);
            this.slotsjugadorAleatorio.push(this.slots[jugadorAleatorio]);
        }
        return ("SLOTS DE JUGADOR --------->" +
            this.slotsjugadorAleatorio[0] +
            " | " +
            this.slotsjugadorAleatorio[1] +
            " | " +
            this.slotsjugadorAleatorio[2]);
    };
    /*
    public verificarCoincidencia(): boolean {
      let indicesCoinciden = true;
  
      for (let i = 0; i < this.slotsAleatorio.length; i++) {
        if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
          indicesCoinciden = false;
          break;
        }
      }
      if (indicesCoinciden) {
        console.log("Felicidades, Usted Gano el premio Mayor!!");
      } else if (
        this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
        this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
        this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2]
      ) {
        console.log("usted gano x creditos");
      } else {
        console.log("usted no gano, siga participando");
      }
    }
  */
    tragaMonedasChica.prototype.mostrarEnPantalla = function () {
        var tragamonedas = new tragaMonedasChica("Tragamonedas", this.player);
        console.log((0, colors_1.yellow)(tragamonedas.randomSlots()));
        console.log((0, colors_1.blue)(tragamonedas.randomSlotsJugador()));
        console.log(tragamonedas.verificarCoincidencia());
        //console.log(tragamonedas.calcularPremio());
        //console.log(tragamonedas.entregaPremio());
    };
    tragaMonedasChica.prototype.play = function (casino) {
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
            hCasino.push.apply(hCasino, this.entregaPremio());
            casino.setCasino(hCasino);
            casino.mostrarMensaje();
        } while (this.player.getDinero() > 0 &&
            readline.keyInYN("Queres volver a intentar? "));
    };
    tragaMonedasChica.prototype.guia = function () {
        var guia = "-----------------------------------------------------------------------------------------------------\n    Un juego de tragamonedas es un tipo de juego de azar. El objetivo del juego es hacer que los s\u00EDmbolos coincidan en una l\u00EDnea de pago activa.\n    Este juego,  consiste en que el jugador recibe un grupo de 3 slots al azar, cada uno interpretado por un \"corazon\"(Indice) el cual corresponde a su grupo de slots.\n    Al mismo tiempo, la maquina tambien arroja un grupo de 3 slots al azar.\n    Si los slots generados por la maquina, coinciden con los slots del jugador, este ultimo recibira sus creditos, acorde a la coincidencia de los mismos.\n    Cuanto mayor sea el numero de coincidencias, mayor sera el premio que recibira el jugador.\n    \n       -----------------------------------------------------------------------------------------------------";
        return guia;
    };
    tragaMonedasChica.prototype.verificarCoincidencia = function () {
        var indicesCoinciden = true;
        for (var i = 0; i < this.slotsAleatorio.length; i++) {
            if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
                indicesCoinciden = false;
                break;
            }
        }
        if (indicesCoinciden) {
            console.log("Felicidades, Usted Gano el premio Mayor!!");
        }
        else if (this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
            this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
            this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2]) {
            console.log("usted gano x creditos ");
        }
        else {
            console.log("usted no gano, siga participando");
        }
    };
    tragaMonedasChica.prototype.calcularPremio = function () {
        var premio = 0;
        if (this.verificarCoincidencia() == true) {
            premio = this.player.getMontoApuesta() * 4;
        }
        return premio;
    };
    tragaMonedasChica.prototype.entregaPremio = function () {
        var premio = [];
        var valor = this.calcularPremio();
        if (valor !== 0) {
            premio.push("Ha Ganado!! ");
            premio.push("su premio es: ".concat(valor));
            this.player.setDinero(valor + this.player.getDinero());
        }
        else {
            premio.push("Huu... Perdiste amigo...");
        }
        premio.push("Su saldo actual es de ".concat(this.player.getDinero()));
        return premio;
    };
    tragaMonedasChica.prototype.entregaDePremio = function () {
        return 0;
    };
    return tragaMonedasChica;
}());
exports.tragaMonedasChica = tragaMonedasChica;
/*console.log(micorazon.reglamento());
console.log(micorazon.randomSlots());
console.log(micorazon.randomSlotsJugador());
console.log(micorazon.mostrarEnPantalla());*/
