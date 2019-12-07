import { Component, OnInit, NgZone } from '@angular/core';
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
  timer: any;
  dataReceived: string[];



  constructor(public events: Events, private router: Router, private ngZone: NgZone) {
    this.isOver = false;
    this.minutos = '00'
    this.segundos = '00';
    this.fraseOver = 'Jogo não iniciado';
    this.moedas = '0';
    
    this.events.subscribe('game-over', data => {

      this.ngZone.run(() => {
        this.isOver = true;
        this.fraseOver = data[1];
        this.moedas = data[2];
        this.minutos = Math.floor(<number>data[0]/60).toString();
        this.segundos = (<number>data[0] % 60).toString();
        this.dataReceived = data;
      });


      console.log("Recebeu: " + data[0] + ", " + data[1] + ", " + data[2]);
    
    });


   }

  ngOnInit() {

  }

  voltaInicio(){
    this.router.navigateByUrl('/');
  }



}
