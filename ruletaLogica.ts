//tirar un número de 1 a 15.
import * as readline from "readline-sync";
import { red, blue, yellow } from "colors";
import { Casino } from "./casino";
import { interfazRuleta } from "./interfazRuleta";
import { Player } from "./player";

//Imprimir todos los números de 1 a 15 pero en el lugar del número Random imprimir el "Numero Ganador."
export class Ruleta implements interfazRuleta {
  nombre: string;
  player: Player;
  apuestaJugador: number;
  premioJugador: number;
  private inicioRuleta: number = 0;
  private finalRuleta: number = 15;
  private numeroGanador: number;
  private numeroJugador: number;
  private colorJugador: number;
  private colors: string[] = ["Rojo", "Verde"];
  private colorGanador: string[] = [];

  public constructor(pNombre: string, pPlayer: Player) {
    this.nombre = pNombre;
    this.player = pPlayer;
  }

  public setNumeroJugador() {
    let numero = this.numeroJugador;
    numero = readline.questionInt(
      "Ingresa el numero al que quieras apostar de 0 a 15: "
    );
    if (numero < 0 || numero > 15) {
      console.log("Ingresa un numero valido entre 0 y 15 : ");
      return this.setNumeroJugador();
    } else {
      console.log(`El numero del jugador es: ${numero}`.red.bgWhite);
    }
  }

  public setApuestaJugador() {
    this.apuestaJugador = readline.questionInt(
      "Ingresa el monto al que quieras apostar de "
    );
    return `La apuesta del jugador es ${this.apuestaJugador}`.white.bgGreen;
  }
  public setColorJugador() {
    this.colorJugador = readline.questionInt(
      "Ingrese que a que color desea apostar 0 para Rojo  1 para Verde: "
    );

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
    if (this.colorJugador < 0 || this.colorJugador > 1) {
      console.log("Ingresa un numero valido entre 0 y 1 : ");
      return this.setColorJugador();
    }
  }
  public saberColorGanador() {
    this.colorGanador = [];
    let colorGanador = Math.round(Math.random() * this.colors.length);
    this.colorGanador.push(this.colors[colorGanador]);
    console.log(`El color ganador es ------> ${this.colorGanador}`);
  }

  public tirarColor() {
    const random = Math.round(Math.random() * this.colors.length);
    return random.toString();
  }

  public tirarRuleta() {
    this.numeroGanador = Math.round(
      Math.random() * (this.finalRuleta - this.inicioRuleta + 1) +
        this.inicioRuleta
    );
    for (let i: number = 0; i <= this.finalRuleta; i++) {
      if (this.numeroGanador == i) {
        console.log(
          `el numero ganador es ${this.numeroGanador}`.black.bgYellow.bold
        );
      } else {
        console.log(i);
      }
    }
  }
  public guia(): string {
    let guia =
      "----------------------------------------------------------------------------------------------------- Las reglas de la ruleta son darte un corchazo con la unica bala del revolver, suerte pirobo -----------------------------------------------------------------------------------------------------";
    return guia.black.bgCyan;
  }

  public probabilidades(): string {
    let probabilidades =
      " -----------------------------------------------------------------------------------------------------la probabilidad de acertar el número exacto sería de 1/16 = 0.0625 o aproximadamente 6.25%. Las probabilidades para acertar el color es de 50/50 = 50% ya que como apuesta contamos unicamente con 2 colores, VERDE y ROJO. -----------------------------------------------------------------------------------------------------";
    return probabilidades.black.bgYellow;
  }

  public verificarCoincidencia(): boolean {
    let condicion: boolean = false;
    if (
      (this.numeroGanador == this.numeroJugador &&
        this.colors[0] == this.colorJugador[0]) ||
      this.colors[1] == this.colorJugador[1]
    ) {
      console.log(
        `Wow usted ha Ganado el premio Mayor!!! ${
          this.player.getMontoApuesta() * 5
        }`
      );
      this.player.getDinero(),
        this.player.setDinero(
          this.player.getDinero() + this.player.getMontoApuesta() * 5
        );
    } else if (this.numeroGanador == this.numeroJugador) {
      console.log(
        `Usted acertó el numero ganador! recibio  ${
          this.player.getMontoApuesta() * 3 // muestro el premio que recibira el jugador, en este caso, su apuesta multiplicada x 3
        }`
      );
      this.player.getDinero(), //obtengo el dinero del jugador
        this.player.setDinero(
          this.player.getDinero() + this.player.getMontoApuesta() * 3 //al dinero del jugador le sumo la apuesta multiplicada x 3
        );
    } else if (
      this.colorGanador[0] === this.setColorJugador[0] ||
      this.colorGanador[1] === this.setColorJugador[1]
    ) {
      console.log(
        `Usted acertó el color ganador! recibio  ${
          this.player.getMontoApuesta() * 3
        }`
      );
      this.player.getDinero(),
        this.player.setDinero(
          this.player.getDinero() + this.player.getMontoApuesta() * 3
        );
    } else {
      console.log(
        `Usted no acertó el color ni numero ganador, Vuelva a intentarlo...su saldo actual es ${this.player.getDinero()}`
      );
    }

    if (this.player.getMontoApuesta() <= 0) {
      console.log(this.player.AgregarDinero());
    }

    return condicion;
  }

  public mostrarEnPantalla(): any {
    let ruleta1 = new Ruleta("Ruleta", this.player);
    ruleta1.setNumeroJugador();
    ruleta1.setColorJugador();
    ruleta1.tirarRuleta();
    ruleta1.verificarCoincidencia();
    ruleta1.saberColorGanador();
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
    return this.player.AgregarDinero();
  }
}
