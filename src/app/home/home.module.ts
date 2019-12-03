import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MeuHeaderComponent } from '../meu-header/meu-header.component';
import { MeuFooterComponent } from '../meu-footer/meu-footer.component';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { TelaRegistroLoginComponent } from '../tela-registro-login/tela-registro-login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage

      }
    ])
  ],
  declarations: [HomePage, MeuHeaderComponent, MenuPrincipalComponent, MeuFooterComponent, TelaRegistroLoginComponent]
})
export class HomePageModule {}
