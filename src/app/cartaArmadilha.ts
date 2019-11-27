import {Naipe} from './carta';
import {Valor} from './carta';

export class cartaArmadilha{
    id: number;
    desc: string;
    isOwned: boolean;
    isEquipped: boolean;
    canUse: boolean;

    // funcionalidade:
    qtdAtaque: number; // multiplica pelo valor de ataque (0.5, 1 ou 2)
    jogadorAtaca: boolean; // o jogador ataca o inimigo nessa carta?
    inimAtaca: boolean; // o inimigo ataca o jogador nessa carta? (ex: divide o ataque pela metade)
    jogadorJogou: boolean; // é ativada após uma batida do jogador?
    inimJogou: boolean; // é ativada após uma batida do inimigo?
    temNaipe: Naipe; // cumpre um requisito de naipe? Se for null, não precisa de naipe
    temValor: Valor; // cumpre um requisito de valor? Se for null, não precisa de valor
    cartaValida: boolean; // precisa ser uma carta com valor igual da contagem?


    // cirar uma carta
    constructor(id: number, desc: string){
        this.id = id;
        this.desc = desc;
        this.isOwned = false;
        this.isEquipped = false;
        this.canUse = true;
    }

    // adicionar a função
    setFuncao(qtdAtaque: number, jogadorAtaca: boolean, inimAtaca: boolean, jogadorJogou: boolean, inimJogou: boolean, temNaipe: Naipe, temValor: Valor, cartaValida: boolean){
        this.qtdAtaque = qtdAtaque;
        this.jogadorAtaca = jogadorAtaca;
        this.inimAtaca = inimAtaca;
        this.jogadorJogou = jogadorJogou;
        this.inimJogou = inimJogou;
        this.temNaipe = temNaipe;
        this.temValor = temValor;
        this.cartaValida = cartaValida;
    }

    toString(){
        return this.desc;
    }
}