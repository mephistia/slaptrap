import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { DBProviderService } from '../dbprovider.service';
import { ToastController } from '@ionic/angular';
import { UserResponse } from '../user';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;

  constructor(private router: Router, public events: Events, private dbServ: DBProviderService,private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  voltar(){
    this.router.navigateByUrl('/');
  }

  login(){
    try {
      this.dbServ.login(this.email, this.senha, this.toastCtrl, this.router, this.events, this.mostrarToast);
    } catch (e){
      console.log("Erro ao logar: " + JSON.stringify(e));
    }

  }

  async mostrarToast(toastCtrl, router, events){
    const toast = await toastCtrl.create({
      message: 'Login realizado com sucesso!',
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss().then(() => {
      events.publish('logou');
      router.navigateByUrl('/');
    })
    toast.present();
  }

}
