import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-tela-registro-login',
  templateUrl: './tela-registro-login.component.html',
  styleUrls: ['./tela-registro-login.component.scss'],
})
export class TelaRegistroLoginComponent implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {}
  
  voltar(){
    this.navCtrl.back();
  }

  registrar(){
    this.router.navigateByUrl('/registro');
  }

  logar(){
    this.router.navigateByUrl('/login');
  }

  
}
