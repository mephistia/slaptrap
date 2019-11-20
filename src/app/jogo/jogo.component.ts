import { Component, OnInit } from '@angular/core';
import {Baralho} from '../baralho';
import { Carta } from '../carta';
import {Valor} from '../carta';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})



export class JogoComponent implements OnInit {
  // declara variaveis

  // monte jogável
  Monte: Baralho;
  cartaAtual: Carta;
  turnoPlayer: boolean;
  caminhoCartaAtual: string;
  contador: number;
  vidaPlayer: number;
  vidaInimigo: number;
  cartasPilha: number;
  versusPC: boolean; // importa da seleção do menu
  //                                       ^
  //                                       |
  // atribui valores                       |
  constructor() {  //                      |
    this.versusPC = true;     // para testes   
    this.Monte = new Baralho;
    this.cartaAtual = null; //começa sem carta
    this.turnoPlayer = false;
    this.caminhoCartaAtual = "";
    this.contador = 0;
    this.vidaInimigo = 100;
    this.vidaPlayer = 100;
    this.cartasPilha = 0;
  }



  ngOnInit() {
    // mostrar as cartas na tela (teste)
    console.log(this.Monte.toString());

    // se estiver jogando contra pc
    if (this.versusPC){
      this.turnoPlayer = true; // começa pela vez do jogador
    }    
  }

  gameOver(){
    // chama a tela de resultados (pode ser Div em cima)
  }


  reset(){
    // só reseta se a vida for maior que 0
    if (this.vidaInimigo > 0 && this.vidaPlayer > 0){
      this.cartaAtual = null; //começa sem carta
      this.turnoPlayer = true;
      this.caminhoCartaAtual = "";
      this.contador = 0;
      this.cartasPilha = 0;

      document.getElementById("contador").innerHTML = "Contador: " + this.contador;

      // esvazia o monte
      this.Monte = null;
      this.Monte = new Baralho; // e gera novo
      console.log(this.Monte.toString());


      // se não tem a classe, adiciona
      if (!document.getElementById("monteCartas").classList.contains("podeClicar"))
        document.getElementById("monteCartas").classList.add("podeClicar");


      document.getElementById("cartaPilha").style.backgroundImage = "none";
      document.getElementById("cartaPilha").classList.replace("comCarta","semCarta");
      
    }
    // se algum deles tiver vida = ou < 0
    else {
      this.gameOver();
    }
  }


  // pc tentar bater
  tentarBater():boolean{
    let espera:number = this.randomEntre(200,1000);

    // tentar bater se for um valor válido
    if (this.contador == <number>this.cartaAtual.valor){

      //depois que esperar, tenta bater na carta
      setTimeout(() => {

        // se retorna válido e não foi jogador que clicou
        if (this.clicouPilha(false)) {
          // ataca
          console.log("PC ataca! Resetar a contagem e embaralhar tudo de novo");
          // checar cartas-armadilha

          // se não...
          let ataque = this.cartasPilha * 2;
          this.vidaPlayer -= ataque;
          document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%";
          this.reset();
          return true;

        }
      }, espera);


    }
    // chance de bater se for um valor inválido
    else {
      let chance:number = this.randomEntre(1,15);
      if (chance == 5){

        //depois que esperar, bate a carta
        setTimeout(() => {

          // se retorna válido e não foi jogador que clicou
          if (this.clicouPilha(false)) {
            console.log("PC clicou inválido! Checar armadilhas...");
            this.reset();
            return true;
          }

        }, espera);
      }
      else
        return false;

    }

  }

  // jogo contra pc
  jogoPC(){

    // se não for o turno do jogador
    if (!this.turnoPlayer){

      // se a primeira tentativa não bateu
      if (!this.tentarBater()){
        console.log("Não bateu na primeira");
      }
      else 
      console.log("Bateu na primeira");

        // gerar um tempo aleatorio para retirar nova carta
        let espera:number = this.randomEntre(800,1600);

        // comprar carta sempre depois de tentar bater
        setTimeout(() => {
          this.compraEMostra();
          // dá a vez pro jogador
          this.turnoPlayer = true;
          document.getElementById("monteCartas").classList.add("podeClicar");

          // tenta de novo
          if (!this.tentarBater()){
            console.log("Não bateu na segunda");
          }
          else 
          console.log("Bateu na segunda");
    

        }, espera);

      
    }
  }


  // quando clicar no monte
  clicouBaralho(){

    // verificar se é a vez do jogador
    if (document.getElementById("monteCartas").classList.contains("podeClicar")){

      // remover a "vez"
      document.getElementById("monteCartas").classList.remove("podeClicar");
      this.turnoPlayer = false;

      // função de comprar a carta etc..
      this.compraEMostra();

     
      //chama o turno do pc
      this.jogoPC();
    }

    else {
      console.log("Não pode clicar!");
    }

  }

  // função separada para servir para o PC também:
  compraEMostra(){
     // comprar uma carta
     this.comprarCarta();

     // mostrar a carta
     this.mostrarCarta();

     // aumentar o contador
     if (this.contador < 13){
       this.contador++;
     }
     else {
       this.contador = 1;
     }
     

     this.cartasPilha++;

     //atualizar o contador
      // se for três ou Ás
      if (this.contador == 1){
       document.getElementById("contador").innerHTML = "Contador: Ás";
       
      }
      else if (this.contador == 3){
        document.getElementById("contador").innerHTML = "Contador: Três";
      }
      else
     document.getElementById("contador").innerHTML = "Contador: " + Valor[this.contador];

  
     console.log("Carta: " + this.cartaAtual.valor);
     console.log("Cartas na pilha: " + this.cartasPilha);
     console.log("Carta numero: " + <number>this.cartaAtual.valor);

  }

    // comprar uma carta (definir quando for vez do jogador)
    comprarCarta(){
      this.cartaAtual = this.Monte.comprar();
    }

  // mostrar uma carta
  mostrarCarta(){
    // pegar o elemento da carta na tela
    let carta = document.getElementById("cartaPilha");

    // define o src da imagem da carta
    this.caminhoCartaAtual = '../../assets/cartas/' + this.cartaAtual.toString() + '.png';

    // adiciona como background-image
    carta.style.backgroundImage = 'url("' + this.caminhoCartaAtual + '")';
    carta.classList.replace("semCarta","comCarta");
    carta.classList.add("clicavel"); // se tem uma carta, é clicável
    

  }


  // quando clicar na pilha, retornar se é válido ou não
  clicouPilha(foiJogador:boolean):boolean{

    if (foiJogador){
      console.log("Jogador tentou clicar");
    }
    else {
      console.log("PC tentou clicar");
    }

    // se tiver classe "clicável"
    if (document.getElementById("cartaPilha").classList.contains("clicavel")) {
      document.getElementById("cartaPilha").classList.remove("clicavel");
      
      if (foiJogador) {
        // checar cartas-armadilha

        // se não...
        if (this.contador == <number>this.cartaAtual.valor){
          
        let ataque = this.cartasPilha * 2;
        this.vidaInimigo -= ataque;
        document.getElementById("vidaInimigo").style.width = this.vidaInimigo + "%";
        }

        this.reset();
      }

      return true;

    }

    console.log("Não conseguiu clicar");
    
    return false;

  }


  randomEntre(min, max): number { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
