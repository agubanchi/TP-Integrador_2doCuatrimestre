import * as readline from "readline-sync";
export interface interfazRuleta {
  apuestaJugador: number;
  premioJugador: number;
  entregaDePremio(): number;
}
