import {Carta} from './carta';
import {Naipe} from './carta';
import {Valor} from './carta';

export class Baralho{
    baralho: Carta[];
    naipes: Naipe[] = [Naipe.Espadas, Naipe.Ouros, Naipe.Paus, Naipe.Copas];
    valores: Valor[] = [Valor.As, Valor.Dois, Valor.Tres, Valor.Quatro, Valor.Cinco, Valor.Seis, Valor.Sete, Valor.Oito, Valor.Nove, Valor.Dez, Valor.Valete, Valor.Dama, Valor.Rei];

    // gerar um baralho ao construir a classe e embaralhar
    constructor(){
        this.baralho = [];
        this.gerar();
        this.embaralhar();
        
    }


    // gerar um novo baralho depois que um jogador "bater"
    gerar(){
  
        // iterador é o próprio valor na array
        for (let naipe of this.naipes){
            for (let valor of this.valores){
                this.baralho.push(new Carta(naipe,valor));
            }
        }
    }

    // embaralhar
    embaralhar(): void{
        // para cada carta do baralho
        for (let i = this.baralho.length - 1; i > 0; i--){

            // um numero gerado aleatoriamente
            let j = Math.floor(Math.random() * (i + 1));

            // muda a posição da carta atual com a carta de numero aleatorio
            let troca = this.baralho[i];
            this.baralho[i] = this.baralho[j];
            this.baralho[j] = troca;
        }
    }

    // mostrar string p/ teste
    toString(): string{
        return this.baralho.join("\n");
    }


    // comprar uma carta (retorna a carta)
    comprar(): Carta{
        return this.baralho.pop();
    }

}