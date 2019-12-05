import { Component, OnInit } from '@angular/core';
import {Baralho } from '../baralho';
import { Carta, Naipe } from '../carta';
import { Valor } from '../carta';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { MessageService } from '../message.service';
import { todasCA } from '../todasCA';
import { cartaArmadilha } from '../cartaArmadilha';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Events } from '@ionic/angular';
import { DBProviderService } from '../dbprovider.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})



export class JogoComponent implements OnInit {
  // cartas para pc
  todasCartas: todasCA = new todasCA;
  cartasPC: cartaArmadilha[] = [];

  // monte jogável
  player1: Player;
  Monte: Baralho;
  cartaAtual: Carta;
  turnoPlayer: boolean;
  caminhoCartaAtual: string;
  contador: number;
  vidaPlayer: number;
  vidaInimigo: number;
  cartasPilha: number;
  foiJogador: boolean;
  auth: boolean;
  versusPC: boolean; 
  tempo: number;
  timer;
 
  constructor(private playerService: PlayerService, public messageService: MessageService, private vibra: Vibration, public events: Events, private dbServ: DBProviderService, private router: Router) { 
    this.versusPC = true;     // para testes   
    this.Monte = new Baralho;
    this.cartaAtual = null; //começa sem carta
    this.turnoPlayer = false;
    this.caminhoCartaAtual = "";
    this.contador = 0;
    this.vidaInimigo = 100;
    this.vidaPlayer = 100;
    this.cartasPilha = 0;
    this.auth = false; // teste

     // quando registrou, fica true
     events.subscribe('logou', () => {
      this.auth = true;
      this.player1.nome = this.dbServ.user.nome;
      this.messageService.messages[0] = this.dbServ.user.cartasEquipadas[0].toString();
      this.messageService.messages[1] = this.dbServ.user.cartasEquipadas[1].toString();
      this.messageService.messages[2] = this.dbServ.user.cartasEquipadas[2].toString();
    });
  }


  getPlayer1(): void{
    this.playerService.getPlayer().subscribe(player => {this.player1 = player});
  }

  ngOnInit() {

    if (!this.auth){
    this.getPlayer1(); // pega o player
    }


    // se estiver jogando contra pc
    if (this.versusPC){

      let numCarta: number;

      // para as 3 cartas armadilha
      for (let i: number = 0; i < 3; i++){
        
        do { // sortear um numero
          numCarta = this.randomEntre(0,4);
        }
        // enquanto já existir esse numero na carta
        while (this.cartasPC.includes(this.todasCartas.cartas[numCarta]));

        // e então atribuir
        this.cartasPC[i] = this.todasCartas.cartas[numCarta];
        console.log("Carta PC " + i + ": " + this.cartasPC[i]);        
      }


      this.turnoPlayer = true; // começa pela vez do jogador

      // iniciar timer, aumenta o valor de Tempo a cada segundo
      this.timer = setInterval(() => this.tempo++, 1000);

    }
    
  }

  gameOver(){
    // chama a tela de resultados 
    clearInterval(this.timer);
    let frase: string;
    if (this.vidaInimigo <= 0){
      frase = "Você venceu!";
    }
    else {
      frase = "Você perdeu!";
    }
    this.events.publish('gameOver',this.tempo, frase); // passa os parâmetros
    this.router.navigateByUrl('/game-over');
  }


