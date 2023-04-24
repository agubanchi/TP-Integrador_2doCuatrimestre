import * as readline from "readline-sync";
import { Casino } from "./casino";
import { Player } from "./player";
import { red, blue, yellow } from "colors";

export class tragaMonedasChica {
  public nombre: string;
  public player: Player;
  private slots: string[] = ["🖤", "🤍", "🧡", "💙"];
  private slotsjugadorAleatorio: string[];
  private slotsAleatorio: string[];
  public constructor(pNombre: string, pPlayer: Player) {
    this.nombre = pNombre;
    this.player = pPlayer;
  }

  // inicio el random de los slots que saldran al azar
  public randomSlots() {
    this.slotsAleatorio = [];
    // sorteo 3 slots al azar del array completod de slots
    for (let i = 0; i < 3; i++) {
      const indiceAleatorio = Math.floor(Math.random() * this.slots.length);
      this.slotsAleatorio.push(this.slots[indiceAleatorio]);
    }

    return (
      "SLOTS DE MAQUINA --------->" +
      this.slotsAleatorio[0] +
      " | " +
      this.slotsAleatorio[1] +
      " | " +
      this.slotsAleatorio[2]
    );
  }

  // inicio el random de los slots del Jugador
  public randomSlotsJugador() {
    this.slotsjugadorAleatorio = [];
    // sorteo 3 slots al azar para asignar al jugador
    for (let i = 0; i < 3; i++) {
      const jugadorAleatorio = Math.floor(Math.random() * this.slots.length);
      this.slotsjugadorAleatorio.push(this.slots[jugadorAleatorio]);
    }

    return (
      "SLOTS DE JUGADOR --------->" +
      this.slotsjugadorAleatorio[0] +
      " | " +
      this.slotsjugadorAleatorio[1] +
      " | " +
      this.slotsjugadorAleatorio[2]
    );
  }

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

  public mostrarEnPantalla(): any {
    let tragamonedas = new tragaMonedasChica("Tragamonedas", this.player);

    console.log(yellow(tragamonedas.randomSlots()));
    console.log(blue(tragamonedas.randomSlotsJugador()));
    console.log(tragamonedas.verificarCoincidencia());
    //console.log(tragamonedas.calcularPremio());
    //console.log(tragamonedas.entregaPremio());
  }

  public play(casino: Casino): void {
    let hCasino: string[];
    console.log(casino.clear());
    console.log(casino.reglas(this.nombre));
    console.log(this.guia());
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
      hCasino.push.apply(hCasino, this.entregaPremio());
      casino.setCasino(hCasino);
      casino.mostrarMensaje();
    } while (
      this.player.getDinero() > 0 &&
      readline.keyInYN("Queres volver a intentar? ")
    );
  }

  public guia(): string {
    let guia = `-----------------------------------------------------------------------------------------------------
    Un juego de tragamonedas es un tipo de juego de azar. El objetivo del juego es hacer que los símbolos coincidan en una línea de pago activa.
    Este juego,  consiste en que el jugador recibe un grupo de 3 slots al azar, cada uno interpretado por un "corazon"(Indice) el cual corresponde a su grupo de slots.
    Al mismo tiempo, la maquina tambien arroja un grupo de 3 slots al azar.
    Si los slots generados por la maquina, coinciden con los slots del jugador, este ultimo recibira sus creditos, acorde a la coincidencia de los mismos.
    Cuanto mayor sea el numero de coincidencias, mayor sera el premio que recibira el jugador.
    
       -----------------------------------------------------------------------------------------------------`;
    return guia;
  }

  public verificarCoincidencia(): any {
    let indicesCoinciden = true;

    for (let i = 0; i < this.slotsAleatorio.length; i++) {
      if (this.slotsAleatorio[i] !== this.slotsjugadorAleatorio[i]) {
        indicesCoinciden = false;
        break;
      }
    }

    if (indicesCoinciden) {
      console.log(`Felicidades, Usted Gano el premio Mayor!!`);
    } else if (
      this.slotsAleatorio[0] === this.slotsjugadorAleatorio[0] ||
      this.slotsAleatorio[1] === this.slotsjugadorAleatorio[1] ||
      this.slotsAleatorio[2] === this.slotsjugadorAleatorio[2]
    ) {
      console.log(`usted gano x creditos `);
    } else {
      console.log("usted no gano, siga participando");
    }
  }

  public calcularPremio() {
    let premio: number = 0;
    if (this.verificarCoincidencia() == true) {
      premio = this.player.getMontoApuesta() * 4;
    }
    return premio;
  }

  public entregaPremio(): string[] {
    let premio: string[] = [];
    let valor = this.calcularPremio();
    if (valor !== 0) {
      premio.push("Ha Ganado!! ");
      premio.push(`su premio es: ${valor}`);
      this.player.setDinero(valor + this.player.getDinero());
    } else {
      premio.push("Huu... Perdiste amigo...");
    }
    premio.push(`Su saldo actual es de ${this.player.getDinero()}`);
    return premio;
  }

  public entregaDePremio(): number {
    return 0;
  }
}

/*console.log(micorazon.reglamento());
console.log(micorazon.randomSlots());
console.log(micorazon.randomSlotsJugador());
console.log(micorazon.mostrarEnPantalla());*/
