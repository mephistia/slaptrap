


export class Carta {
    

    naipe: Naipe;
    valor: Valor;

    // atribuir os valores na criação
    constructor(naipe: Naipe, valor: Valor){
        this.naipe = naipe;
        this.valor = valor;
    }

    // retornar como string para testes
    toString(): string{
        return Valor[this.valor] + Naipe[this.naipe];
    }

}

export enum Naipe { Espadas, Paus, Ouros, Copas}
export enum Valor { As = 1, Dois, Tres, Quatro, Cinco, Seis, Sete, Oito, Nove, Dez, Valete, Dama, Rei}