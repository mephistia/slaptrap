import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../audio.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {
  auth: boolean;

  constructor(private router: Router, private audio: AudioService) { 
    this.auth = false; // teste
   } 

  ngOnInit() {  

  }

  ngAfterViewInit(){
    // this.audio.preload('button','assets/audio/button.ogg', false);
    // this.audio.preload('card', 'assets/audio/card.ogg', false);
    this.audio.preload('music','assets/audio/music.ogg', true);

    this.audio.play('music',true);
  }

  clicouVSJogador(){
    // se estiver registrado, vai para o jogo, se não entra no registro
    if (!this.auth){
      // this.audio.play('button',false);
      this.router.navigateByUrl('/registro-login');
    }
    else {
      console.log("Jogador está logado");
    }

  }

  jogo(){
    this.router.navigateByUrl('/game');
  }

  ngOnDestroy(){
    this.audio.stop('music');
  }

}
