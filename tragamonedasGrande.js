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
exports.TragamonedasGrande = void 0;
var tragamonedas_1 = require("./tragamonedas");
var TragamonedasGrande = /** @class */ (function (_super) {
    __extends(TragamonedasGrande, _super);
    function TragamonedasGrande(pSaldo, pSlots, pPremioMax, pTipos, cantidadDeSlots) {
        var _this = _super.call(this, pSaldo, pSlots, pPremioMax, pTipos) || this;
        _this.cantidadDeSlots = cantidadDeSlots;
        return _this;
    }
    TragamonedasGrande.prototype.premioMayorTotal = function () {
        // cálculo del premio mayor total
        return 0;
    };
    TragamonedasGrande.prototype.validacionDeSlots = function () {
        // alidación de slots
        return true;
    };
    TragamonedasGrande.prototype.aciertos = function () {
        // cálculo de aciertos
        return 0;
    };
    TragamonedasGrande.prototype.seleccionPremio = function () {
        // selección de premio
        return "Premio";
    };
    return TragamonedasGrande;
}(tragamonedas_1.Tragamonedas));
exports.TragamonedasGrande = TragamonedasGrande;
