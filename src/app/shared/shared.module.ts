import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MenuPrincipalComponent } from '../../app/shared/menu-principal/menu-principal.component';
import { MeuFooterComponent } from '../../app/shared/meu-footer/meu-footer.component';
import { MeuHeaderComponent } from '../../app/shared/meu-header/meu-header.component';
import { TelaRegistroLoginComponent } from '../../app/shared/tela-registro-login/tela-registro-login.component';


@NgModule({
  imports: [
    CommonModule, IonicModule
  ],
  declarations: [
    MenuPrincipalComponent, MeuFooterComponent, MeuHeaderComponent, TelaRegistroLoginComponent
  ],
  exports: [
    MenuPrincipalComponent, MeuFooterComponent, MeuHeaderComponent, TelaRegistroLoginComponent
  ]
})
export class SharedModule { }
