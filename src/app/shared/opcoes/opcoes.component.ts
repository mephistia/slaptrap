import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AudioService } from '../../audio.service';




@Component({
  selector: 'app-opcoes-comp',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss'],
})
export class OpcoesComponent implements OnInit {
  estado: string = '';

  constructor(    
    private modalCtrl: ModalController,
    private audio: AudioService
  )
  { 
    this.estado = 'ativada';
  }

  ngOnInit() {
    this.estado = 'ativada';

  }

  
  async fechaOpcoes(){
    await this.modalCtrl.dismiss();
  }

  toggleMusica(){
    // se parar a musica
    if (this.audio.toggleStop('music',true)){
      this.estado = 'desativada';
    }
    else {
      this.estado = 'ativada';
    }
  }

}
