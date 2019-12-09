import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpcoesPage } from '../opcoes/opcoes.page';

@Component({
  selector: 'app-meu-header',
  templateUrl: './meu-header.component.html',
  styleUrls: ['./meu-header.component.scss'],
})
export class MeuHeaderComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  
  async carregaOpcoes(){
    console.log("clicou nas opcoes");
    
    const modal = await this.modalCtrl.create({
      component: OpcoesPage,
      // componentProps: {
        
      // }
    });
    console.log("Criou o modal");

    return await modal.present();
  }

}

