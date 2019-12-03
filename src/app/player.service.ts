import { Injectable } from '@angular/core';
import { Player } from './player';
import { PLAYER } from './mock-player';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { DatabaseService } from './database.service';
import { User } from './database.service';
import { cartaArmadilha } from './cartaArmadilha';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private messageService: MessageService, private dbService: DatabaseService) { }

  getPlayer(/*id: number*/): Observable<Player>{

    // SQLite não é indicado para database de server; alterado para Firebase com "user" e "dbprovider"
    // ------------------------------------------------------------------------------------

    //  let playerdb: User;
    //  let player: Player;

    //  // pega user da database
    //  this.dbService.getUser(id).then(User => playerdb = User);

    //  // player recebe os dados da db
    //  player = new Player(playerdb.nome, playerdb.id, playerdb.moedasAcumuladas, playerdb.moedasAtuais, new cartaArmadilha[playerdb.carta1,playerdb.carta2,playerdb.carta3], new cartaArmadilha[playerdb.carta1,playerdb.carta2,playerdb.carta3]);
     

    // this.messageService.add(player.cartasEquipadas[0].toString());
    // this.messageService.add(player.cartasEquipadas[1].toString());
    // this.messageService.add(player.cartasEquipadas[2].toString());

    
    this.messageService.add(PLAYER.cartasEquipadas[0].toString());
    this.messageService.add(PLAYER.cartasEquipadas[1].toString());
    this.messageService.add(PLAYER.cartasEquipadas[2].toString());

    return of(PLAYER); // mock
  }

}
