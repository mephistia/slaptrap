import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-meu-footer',
  templateUrl: './meu-footer.component.html',
  styleUrls: ['./meu-footer.component.scss'],
})
export class MeuFooterComponent implements OnInit {
  player1: Player;
  auth: boolean;

  constructor(private playerService: PlayerService) { 
    this.auth = false; // teste
  }

  ngOnInit() {

    // se não estiver logado:
    if (!this.auth){
      this.getPlayerMock(); // colocar o mock
    }
    else {
      // pegar da database
    }
  }

  getPlayerMock(){
    // player mockado
    this.playerService.getPlayer().subscribe(player => {this.player1 = player});
  }

}
