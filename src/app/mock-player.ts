import { Player } from './player';
import { todasCA } from './todasCA';

let i: number = 0; // colocar número de ID livre
let cartas: todasCA = new todasCA;



export const PLAYER: Player = new Player("Jogador" + i, i, 0, 0, cartas.cartas.slice(0,4),cartas.cartas.slice(0,3));

for (let i:number = 0; i < PLAYER.cartasEquipadas.length; i++){
    // 'equipar' cada carta 
    PLAYER.cartasEquipadas[i].isEquipped = true;
  }

  
  for (let i:number = 0; i < PLAYER.cartasInventario.length; i++){
    // setar como no inventário
    PLAYER.cartasInventario[i].isOwned = true;
  }


