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
    Cartas.prototype.entregaDePremio = function () {
        var premio = this.player.getMontoApuesta();
        if (this.verificarCoincidencia() == true) {
            premio = this.player.getMontoApuesta() * 4;
        }
        return premio;
    };
    Cartas.prototype.entregaPremio = function () {
        var premio1 = new Array();
        var valor = this.entregaDePremio();
        if (valor !== 0) {
            premio1.push("Ha Ganado!! ");
            premio1.push("su premio es: ".concat(valor));
            this.player.setDinero(valor + this.player.getDinero());
        }
        return premio1;
    };
    Cartas.prototype.mostrarEnPantalla = function () {
        var cartas = new Cartas("Tragamonedas", this.player);
        cartas.pedirCartaJugador();
        cartas.pedirCartaMaquina();
        cartas.validarSaldo();
        //cartas.obtenerNumeroCartaAleatorio();
        //cartas.obtenerColorAleatorio();
        cartas.verificarCoincidencia();
        cartas.darApuesta();
    };
    Cartas.prototype.guia = function () {
        var guia = "-----------------------------------------------------------------------------------------------------\n    El juego consiste en que el jugador pide una carta y puede salir\nla carta con valor y color aleatorio (numeros del 1 al 9 y colores Rojo, Blanco y Negro).\nDonde el 9 es el mas grande y el 1 es el mas chico y tomando en cuenta que el rojo es el de mayor valor,\nel blanco el del medio y el negro el que vale menos. Por ejemplo, si el jugador le toca 1:coraz\u00F3n:\n    y la maquina saca 8:coraz\u00F3n_blanco: el jugador ganaria ya que el 1:coraz\u00F3n: vale mas que el 8:coraz\u00F3n_blanco:\n-----------------------------------------------------------------------------------------------------";
        return guia;
    };
    Cartas.prototype.play = function (casino) {
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
    Cartas.prototype.verificarCoincidencia = function () {
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
        var ganador = this.verificarCoincidencia();
        if (ganador === "La Maquina") {
            this.setapuesta(0);
            return "La Maquina";
        }
        else if (ganador === "Jugador") {
            this.saldo = this.saldo + this.getapuesta() * 2;
            this.setapuesta(0);
            return "Jugador";
        }
        else {
            this.saldo = this.saldo + this.getapuesta();
            this.setapuesta(0);
            return "Empate";
        }
    };
    Cartas.prototype.iniciarJuego = function () {
        console.log("Bienvenido al Juego Cartas");
        var apuesta = readline.questionInt("Ingrese su apuesta: ");
        this.apostar(apuesta);
        var resultado = this.verificarCoincidencia();
        console.log("El resultado es: ".concat(resultado));
        console.log("Su saldo es: ".concat(this.saldo));
    };
    return Cartas;
}());
exports.Cartas = Cartas;
