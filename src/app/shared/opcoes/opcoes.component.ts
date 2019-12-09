import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-opcoes-comp',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss'],
})
export class OpcoesComponent implements OnInit {

  constructor(    
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  
  async fechaOpcoes(){
    await this.modalCtrl.dismiss();
  }

}
