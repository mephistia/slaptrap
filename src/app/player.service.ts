import { Injectable } from '@angular/core';
import { Player } from './player';
import { PLAYER } from './mock-player';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private messageService: MessageService) { }

  getPlayer(): Observable<Player>{
     // retornar player de verdade se estiver logado

        
    console.log("Equipadas Mesmo? Segunda checagem: " + PLAYER.cartasEquipadas.filter( carta => carta.isEquipped).toString());
    console.log("Possuídas mesmo? Segunda checagem: " + PLAYER.cartasInventario.filter( carta => carta.isOwned).toString());

    this.messageService.add(PLAYER.cartasEquipadas[0].toString());
    this.messageService.add(PLAYER.cartasEquipadas[1].toString());
    this.messageService.add(PLAYER.cartasEquipadas[2].toString());

    return of(PLAYER); // mock
  }

}
