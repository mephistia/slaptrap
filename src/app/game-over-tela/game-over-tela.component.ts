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



  constructor(public events: Events, private router: Router, private ngZone: NgZone) {
    this.isOver = false;

    this.minutos = '00'
    this.segundos = '00';
    this.fraseOver = 'aaaaaaa';
    this.moedas = '22';
    
    this.events.subscribe('gameOver', data => {

      this.ngZone.run(() => {
        this.isOver = true;
        this.fraseOver = data[1];
        this.moedas = data[2];
        this.minutos = Math.floor(<number>data[0]/60).toString();
        this.segundos = (<number>data[0] % 60).toString();
        if (this.segundos.length == 1){
          let zero: string = '0';
          zero = zero.concat(this.segundos);
          this.segundos = zero;
          console.log('Segundos: ' + this.segundos);
        }
      });


      console.log("Recebeu: " + this.minutos + ":" + this.segundos + ", " + this.moedas + ", " + this.fraseOver);
    
    });
   }

  ngOnInit() {
  }

  voltaInicio(){
    this.router.navigateByUrl('/');
  }



}
