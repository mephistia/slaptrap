import { cartaArmadilha } from './cartaArmadilha';

export class Player {
    nome: string;
    id: number;
    moedasTotal: number;
    moedasAtual: number;
    cartasInventario: cartaArmadilha[];
    cartasEquipadas: cartaArmadilha[];

    constructor(nome:string,id:number,moedasTotal:number,moedasAtual:number,cartasInventario:cartaArmadilha[],cartasEquipadas:cartaArmadilha[]){
        this.id = id;
        this.nome = nome;
        this.moedasAtual = moedasAtual;
        this.moedasTotal = moedasTotal;
        this.cartasInventario = cartasInventario;
        this.cartasEquipadas = cartasEquipadas;

    }
}