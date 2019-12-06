import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-game-over-tela',
  templateUrl: './game-over-tela.component.html',
  styleUrls: ['./game-over-tela.component.scss'],
})
export class GameOverTelaComponent implements OnInit {
  fraseOver: string;
  minutos: string;
  segundos: string;
  isOver: boolean;
  moedas: string;


  constructor(public events: Events, private router: Router) {
    this.isOver = false;

    
    events.subscribe('game-over', (tempo, frase, moedas) => {
      this.isOver = true;
      this.fraseOver = frase;
      this.moedas = moedas.toString();
      this.minutos = Math.floor(tempo/60).toString();
      this.segundos = (tempo % 60).toString();
    })

    if (!this.isOver){
      this.minutos = '00'
      this.segundos = '00';
      this.fraseOver = 'Jogo não iniciado';
      this.moedas = '0';
    }
   

   }

  ngOnInit() {

  }

  voltaInicio(){
    this.router.navigateByUrl('/');
  }

}
