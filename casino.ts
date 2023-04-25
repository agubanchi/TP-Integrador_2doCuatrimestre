import * as readline from "readline-sync";
import { Player } from "./player";
import { Menu } from "./menu";
import { Ruleta } from "./ruletaLogica";
import { tragaMonedasChica } from "./tragamonedasChico";
//import { TragamonedasGrande } from "./tragamonedasGrande";
//import { Cartas } from "./cartas";

export class Casino {
  protected casino: string[];

  public constructor(pCasino: string[]) {
    this.casino = pCasino;
  }

  public welcome(pTitulo: string): void {
    console.log(`Bienvenido al ${pTitulo}\n`);
    console.log(`************** Mucha suerte **************`);
  }

  public reglas(pGame: string) {
    console.log("\n");
    console.log(`Esta Juagado ${pGame}`);
    console.log("el juego consiste en lo siguiente: ");
    console.log("\n");
  }

  public setCasino(pCasino: string[]) {
    this.casino = pCasino;
  }

  public mostrarMensaje(): void {
    for (let i = 0; i < this.casino.length; i++) {
      console.log(this.casino[i]);
    }
  }

  public probabilidades(): void {
    console.log("\n");
    console.log("las probabilidades de ganar que tenes son");
    console.log("\n");
    for (let i = 0; i < this.casino.length; i++) {
      console.log(this.casino[i]);
      console.log("\n");
    }
    console.log("Exitos! ");
  }

  /*public preguntas(): void{
    let pNombre = readline.question("Dime tu nombre: "); 
    let pEdad = readline.questionInt("Ahora, dime tu edad: ");
    let pCredito = readline.questionInt('Cuantos creditos deseas comprar?')
    let player = new Player(pNombre, pEdad, pCredito);
    player.validacionDeEdad(pEdad);
    }*/

  public mostrarInicio(pTitulo: string): void {
    console.log(`Disfrute mucho de ${pTitulo}`);
    console.log("mucha suerte!!");
    console.log("\n");
  }

  public menuCasino(): number {
    console.log("\n");
    console.log(`    Bienvenido al Casino del indio programador`);
    console.log("\n");
    console.log(`ingresa uno de los números para iniciar un juego!`);
    console.log("\n");
    console.log(`1.------------------Cartas----------------------- `);
    console.log("\n");
    console.log(`2.----------Tragamoneas de Corazones------------- `);
    console.log("\n");
    console.log(`3.-------------Tragamoneas Grande---------------- `);
    console.log("\n");
    console.log(`4.------------------Ruleta----------------------- `);
    console.log("\n");
    console.log(`0.*******************salir*********************** `);
    console.log("\n");

    return readline.questionInt("Ingrese una opcion del menu: ");
  }

  public datoMenuIngreso(
    max: number,
    min: number,
    num: number,
    player: Player
  ): boolean {
    let condicion: boolean = false;
    switch (num) {
      case 1:
        let valor = readline.questionInt("ingrese un juego: ");
        if (valor < num && valor > max) {
          console.log("Ingrese una opcion valida del menu...");
        } else {
          condicion = true;
        }
        break;
      default:
        let valor1 = readline.questionInt("Ingrese el monto a apostar: ");
        if (valor1 < min) {
          console.log("Ingrese una suma positiva por favor...");
        } else {
          if (valor1 > max) {
            `no puede apostar ${valor1} excede su saldo `;
          } else {
            condicion = true;
            player.setMontoApuesta(valor1);
          }
        }
        break;
    }
    this.pausa();
    return condicion;
  }

  public pausa(): void {
    let pausa;
    pausa = readline.keyInPause("Presione cualquier tecla".trim());
  }

  public clear(): void {
    console.clear();
  }
  public launch(): void {
    console.log(casino1.clear());
    console.log(casino1.welcome("Casino del Indio Programador"));
    let pNombre = readline.question("Dime tu nombre: ");
    let pEdad = readline.questionInt("Ahora, dime tu edad: ");
    let pCredito = readline.questionInt("Cuantos creditos deseas comprar?");
    console.log(casino1.clear());
    let player = new Player(pNombre, pEdad, pCredito);
    player.validacionDeEdad(pEdad);
    console.log(casino1.clear());
    player.playGame(casino1);
  }
}

let casino1 = new Casino([]);
console.log(casino1.launch());
