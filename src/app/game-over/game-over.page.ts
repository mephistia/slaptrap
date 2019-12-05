import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {
  fraseOver: string;
  minutos: string;
  segundos: string;
  isOver: boolean;

  constructor(public events: Events) {
    this.isOver = false;

    events.subscribe('game-over', (tempo, frase) => {
      this.isOver = true;
      this.fraseOver = frase;
      this.minutos = Math.floor(tempo/60).toString();
      this.segundos = (tempo % 60).toString();
    })
   }

  ngOnInit() {
    if (!this.isOver){
      this.minutos = '00'
      this.segundos = '00';
    }
  }

}
