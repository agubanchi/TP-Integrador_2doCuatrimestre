import { Player } from "./player";
import * as readline from "readline-sync";
import { red, blue, yellow } from "colors";
import { Casino } from "./casino";

export class Dados {
  protected nombre: string;
  protected player: Player;
  protected numeroElegido: Number;

  public constructor(pNombre: string, pPlayer: Player) {
    this.nombre = pNombre;
    this.player = pPlayer;
  }

  public guia(): string {
    let guia =
      "¡Bienvenido al emocionante juego de casino de dados! En este juego, tendrás la oportunidad de poner a prueba tu suerte y habilidades de adivinación en cada tirada de dados.";
    ("Tendrás dos intentos para adivinar el número que aparecerá en los dados.");
    ("Cada dado tiene seis caras, numeradas del 1 al 6.");
    ("Si en alguno de tus dos intentos adivinas correctamente el número que aparece en la máquina, ¡ganarás un increíble premio!");
    (" Si no logras adivinar el número en ninguno de tus dos intentos, perderás la apuesta que ingresaste al comienzo del juego.");
    (" Suerte y juega con conciencia.");
    return guia;
  }

  public probabilidades(): string {
    let probabilidades =
      " -----------------------------------------------------------------------------------------------------La probabilidad de obtener un número específico en un solo lanzamiento de un dado de seis lados es de 1/6, ya que hay seis resultados posibles y cada uno es igualmente probable.";

    (" Por lo tanto, la probabilidad de adivinar correctamente el número en ambos intentos sería de (1/6) x (1/6) = 1/36, lo que significa que hay una probabilidad del 2.78% de ganar el premio en cada juego. -----------------------------------------------------------------------------------------------------");
    return probabilidades.black.bgYellow;
  }

  public tirarDados(): boolean {
    let condicion: boolean;
    let numeroElegido: number;
    do {
      numeroElegido = readline.questionInt(
        "Ingrese el numero al que quiere apostar: "
      );
      if (numeroElegido > 6 || numeroElegido < 1) {
        console.log(
          "El número ingresado es inválido. Debe ser un número entre 1 y 6."
        );
      }
    } while (numeroElegido > 6 || numeroElegido < 1);
    const numeroSalio = Math.floor(Math.random() * 6) + 1;
    if (numeroElegido == numeroSalio) {
      console.log(
        `numero elegido: ${numeroElegido}, numero salio: ${numeroSalio}`
      );
      console.log(`ganaste ${this.player.getMontoApuesta() * 2}`);
      condicion = true;
    } else {
      console.log(
        `lo sentimos, has perdido... Tu numero elegido es:  ${numeroElegido} | El numero ganador es:  ${numeroSalio}`
      );
      condicion = false;
    }
    return condicion;
  }

  public calcularPremio(): number {
    let premio: number = 0;
    let apuesta = this.player.getMontoApuesta();

    if (this.tirarDados() == true) {
      return (premio = Number(apuesta * 3));
    }
    return premio;
  }

  public entregaPremio(): string[] {
    let premio: string[] = new Array();
    let valor: number = Number(this.calcularPremio());
    premio.push(`Su apuesta fue de ${this.player.getMontoApuesta()}`);
    if (valor !== 0) {
      premio.push("Ha Ganado!! ");
      premio.push(`su premio es: ${valor}`);
      this.player.setDinero(valor + this.player.getDinero());
    } else {
      premio.push("lo sentimos, has perdido...");
    }
    premio.push(`Su saldo actual es de ${this.player.getDinero()} creditos`);
    return premio;
  }

  public mostrarEnPantalla(): any {
    let dados1 = new Dados("Dados", this.player);
    dados1.tirarDados();
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
      hCasino.push.apply(hCasino, this.entregaPremio());
      casino.setCasino(hCasino);
      casino.mostrarMensaje();
    } while (
      this.player.getDinero() > 0 &&
      readline.keyInYN("Queres volver a intentar? ")
    );

    return this.player.AgregarDinero();
  }
}
