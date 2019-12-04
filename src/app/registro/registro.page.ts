import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DBProviderService } from '../dbprovider.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: User;

  constructor(private router: Router, private dbServ: DBProviderService, private toastCtrl: ToastController, public events: Events) { 
    this.user = new User();
  }

  ngOnInit() {
  }

  registrar(){
    this.dbServ.registerUser(this.user).then(_ => {
      this.events.publish('registrou');
      this.mostrarToast();
    });
  }

  async mostrarToast(){
    const toast = await this.toastCtrl.create({
      message: 'Registro realizado com sucesso!',
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss().then(() => {
      this.router.navigateByUrl('/');
    })
    toast.present();
  }

}
