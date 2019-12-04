import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-header',
  templateUrl: './meu-header.component.html',
  styleUrls: ['./meu-header.component.scss'],
})
export class MeuHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  
  carregaOpcoes(){
    // mostrar opções
    document.getElementById("telaOpcoes").classList.remove("inactive");
    document.getElementById("main2").classList.add("inactive");
  }

  fechaOpcoes(){
    document.getElementById("telaOpcoes").classList.add("inactive");
    document.getElementById("main2").classList.remove("inactive");

  }
}

