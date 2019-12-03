import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {
  auth: boolean;

  constructor(private router: Router) { 
    this.auth = false; // teste
   } 

  ngOnInit() {}

  clicouVSJogador(){
    // se estiver registrado, vai para o jogo, se não entra no registro
    if (!this.auth){
      this.router.navigateByUrl('/registro-login');
    }
    else {
      console.log("Jogador está logado");
    }

  }



}
