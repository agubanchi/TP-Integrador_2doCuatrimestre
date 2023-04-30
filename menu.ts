import { Casino } from "./casino";
import { Player } from "./player";
import { Ruleta } from "./ruletaLogica";
import { tragaMonedasChica } from "./tragamonedasChico";
import { Cartas } from "./cartas";
import { tragamonedasGrande } from "./tragamonedasGrande";

export class Menu {
  public constructor() {}

  public factory(i: number, player: Player, casino: Casino) {
    let game;
    switch (i) {
      case 0:
        console.log(
          "Gracias por haber jugado en el casino del Indio Programador"
        );
        break;

      case 1:
        game = new Cartas("Cartas", player);
        game.play(casino);
        break;
      case 2:
        game = new tragaMonedasChica("Tragamonedas Corazon", player);
        game.play(casino);
        break;
      case 3:
        game = new tragamonedasGrande("Tragamonedas Premium", player);
        game.play(casino);
        break;
      case 4:
        game = new Ruleta("ruleta", player);
        game.play(casino);
        break;

      default:
        console.log("ingrese algun número del indice por favor: ");
    }
  }
}
