import { Casino } from "./casino";
import { Player } from "./player";
import * as readline from "readline-sync";

export class Cartas {
  private nombre: string;
  private player: Player;
  private baraja: any[];
  private premio: number;
  private apuesta: number;
  private colores: string[] = [":corazón:", ":corazón_blanco:"];
  private numeroCarta: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private saldo: number = 0;
  constructor(pNombre: string, pPlayer: Player) {
    this.baraja = [...this.colores, ...this.numeroCarta];
    this.nombre = pNombre;
    this.player = pPlayer;
  }

  public getbaraja(): any[] {
    return this.baraja;
  }
  public setpremio() {
    this.premio = this.apuesta;
  }
  public getpremio(): number {
    return this.premio;
  }
  public reiniciarApuesta() {
    this.setapuesta(0);
  }
  public getapuesta(): number {
    this.saldo = this.saldo - this.apuesta;
    return this.apuesta;
  }
  public setapuesta(p_apuesta) {
    this.apuesta = p_apuesta;
  }

  /* public entregaDePremio(): number {
    let premio = this.player.getMontoApuesta();
    if (this.verificarCoincidencia() == true) {
      premio = this.player.getMontoApuesta() * 4;
    }
    return premio;
  }
*/
  /*
  public entregaPremio(): string[] {
    let premio1: string[] = new Array();
    let valor = this.entregaDePremio();
    if (valor !== 0) {
      premio1.push("Ha Ganado!! ");
      premio1.push(`su premio es: ${valor}`);
      this.player.setDinero(valor + this.player.getDinero());
    }
    return premio1;
  }*/

  public mostrarEnPantalla(): any {
    let cartas = new Cartas("Tragamonedas", this.player);

    cartas.pedirCartaJugador();
    cartas.pedirCartaMaquina();
    cartas.validarSaldo();
    //cartas.obtenerNumeroCartaAleatorio();
    //cartas.obtenerColorAleatorio();
    cartas.verificarCoincidencia();
    cartas.darApuesta();
  }

  public guia(): string {
    let guia = `-----------------------------------------------------------------------------------------------------
    El juego consiste en que el jugador pide una carta y puede salir
la carta con valor y color aleatorio (numeros del 1 al 9 y colores Rojo, Blanco y Negro).
Donde el 9 es el mas grande y el 1 es el mas chico y tomando en cuenta que el rojo es el de mayor valor,
el blanco el del medio y el negro el que vale menos. Por ejemplo, si el jugador le toca 1:corazón:
    y la maquina saca 8:corazón_blanco: el jugador ganaria ya que el 1:corazón: vale mas que el 8:corazón_blanco:
-----------------------------------------------------------------------------------------------------`;
    return guia;
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
      //hCasino.push.apply(hCasino, this.entregaPremio());
      casino.setCasino(hCasino);
      casino.mostrarMensaje();
    } while (
      this.player.getDinero() > 0 &&
      readline.keyInYN("Queres volver a intentar? ")
    );
  }
  public pedirCartaJugador(): string {
    const carta = this.obtenerNumeroCartaAleatorio();
    const colorCarta = this.obtenerColorAleatorio();
    console.log(`El Jugador recibió la carta ${colorCarta}${carta}`);
    return carta + colorCarta;
  }
  public pedirCartaMaquina(): string {
    const carta = this.obtenerNumeroCartaAleatorio();
    const colorCarta = this.obtenerColorAleatorio();
    console.log(`La máquina recibió la carta ${colorCarta}${carta}`);
    return carta + colorCarta;
  }
  public validarSaldo() {
    if (this.saldo > 0) {
      return true;
    } else {
      return false;
    }
  }
  public obtenerNumeroCartaAleatorio(): number {
    const randomIndex = Math.floor(Math.random() * this.numeroCarta.length);
    return this.numeroCarta[randomIndex];
  }
  public obtenerColorAleatorio(): string {
    const randomIndex = Math.floor(Math.random() * this.colores.length);
    return this.colores[randomIndex];
  }
  public apostar(apuesta: number): number {
    this.setapuesta(apuesta);
    return this.apuesta;
  }
  public verificarCoincidencia(): string {
    const jugadorCarta = this.pedirCartaJugador();
    const jugadorNumero = parseInt(jugadorCarta.charAt(0));
    const jugadorColor = jugadorCarta.charAt(1);
    const maquinaCarta = this.pedirCartaMaquina();
    const maquinaNumero = parseInt(maquinaCarta.charAt(0));
    const maquinaColor = maquinaCarta.charAt(1);
    let ganador = "";
    if (jugadorColor === ":corazón:" && maquinaColor === ":corazón_blanco:") {
      ganador = "Jugador";
      return ganador;
    } else if (
      jugadorColor === ":corazón_blanco:" &&
      maquinaColor === ":corazón:"
    ) {
      ganador = "La Maquina";
      return ganador;
    } else if (jugadorColor === maquinaColor) {
      if (jugadorNumero > maquinaNumero) {
        ganador = "Jugador";
        return ganador;
      } else if (maquinaNumero > jugadorNumero) {
        ganador = "La Maquina";
        return ganador;
      } else {
        ganador = "Empate";
        return ganador;
      }
    }
    console.log(ganador);
    return ganador;
  }
  public darApuesta() {
    const ganador = this.verificarCoincidencia();
    if (ganador === "La Maquina") {
      this.setapuesta(0);
      return "La Maquina";
    } else if (ganador === "Jugador") {
      this.saldo = this.saldo + this.getapuesta() * 2;
      this.setapuesta(0);
      return "Jugador";
    } else {
      this.saldo = this.saldo + this.getapuesta();
      this.setapuesta(0);
      return "Empate";
    }
  }
  public iniciarJuego(): void {
    console.log("Bienvenido al Juego Cartas");

    const apuesta = readline.questionInt("Ingrese su apuesta: ");
    this.apostar(apuesta);
    const resultado = this.verificarCoincidencia();
    console.log(`El resultado es: ${resultado}`);
    console.log(`Su saldo es: ${this.saldo}`);
  }
}
