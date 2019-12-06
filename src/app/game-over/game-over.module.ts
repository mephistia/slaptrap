import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameOverPageRoutingModule } from './game-over-routing.module';

import { GameOverPage } from './game-over.page';
import { SharedModule } from '../shared/shared.module';
import { GameOverTelaComponent } from '../game-over-tela/game-over-tela.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GameOverPageRoutingModule
  ],
  declarations: [GameOverPage, GameOverTelaComponent]
})
export class GameOverPageModule {}
