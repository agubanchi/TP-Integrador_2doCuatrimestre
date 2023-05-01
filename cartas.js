"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cartas = void 0;
var readline = require("readline-sync");
var Cartas = /** @class */ (function () {
    function Cartas(pNombre, pPlayer) {
        this.colores = [":corazón:", ":corazón_blanco:"];
        this.numeroCarta = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.saldo = 0;
        this.baraja = __spreadArray(__spreadArray([], this.colores, true), this.numeroCarta, true);
        this.nombre = pNombre;
        this.player = pPlayer;
    }
    Cartas.prototype.getbaraja = function () {
        return this.baraja;
    };
    Cartas.prototype.setpremio = function () {
        this.premio = this.apuesta;
    };
    Cartas.prototype.getpremio = function () {
        return this.premio;
    };
    Cartas.prototype.reiniciarApuesta = function () {
        this.setapuesta(0);
    };
    Cartas.prototype.getapuesta = function () {
        this.saldo = this.saldo - this.apuesta;
        return this.apuesta;
    };
    Cartas.prototype.setapuesta = function (p_apuesta) {
        this.apuesta = p_apuesta;
    };
    Cartas.prototype.guia = function () {
        var guia = "-----------------------------------------------------------------------------------------------------\n    El juego consiste en que el jugador pide una carta y puede salir\n  la carta con valor y color aleatorio (numeros del 1 al 9 y colores Rojo, Blanco y Negro).\n  Donde el 9 es el mas grande y el 1 es el mas chico y tomando en cuenta que el rojo es el de mayor valor,\n  el blanco el del medio y el negro el que vale menos. Por ejemplo, si el jugador le toca 1:coraz\u00F3n:\n    y la maquina saca 8:coraz\u00F3n_blanco: el jugador ganaria ya que el 1:coraz\u00F3n: vale mas que el 8:coraz\u00F3n_blanco:\n  -----------------------------------------------------------------------------------------------------";
        return guia.black.bgCyan;
    };
    Cartas.prototype.probabilidades = function () {
        var probabilidades = " -----------------------------------------------------------------------------------------------------la probabilidad de acertar el número exacto de slots seria de 0.61% o 1 en 164 intentos.-----------------------------------------------------------------------------------------------------";
        return probabilidades.black.bgYellow;
    };
    Cartas.prototype.mostrarEnPantalla = function () {
        var cartas = new Cartas("Cartas", this.player);
        cartas.darApuesta();
    };
    Cartas.prototype.play = function (casino) {
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
    };
    Cartas.prototype.pedirCartaJugador = function () {
        var carta = this.obtenerNumeroCartaAleatorio();
        var colorCarta = this.obtenerColorAleatorio();
        console.log("El Jugador recibi\u00F3 la carta ".concat(colorCarta).concat(carta));
        return carta + colorCarta;
    };
    Cartas.prototype.pedirCartaMaquina = function () {
        var carta = this.obtenerNumeroCartaAleatorio();
        var colorCarta = this.obtenerColorAleatorio();
        console.log("La m\u00E1quina recibi\u00F3 la carta ".concat(colorCarta).concat(carta));
        return carta + colorCarta;
    };
    Cartas.prototype.validarSaldo = function () {
        if (this.saldo > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Cartas.prototype.obtenerNumeroCartaAleatorio = function () {
        var randomIndex = Math.floor(Math.random() * this.numeroCarta.length);
        return this.numeroCarta[randomIndex];
    };
    Cartas.prototype.obtenerColorAleatorio = function () {
        var randomIndex = Math.floor(Math.random() * this.colores.length);
        return this.colores[randomIndex];
    };
    Cartas.prototype.apostar = function (apuesta) {
        this.setapuesta(apuesta);
        return this.apuesta;
    };
    Cartas.prototype.validarGanador = function () {
        var jugadorCarta = this.pedirCartaJugador();
        var jugadorNumero = parseInt(jugadorCarta.charAt(0));
        var jugadorColor = jugadorCarta.charAt(1);
        var maquinaCarta = this.pedirCartaMaquina();
        var maquinaNumero = parseInt(maquinaCarta.charAt(0));
        var maquinaColor = maquinaCarta.charAt(1);
        var ganador = "";
        if (jugadorColor === ":corazón:" && maquinaColor === ":corazón_blanco:") {
            ganador = "Jugador";
            return ganador;
        }
        else if (jugadorColor === ":corazón_blanco:" &&
            maquinaColor === ":corazón:") {
            ganador = "La Maquina";
            return ganador;
        }
        else if (jugadorColor === maquinaColor) {
            if (jugadorNumero > maquinaNumero) {
                ganador = "Jugador";
                return ganador;
            }
            else if (maquinaNumero > jugadorNumero) {
                ganador = "La Maquina";
                return ganador;
            }
            else {
                ganador = "Empate";
                return ganador;
            }
        }
        console.log(ganador);
        return ganador;
    };
    Cartas.prototype.darApuesta = function () {
        var ganador = this.validarGanador();
        if (ganador === "La Maquina") {
            console.log("La Maquina es el ganador, su saldo actual es ".concat(this.player.getDinero()));
        }
        else if (ganador === "Jugador") {
            console.log("Felicidades, Ganaste el premio mayor!!! ".concat(this.player.getMontoApuesta() * 5));
            this.player.getDinero(),
                this.player.setDinero(this.player.getDinero() + this.player.getMontoApuesta() * 5);
        }
        else {
            console.log("Usted empat\u00F3 con la Maquina, usted gan\u00F3  ".concat(this.player.getMontoApuesta() * 2));
            this.player.getDinero(),
                this.player.setDinero(this.player.getDinero() + this.player.getMontoApuesta() * 5);
        }
    };
    return Cartas;
}());
exports.Cartas = Cartas;
