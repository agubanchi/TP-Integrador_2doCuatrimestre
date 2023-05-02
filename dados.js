"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dados = void 0;
var readline = require("readline-sync");
var Dados = /** @class */ (function () {
    function Dados(pNombre, pPlayer) {
        this.nombre = pNombre;
        this.player = pPlayer;
    }
    Dados.prototype.guia = function () {
        var guia = "¡Bienvenido al emocionante juego de casino de dados! En este juego, tendrás la oportunidad de poner a prueba tu suerte y habilidades de adivinación en cada tirada de dados.";
        ("Tendrás dos intentos para adivinar el número que aparecerá en los dados.");
        ("Cada dado tiene seis caras, numeradas del 1 al 6.");
        ("Si en alguno de tus dos intentos adivinas correctamente el número que aparece en la máquina, ¡ganarás un increíble premio!");
        (" Si no logras adivinar el número en ninguno de tus dos intentos, perderás la apuesta que ingresaste al comienzo del juego.");
        (" Suerte y juega con conciencia.");
        return guia;
    };
    Dados.prototype.probabilidades = function () {
        var probabilidades = " -----------------------------------------------------------------------------------------------------La probabilidad de obtener un número específico en un solo lanzamiento de un dado de seis lados es de 1/6, ya que hay seis resultados posibles y cada uno es igualmente probable.";
        (" Por lo tanto, la probabilidad de adivinar correctamente el número en ambos intentos sería de (1/6) x (1/6) = 1/36, lo que significa que hay una probabilidad del 2.78% de ganar el premio en cada juego. -----------------------------------------------------------------------------------------------------");
        return probabilidades.black.bgYellow;
    };
    Dados.prototype.tirarDados = function () {
        var condicion;
        var numeroElegido = readline.questionInt("Ingrese el numero al que quiere apostar: ");
        var numeroSalio = Math.floor(Math.random() * 6) + 1;
        if (numeroElegido > 6 || numeroElegido < 1) {
            console.log("desafortunadamente usted perdio el inento.");
            condicion = false;
            readline.question("debe ingresar un numero de 1 a 6, presione ENTER para continuar: ");
        }
        else if (numeroElegido == numeroSalio) {
            console.log("numero elegido: ".concat(numeroElegido, ", numero salio: ").concat(numeroSalio));
            console.log("ganaste ".concat(this.player.getMontoApuesta() * 2));
            condicion = true;
        }
        else {
            console.log("lo sentimos, has perdido... Tu numero elegido es:  ".concat(numeroElegido, " | El numero ganador es:  ").concat(numeroSalio));
            condicion = false;
        }
        return condicion;
    };
    Dados.prototype.calcularPremio = function () {
        var premio = 0;
        var apuesta = this.player.getMontoApuesta();
        if (this.tirarDados() == true) {
            return (premio = Number(apuesta * 3));
        }
        return premio;
    };
    Dados.prototype.entregaPremio = function () {
        var premio = new Array();
        var valor = Number(this.calcularPremio());
        premio.push("Su apuesta fue de ".concat(this.player.getMontoApuesta()));
        if (valor !== 0) {
            premio.push("Ha Ganado!! ");
            premio.push("su premio es: ".concat(valor));
            this.player.setDinero(valor + this.player.getDinero());
        }
        else {
            premio.push("lo sentimos, has perdido...");
        }
        premio.push("Su saldo actual es de ".concat(this.player.getDinero(), " creditos"));
        return premio;
    };
    Dados.prototype.mostrarEnPantalla = function () {
        var dados1 = new Dados("Dados", this.player);
        dados1.tirarDados();
    };
    Dados.prototype.play = function (casino) {
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
            hCasino.push.apply(hCasino, this.entregaPremio());
            casino.setCasino(hCasino);
            casino.mostrarMensaje();
        } while (this.player.getDinero() > 0 &&
            readline.keyInYN("Queres volver a intentar? "));
        return this.player.AgregarDinero();
    };
    return Dados;
}());
exports.Dados = Dados;