  reset(){
    // só reseta se a vida for maior que 0
    if (this.vidaInimigo > 0 && this.vidaPlayer > 0) {
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
    let espera:number = this.randomEntre(600,1500);

    // tentar bater se for um valor válido
    if (this.contador == <number>this.cartaAtual.valor){

      //depois que esperar, tenta bater na carta
      setTimeout(() => {

        // se retorna válido e não foi jogador que clicou
        if (this.clicouPilha(false)) {
          // checar cartas-armadilha
        let entrouArmadilha: boolean = false;
        console.log("Jogador clicou na pilha!");

        for (let i:number = 0; i < 3; i++){
          // se pode usar a carta
          if (this.cartasPC[i].canUse){
            console.log("A carta " + i + " pode ser usada. Armadilha está satisfeita?" + this.checarArmadilhas2(i));

            if (this.checarArmadilhas2(i)){ // se ela pode ser ativada agora

              // adicionar o ataque do PC
              if (this.cartasPC[i].jogadorAtaca){ // "jogador" aqui é o pc, que ataca o jogador em si
                let ataque = (this.cartasPilha * this.cartasPC[i].qtdAtaque) * 3;
                this.vidaPlayer -= ataque;
                document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%";  
              }
            
              // se ataca a si mesmo:
              if (this.cartasPC[i].inimAtaca){ // inimigo nesse caso é o player
                let ataque = (this.cartasPilha * this.cartasPC[i].qtdAtaque) * 3;
                this.vidaInimigo -= ataque;
                document.getElementById("vidaInimigo").style.width = this.vidaInimigo + "%";  
              }

              this.cartasPC[i].canUse = false; // não pode mais usar a carta

              entrouArmadilha = true;
              console.log("Entrou na carta Armadilha: " + this.cartasPC[i].desc);

              // mostrar feedback
              this.mostrarCartaUsada(2,i);
              window.setTimeout(()=>{this.esconder("popup");},2500);
              // deixar this.trasparente("info-carta-x") do inimigo/pc

              break; // só uma carta ativa por vez
            }
          }
        }

        // se não...
        if (!entrouArmadilha && this.contador == <number>this.cartaAtual.valor){
          let ataque = this.cartasPilha * 3;
          this.vidaPlayer -= ataque;
          document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%"; // diminui barra da vida
  
        }
        // se não foi na armadilha e nem é igual ao valor do contador
        else if (!entrouArmadilha && this.contador!= <number>this.cartaAtual.valor){
          // mostrar feedback
          document.getElementById("popup").innerHTML = '<span style="color:black;"> Clicou errado! </span>';
          this.mostrar("popup");
          window.setTimeout(()=>{this.esconder("popup");},900);
        }

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
                     // checar cartas-armadilha
        let entrouArmadilha: boolean = false;
        console.log("Jogador clicou na pilha!");

        for (let i:number = 0; i < 3; i++){
          // se pode usar a carta
          if (this.cartasPC[i].canUse){
            console.log("A carta " + i + " pode ser usada. Armadilha está satisfeita?" + this.checarArmadilhas2(i));

            if (this.checarArmadilhas2(i)){ // se ela pode ser ativada agora

              // adicionar o ataque do PC
              if (this.cartasPC[i].jogadorAtaca){ // "jogador" aqui é o pc, que ataca o jogador em si
                let ataque = (this.cartasPilha * this.cartasPC[i].qtdAtaque) * 3;
                this.vidaPlayer -= ataque;
                document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%";  
              }
            
              // se ataca a si mesmo:
              if (this.cartasPC[i].inimAtaca){ // inimigo nesse caso é o player
                let ataque = (this.cartasPilha * this.cartasPC[i].qtdAtaque) * 3;
                this.vidaInimigo -= ataque;
                document.getElementById("vidaInimigo").style.width = this.vidaInimigo + "%";  
              }

              this.cartasPC[i].canUse = false; // não pode mais usar a carta

              entrouArmadilha = true;
              console.log("Entrou na carta Armadilha: " + this.cartasPC[i].desc);
              
              // mostrar feedback
              this.mostrarCartaUsada(2,i);
              window.setTimeout(()=>{this.esconder("popup");},2500);
              // deixar this.trasparente("info-carta-x") do inimigo/pc

              break; // só uma carta ativa por vez
            }
          }
        }

          // se não...
          if (!entrouArmadilha && this.contador == <number>this.cartaAtual.valor){
            let ataque = this.cartasPilha * 3;
            this.vidaPlayer -= ataque;
            document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%"; // diminui barra da vida
  
          }
          
          // se não foi na armadilha e nem é igual ao valor do contador
          else if (!entrouArmadilha && this.contador!= <number>this.cartaAtual.valor){
            // mostrar feedback
            document.getElementById("popup").innerHTML = '<span style="color:black;"> Clicou errado! </span>';
            this.mostrar("popup");
            window.setTimeout(()=>{this.esconder("popup");},900);
          }

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

      // se na primeira tentativa não bateu
      if (!this.tentarBater()){
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
                 console.log("Não bateu");
               }       
     
             }, espera);
     
      } 
      
    }
  }


  // quando clicar no monte
  clicouBaralho(){

    // verificar se é a vez do jogador
    if (document.getElementById("monteCartas").classList.contains("podeClicar")){
      // vibrar
      this.vibra.vibrate(300);

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
      // tocar um som?
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
      this.foiJogador = true;
    }
    else {
      console.log("PC tentou clicar");
      this.foiJogador = false;
    }

    // se tiver classe "clicável"
    if (document.getElementById("cartaPilha").classList.contains("clicavel")) {
      document.getElementById("cartaPilha").classList.remove("clicavel");
      
      if (foiJogador) {
        // checar cartas-armadilha
        let entrouArmadilha: boolean = false;
        console.log("Jogador clicou na pilha!");

        for (let i:number = 0; i < 3; i++){
          // se pode usar a carta
          if (this.player1.cartasEquipadas[i].canUse){
            console.log("A carta " + i + " pode ser usada. Armadilha está satisfeita?" + this.checarArmadilhas(i));

            if (this.checarArmadilhas(i)){ // se ela pode ser ativada agora

              // adicionar o ataque do jogador
              if (this.player1.cartasEquipadas[i].jogadorAtaca){
                let ataque = (this.cartasPilha * this.player1.cartasEquipadas[i].qtdAtaque) * 3;
                this.vidaInimigo -= ataque;
                document.getElementById("vidaInimigo").style.width = this.vidaInimigo + "%";  
              }
            
              // se ataca a si mesmo:
              if (this.player1.cartasEquipadas[i].inimAtaca){
                let ataque = (this.cartasPilha * this.player1.cartasEquipadas[i].qtdAtaque) * 3;
                this.vidaPlayer -= ataque;
                document.getElementById("vidaJogador").style.width = this.vidaPlayer + "%";  
              }

              this.player1.cartasEquipadas[i].canUse = false; // não pode mais usar a carta

              entrouArmadilha = true;
              console.log("Entrou na carta Armadilha: " + this.player1.cartasEquipadas[i].desc);
                  
              // mostrar feedback
              this.mostrarCartaUsada(1,i);
              window.setTimeout(()=>{this.esconder("popup");},2500);
              
              // deixar a carta transparente
              let info:string;
              info = "info-carta-" + (i+1);
              this.transparente(info);
              

              break; // só uma carta ativa por vez
            }
          }
        }



        // se não entrar...
        if (!entrouArmadilha && this.contador == <number>this.cartaAtual.valor){
          
        let ataque = this.cartasPilha * 3;
        this.vidaInimigo -= ataque;
        document.getElementById("vidaInimigo").style.width = this.vidaInimigo + "%";
        }

        // se não foi na armadilha e nem é igual ao valo do contador
        else if (!entrouArmadilha && this.contador!= <number>this.cartaAtual.valor){
          // mostrar feedback
          document.getElementById("popup").innerHTML = '<span style="color:black;">Clicou errado! </span>';
          this.mostrar("popup");
          window.setTimeout(()=>{this.esconder("popup");},1500);
        }

        this.reset();
      }

      return true;

    }

    console.log("Não conseguiu clicar");

    
    return false;

  }

  // checar se a carta armadilha do numero é ativada quando o JOGADOR jogar
  checarArmadilhas(num:number): boolean{
     // pegar os valores
     let inimJogou: boolean = this.player1.cartasEquipadas[num].inimJogou;
     let cartaEDoNaipe: Naipe = this.player1.cartasEquipadas[num].temNaipe; // se for null, não precisa de naipe
     let temNaipe: boolean = true;
     if (cartaEDoNaipe == null) { temNaipe = false; }
     
     let cartaEDoValor: Valor = this.player1.cartasEquipadas[num].temValor; // se for null..
     let temValor: boolean = true;
     if (cartaEDoValor == null){ temValor = false;}

     let cartaValida: boolean = this.player1.cartasEquipadas[num].cartaValida; // precisa bater carta válida?
     let cartaBatidaValida: boolean; // a que bateu foi válida?

     // se precisa ser válida e for do mesmo número, então a batida foi válida
     if (cartaValida && this.contador == <number>this.cartaAtual.valor){ cartaBatidaValida = true;}

     // se não precisa ser válida, pode quaquer uma
     else { cartaBatidaValida = false}

     // se a carta ativar quando o nosso inimigo bater
     if (inimJogou){
      if (
        !this.foiJogador &&
        !temNaipe && // se nao iguala no naipe, iguala no valor
        cartaEDoValor == this.cartaAtual.valor &&
        cartaValida == cartaBatidaValida // serve tanto para as duas true quanto para as duas false          
        ){ 
          return true; 
        }

      else if (
        !this.foiJogador &&  
        !temValor && // se não iguala no valor, iguala no naipe
        cartaEDoNaipe == this.cartaAtual.naipe &&
        cartaValida == cartaBatidaValida
      ) {
        return true;
      }

      // se não confere:
      else { return false; }

    }

    // se a carta ativar quando o jogador mesmo bater
    else {
      if (
        this.foiJogador &&
        !temNaipe &&
        cartaEDoValor == this.cartaAtual.valor &&
        cartaValida == cartaBatidaValida
      ) {
        return true;
      }

      else if (
        this.foiJogador &&
        !temValor &&
        cartaEDoNaipe == this.cartaAtual.naipe &&
        cartaValida == cartaBatidaValida
      ) {
        return true;
      }

      else { return false; }

    }


  }

  // checa se a carta armadilha do número é ativada quando o PC/JOGADOR2 jogar
  checarArmadilhas2(num: number): boolean{
    // conferir cartas do pc ou player 2
    // pegar os valores
    let inimJogou: boolean = this.cartasPC[num].inimJogou;
    let cartaEDoNaipe: Naipe = this.cartasPC[num].temNaipe; // se for null, não precisa de naipe
    let temNaipe: boolean = true;
    if (cartaEDoNaipe == null) { temNaipe = false; }
     
    let cartaEDoValor: Valor = this.cartasPC[num].temValor; // se for null..
    let temValor: boolean = true;
    if (cartaEDoValor == null){ temValor = false;}

    let cartaValida: boolean = this.cartasPC[num].cartaValida; // precisa bater carta válida?
    let cartaBatidaValida: boolean; // a que bateu foi válida?

    // se precisa ser válida e for do mesmo número, então a batida foi válida
    if (cartaValida && this.contador == <number>this.cartaAtual.valor){ cartaBatidaValida = true;}

    // se não precisa ser válida, pode quaquer uma
    else { cartaBatidaValida = false}


    if (this.versusPC){ // se foi PC ou outro jogador...

      // se a carta do pc ativar quando o jogador bater (jogador é inimigo do PC)
      if (inimJogou){
        if (
          this.foiJogador &&
          !temNaipe && // se nao iguala no naipe, iguala no valor
          cartaEDoValor == this.cartaAtual.valor &&
          cartaValida == cartaBatidaValida // serve tanto para as duas true quanto para as duas false          
          ){ 
            return true; 
          }

        else if (
          this.foiJogador &&  
          !temValor && // se não iguala no valor, iguala no naipe
          cartaEDoNaipe == this.cartaAtual.naipe &&
          cartaValida == cartaBatidaValida
        ) {
          return true;
        }

        // se não confere:
        else { return false; }

      }

      // se a carta do pc ativar quando o PC mesmo bater:
      else {
        if (
          !this.foiJogador &&
          !temNaipe &&
          cartaEDoValor == this.cartaAtual.valor &&
          cartaValida == cartaBatidaValida
        ) {
          return true;
        }

        else if (
          !this.foiJogador &&
          !temValor &&
          cartaEDoNaipe == this.cartaAtual.naipe &&
          cartaValida == cartaBatidaValida
        ) {
          return true;
        }

        else { return false; }

      }


    }

  }


  randomEntre(min, max): number { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  mostrarCartaUsada(Player1ou2: number, numCarta: number){ 
    // pega o elemento de "pop-up" e mostra a descrição da carta
    if (Player1ou2 == 1){
      document.getElementById("popup").innerHTML = '<span style="color: black;">' + this.player1.cartasEquipadas[numCarta].desc  +
      '<span style="font-weight:bold; color:black;"><br>' +  this.player1.nome + '</span> </span>';
    }
    else {
      document.getElementById("popup").innerHTML = '<span style="color: black;">' + this.cartasPC[numCarta].desc +
      '<span style="font-weight:bold; color:black;"><br>PC</span>' + '</span>';
    }

    this.mostrar("popup");
  }

  // usar com setTimeout
  esconder(elementID: string){
    document.getElementById(elementID).classList.add("inactive");
  }

  transparente(elementID: string){
    document.getElementById(elementID).classList.add("transparent");
  }

  mostrar(elementID: string){
    document.getElementById(elementID).classList.remove("inactive");
  }

  opaco(elementID: string){
    document.getElementById(elementID).classList.remove("transparent");
  }


}
