import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../player.service';
import { Player } from '../../player';
import { Events } from '@ionic/angular';
import { DBProviderService } from '../../dbprovider.service';


@Component({
  selector: 'app-meu-footer',
  templateUrl: './meu-footer.component.html',
  styleUrls: ['./meu-footer.component.scss'],
})
export class MeuFooterComponent implements OnInit {
  player1: Player;
  auth: boolean;

  constructor(private playerService: PlayerService, public events: Events, private dbServ: DBProviderService) { 
    this.auth = false; // teste

    // quando registrou, fica true
    events.subscribe('logou', () => {
      this.auth = true;
      this.player1.nome = this.dbServ.user.nome;
      this.player1.moedasAtual = this.dbServ.user.moedasTotais;
    });
  }

  ngOnInit() {

    // se não estiver logado:
    if (!this.auth){
      this.getPlayerMock(); // colocar o mock
    }

  }

  getPlayerMock(){
    // player mockado
    this.playerService.getPlayer().subscribe(player => {this.player1 = player});
  }

}
