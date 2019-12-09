import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DBProviderService } from '../dbprovider.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: User;
  constructor(
    private router: Router, 
    private dbServ: DBProviderService, 
    private toastCtrl: ToastController, 
    public events: Events,
    private navCtrl: NavController
    ) { 
      this.user = new User();
  }

  ngOnInit() {
  }

  voltar(){
    this.navCtrl.back();
  }

  registrar(){
    if (this.user.nome != null && this.user.email != null && this.user.senha != null){
      console.log("Nome: " + this.user.nome)
      this.dbServ.registerUser(this.user).then(_ => {
        this.events.publish('registrou');    
        this.mostrarToast();

      });

    }
    else {
      this.mostrarToastCustom('Erro: É necessário preencher todos os campos!')
    }
   
  }

  async mostrarToast(){
    const toast = await this.toastCtrl.create({
      message: 'Registro realizado com sucesso!',
      duration: 1500,
      position: 'bottom'
    });
    toast.onDidDismiss().then(() => {
      this.router.navigateByUrl('/login');

    })
    toast.present();
  }

  async mostrarToastCustom(mensagem: string){
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

}
