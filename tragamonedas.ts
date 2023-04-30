import * as readline from "readline-sync";
import { Casino } from "./casino";
import { Player } from "./player";
import { red, blue, yellow } from "colors";
export abstract class Tragamonedas {
  protected nombre: string;
  protected player: Player;
  protected slots: string[] = ["🖤", "🤍", "🧡", "💙", "❤️"];
  protected slotsjugadorAleatorio: string[];
  protected slotsAleatorio: string[];
  public constructor(pNombre: string, pPlayer: Player) {
    this.nombre = pNombre;
    this.player = pPlayer;
  }
}
