import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tela-registro-login',
  templateUrl: './tela-registro-login.component.html',
  styleUrls: ['./tela-registro-login.component.scss'],
})
export class TelaRegistroLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  
  voltar(){
    this.router.navigateByUrl('/');
  }

  registrar(){
    this.router.navigateByUrl('/registro');
  }

  logar(){
    this.router.navigateByUrl('/login');
  }
}
