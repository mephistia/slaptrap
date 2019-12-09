import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpcoesPage } from '../../opcoes/opcoes.page';


@Component({
  selector: 'app-meu-header',
  templateUrl: './meu-header.component.html',
  styleUrls: ['./meu-header.component.scss'],
})
export class MeuHeaderComponent implements OnInit {

  constructor(
    public modalController: ModalController

  ) { }

  ngOnInit() {}

  
  async carregaOpcoes(){
    const modal = await this.modalController.create({
      component: OpcoesPage
    });  

    return await modal.present();

  }
}

