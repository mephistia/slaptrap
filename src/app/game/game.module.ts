import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { SharedModule } from '../shared/shared.module';
import { JogoComponent } from '../jogo/jogo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, JogoComponent]
})
export class GamePageModule {}
