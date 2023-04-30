import * as readline from "readline-sync";
import { Casino } from "./casino";
import { Player } from "./player";
import { red, blue, yellow } from "colors";
import { Tragamonedas } from "./tragamonedas";

export class tragamonedasGrande extends Tragamonedas {
  public constructor(pNombre: string, pPlayer: Player) {
    super(pNombre, pPlayer);
  }

  /* Calculamos el premio segun las condiciones =
  1- Si el jugador aceertó todos los slots, recibe un premio de su apuesta multiplicado por 10.
  2' Si el jugador acertó uno o dos slots en su combinación, recibe su apuesta multiplicada por 5.

  3' Si el jugador no acertó ninguna conbinación de slots, pierde su dinero apostado.
  
  */

  public verificarCoincidencia(): any {
    let indicesCoinciden = true;

    for (let i = 0; i < this.slotsAleatorio.length; i++) {
      if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
        indicesCoinciden = false;
        break;
      }
    }

    if (indicesCoinciden) {
      console.log(
        `Felicidades, Ganaste el premio mayor!!! ${
          this.player.getMontoApuesta() * 10
        }`
      );
      this.player.getDinero(),
        this.player.setDinero(
          this.player.getDinero() + this.player.getMontoApuesta() * 10
        );
    } else if (
      this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
      this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
      this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2] ||
      this.slotsAleatorio[3] === this.slotsjugadorAleatorio[3] ||
      this.slotsAleatorio[4] === this.slotsjugadorAleatorio[4]
    ) {
      console.log(
        `Usted acertó uno de los slots!! usted gano  ${
          this.player.getMontoApuesta() * 5
        }`
      );
      this.player.getDinero(),
        this.player.setDinero(
          this.player.getDinero() + this.player.getMontoApuesta() * 5
        );
    } else {
      console.log(
        `usted no gano,su saldo actual es ${this.player.getDinero()}`
      );
    }
  }

  // inicio el random de los slots que saldran al azar
  public randomSlots() {
    this.slotsAleatorio = [];
    // sorteo 5 slots al azar del array completod de slots
    for (let i = 0; i < 5; i++) {
      const indiceAleatorio = Math.floor(Math.random() * this.slots.length);
      this.slotsAleatorio.push(this.slots[indiceAleatorio]);
    }

    return (
      "SLOTS DE MAQUINA ---------> " +
      this.slotsAleatorio[0] +
      " | " +
      this.slotsAleatorio[1] +
      " | " +
      this.slotsAleatorio[2] +
      " | " +
      this.slotsAleatorio[3] +
      " | " +
      this.slotsAleatorio[4]
    );
  }

  // inicio el random de los slots del Jugador
  public randomSlotsJugador() {
    this.slotsjugadorAleatorio = [];
    // sorteo 5 slots al azar para asignar al jugador
    for (let i = 0; i < 5; i++) {
      const jugadorAleatorio = Math.floor(Math.random() * this.slots.length);
      this.slotsjugadorAleatorio.push(this.slots[jugadorAleatorio]);
    }

    return (
      "SLOTS DE JUGADOR ---------> " +
      this.slotsjugadorAleatorio[0] +
      " | " +
      this.slotsjugadorAleatorio[1] +
      " | " +
      this.slotsjugadorAleatorio[2] +
      " | " +
      this.slotsjugadorAleatorio[3] +
      " | " +
      this.slotsjugadorAleatorio[4]
    );
  }

  public mostrarEnPantalla(): any {
    let tragamonedas = new tragamonedasGrande(
      "TragamonedasGrande",
      this.player
    );

    console.log(yellow(tragamonedas.randomSlots()));
    console.log(blue(tragamonedas.randomSlotsJugador()));
    console.log(tragamonedas.verificarCoincidencia());
  }

  public guia(): string {
    let guia = `-----------------------------------------------------------------------------------------------------
    Un juego de tragamonedas es un tipo de juego de azar. El objetivo del juego es hacer que los símbolos coincidan en una línea de pago activa.
    Este juego,  consiste en que el jugador recibe un grupo de 5 slots al azar, cada uno interpretado por un "corazon"(Indice) el cual corresponde a su grupo de slots.
    Al mismo tiempo, la maquina tambien arroja un grupo de 5 slots al azar.
    Si los slots generados por la maquina, coinciden con los slots del jugador, este ultimo recibira sus creditos, acorde a la coincidencia de los mismos.
    Cuanto mayor sea el numero de coincidencias, mayor sera el premio que recibira el jugador.
    
       -----------------------------------------------------------------------------------------------------`;
    return guia.black.bgCyan;
  }

  public probabilidades(): string {
    let probabilidades =
      " -----------------------------------------------------------------------------------------------------la probabilidad de acertar el número exacto de slots seria de 0.61% o 1 en 164 intentos.-----------------------------------------------------------------------------------------------------";
    return probabilidades.black.bgYellow;
  }

  public play(casino: Casino): void {
    let hCasino: string[];
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
      hCasino.push(`su saldo actual es de ${this.player.getDinero()}`);
      casino.setCasino(hCasino);
      casino.mostrarMensaje();
      hCasino = [];
      this.player.apuesta(casino);
      console.log(casino.clear());
      casino.setCasino(this.mostrarEnPantalla());
      casino.mostrarInicio(this.nombre);
      casino.setCasino(hCasino);
      casino.mostrarMensaje();
    } while (
      this.player.getDinero() > 0 &&
      readline.keyInYN("Queres volver a intentar? ")
    );
  }
}
