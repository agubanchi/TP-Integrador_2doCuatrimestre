"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruleta = void 0;
//tirar un número de 1 a 15.
var readline = require("readline-sync");
//Imprimir todos los números de 1 a 15 pero en el lugar del número Random imprimir el "Numero Ganador."
var Ruleta = /** @class */ (function () {
    function Ruleta(pNombre, pPlayer) {
        this.inicioRuleta = 0;
        this.finalRuleta = 15;
        this.colors = ["Rojo", "Verde"];
        this.colorGanador = [];
        this.nombre = pNombre;
        this.player = pPlayer;
    }
    Ruleta.prototype.entregaDePremio = function () {
        var premio = this.player.getMontoApuesta();
        if (this.verificarCoincidencia() == true) {
            premio = this.player.getMontoApuesta() * 4;
        }
        return premio;
    };
    Ruleta.prototype.entregaPremio = function () {
        var premio1 = new Array();
        var valor = this.entregaDePremio();
        if (valor !== 0) {
            premio1.push("Ha Ganado!! ");
            premio1.push("su premio es: ".concat(valor));
            this.player.setDinero(valor + this.player.getDinero());
        }
        return premio1;
    };
    Ruleta.prototype.setNumeroJugador = function () {
        var numero = this.numeroJugador;
        numero = readline.questionInt("Ingresa el numero al que quieras apostar de 0 a 15: ");
        if (numero < 0 || numero > 15) {
            console.log("Ingresa un numero valido entre 0 y 15 : ");
        }
        else {
            console.log("El numero del jugador es: ".concat(numero).red.bgWhite);
        }
    };
    Ruleta.prototype.setApuestaJugador = function () {
        this.apuestaJugador = readline.questionInt("Ingresa el monto al que quieras apostar de ");
        return "La apuesta del jugador es ".concat(this.apuestaJugador).white.bgGreen;
    };
    Ruleta.prototype.setColorJugador = function () {
        this.colorJugador = readline.questionInt("Ingrese que a que color desea apostar 0 para Rojo  1 para Verde: ");
        switch (this.colorJugador) {
            case 0:
                this.colors[0];
                {
                    console.log("tu color elegido es el Rojo".red);
                    break;
                }
            case 1:
                this.colors[1];
                {
                    console.log("tu color elegido es el Verde".green);
                    break;
                }
            default: {
                console.log("Ingrese un numero valido");
                break;
            }
        }
    };
    Ruleta.prototype.saberColorGanador = function () {
        this.colorGanador = [];
        var colorGanador = Math.round(Math.random() * this.colors.length);
        this.colorGanador.push(this.colors[colorGanador]);
        return "color ganador es ------> ".concat(this.colorGanador);
    };
    Ruleta.prototype.tirarColor = function () {
        var random = Math.round(Math.random() * this.colors.length);
        return random.toString();
    };
    Ruleta.prototype.tirarRuleta = function () {
        this.numeroGanador = Math.round(Math.random() * (this.finalRuleta - this.inicioRuleta + 1) +
            this.inicioRuleta);
        for (var i = 0; i <= this.finalRuleta; i++) {
            if (this.numeroGanador == i) {
                console.log("el numero ganador es ".concat(this.numeroGanador).black.bgYellow.bold);
            }
            else {
                console.log(i);
            }
        }
    };
    Ruleta.prototype.guia = function () {
        var guia = "Las reglas de la ruleta son darte un corchazo con la unica bala del revolver, suerte pirobo";
        return guia;
    };
    Ruleta.prototype.verificarCoincidencia = function () {
        var condicion = false;
        if ((this.numeroGanador == this.numeroJugador &&
            this.colors[0] == this.colorJugador[0]) ||
            this.colors[1] == this.colorJugador[1]) {
            console.log("Wow usted ha Ganadoooo!");
        }
        else if (this.numeroGanador == this.numeroJugador) {
            console.log("Usted acert\u00F3 el numero ganador! recibio ".concat(this.player.getMontoApuesta() * 3, " "));
        }
        else if (this.colorGanador[0] === this.colorJugador[0] ||
            this.colorGanador[1] === this.colorJugador[1]) {
            console.log("Usted acert\u00F3 el color ganador! recibio ".concat(this.player.getMontoApuesta() * 2, " "));
        }
        else {
            console.log("Usted no acertó el color ni numero ganador, Vuelva a intentarlo...");
        }
        return condicion;
    };
    /* public entregaPremio(): string[] {
      let premio: string[] = [];
      let valor = this.entregaDePremio();
      if (valor !== 0) {
        premio.push("Ha Ganado!! ");
        premio.push(`su premio es: ${valor}`);
        this.player.setDinero(valor + this.player.getDinero());
      } else {
        premio.push("Huu... Perdiste amigo...");
      }
      premio.push(`Su saldo actual es de ${this.player.getDinero()}`);
      return premio;
    }*/
    Ruleta.prototype.mostrarEnPantalla = function () {
        var ruleta1 = new Ruleta("Ruleta", this.player);
        ruleta1.setNumeroJugador();
        ruleta1.setColorJugador();
        ruleta1.tirarRuleta();
        ruleta1.verificarCoincidencia();
        ruleta1.saberColorGanador();
    };
    Ruleta.prototype.play = function (casino) {
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
    return Ruleta;
}());
exports.Ruleta = Ruleta;
