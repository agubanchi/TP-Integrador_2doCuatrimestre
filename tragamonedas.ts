import * as readline from "readline-sync";
export abstract class Tragamonedas {
  protected saldoIngresado: number;
  protected slots: any;
  protected premioMayor: number;
  protected tiposDePremio: string;
  public constructor(
    pSaldo: number,
    pSlots: any,
    pPremioMax: number,
    pTipos: string
  ) {
    this.saldoIngresado = pSaldo;
    this.slots = pSlots;
    this.premioMayor = pPremioMax;
    this.tiposDePremio = pTipos;
  }
  public setSaldo() {
    this.saldoIngresado = readline.questionInt(
      "Ingresa el monto al que quieras apostar:  "
    );
    return `La apuesta del jugador es ${this.saldoIngresado}`;
  }
  public getSaldo(): number {
    return this.saldoIngresado;
  }
  public setSlots(pSlots: any): void {
    return (this.slots = pSlots);
  }
  public getSlots(): any {
    return this.slots;
  }
  public setPremiomax(pPremiomax: number): number {
    return (this.premioMayor = pPremiomax);
  }
  public getPremiomax(): number {
    return this.premioMayor;
  }
  public setTipos(pTipos: string): string {
    return (this.tiposDePremio = pTipos);
  }
  public getTipos(): string {
    return this.tiposDePremio;
  }
  public saldoMaximo() {}
  public sinCredito(): boolean {
    let saldo = this.getSaldo();
    if (saldo <= 0) {
      return false;
    } else {
      return true;
    }
  }
  public slotRandom() {}
}
