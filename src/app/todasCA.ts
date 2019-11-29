import {Naipe} from './carta';
import {Valor} from './carta';
import {cartaArmadilha} from './cartaArmadilha';


export class todasCA{
    cartas: cartaArmadilha[] =  [];

    // criar o baralho
    constructor(){
       this.gerarCA();

    }

    gerarCA(){
        let carta: cartaArmadilha;

        // criar e colocar na lista
        carta = new cartaArmadilha(0, "Ambos atacam metade se o inimigo bater uma carta de Copas válida");
        carta.setFuncao(0.5,true,true,false,true,Naipe.Copas,null,true);
        this.cartas.push(carta);

        // segunda carta
        carta =  new cartaArmadilha(1, "Você ataca o inimigo se ele bater uma carta Valete válida");
        carta.setFuncao(1,true,false,false,true,null,Valor.Valete,true);
        this.cartas.push(carta);


        carta = new cartaArmadilha(2, "Você ataca normalmente se bater qualquer carta de Paus");
        carta.setFuncao(1,true,false,true,false,Naipe.Paus,null,false);
        this.cartas.push(carta);


        carta = new cartaArmadilha(3,"Você ataca em dobro se bater qualquer Três de Ouros");
        carta.setFuncao(2,true,false,true,false,Naipe.Ouros,Valor.Tres,false);
        this.cartas.push(carta);


        carta = new cartaArmadilha(4,"O inimigo não ataca você se ele bater uma carta de Paus válida");
        carta.setFuncao(0,false,false,false,true,Naipe.Paus,null,true);
        this.cartas.push(carta);

    }
}