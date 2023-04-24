"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
var readline = require("readline-sync");
var Tragamonedas = /** @class */ (function () {
    function Tragamonedas(pSaldo, pSlots, pPremioMax, pTipos) {
        this.saldoIngresado = pSaldo;
        this.slots = pSlots;
        this.premioMayor = pPremioMax;
        this.tiposDePremio = pTipos;
    }
    Tragamonedas.prototype.setSaldo = function () {
        this.saldoIngresado = readline.questionInt("Ingresa el monto al que quieras apostar:  ");
        return "La apuesta del jugador es ".concat(this.saldoIngresado);
    };
    Tragamonedas.prototype.getSaldo = function () {
        return this.saldoIngresado;
    };
    Tragamonedas.prototype.setSlots = function (pSlots) {
        return (this.slots = pSlots);
    };
    Tragamonedas.prototype.getSlots = function () {
        return this.slots;
    };
    Tragamonedas.prototype.setPremiomax = function (pPremiomax) {
        return (this.premioMayor = pPremiomax);
    };
    Tragamonedas.prototype.getPremiomax = function () {
        return this.premioMayor;
    };
    Tragamonedas.prototype.setTipos = function (pTipos) {
        return (this.tiposDePremio = pTipos);
    };
    Tragamonedas.prototype.getTipos = function () {
        return this.tiposDePremio;
    };
    Tragamonedas.prototype.saldoMaximo = function () { };
    Tragamonedas.prototype.sinCredito = function () {
        var saldo = this.getSaldo();
        if (saldo <= 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Tragamonedas.prototype.slotRandom = function () { };
    return Tragamonedas;
}());
exports.Tragamonedas = Tragamonedas;
