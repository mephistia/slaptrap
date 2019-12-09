import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MenuPrincipalComponent } from '../../app/shared/menu-principal/menu-principal.component';
import { MeuFooterComponent } from '../../app/shared/meu-footer/meu-footer.component';
import { MeuHeaderComponent } from '../../app/shared/meu-header/meu-header.component';
import { TelaRegistroLoginComponent } from '../../app/shared/tela-registro-login/tela-registro-login.component';
import { OpcoesComponent } from '../../app/shared/opcoes/opcoes.component';

@NgModule({
  imports: [
    CommonModule, IonicModule
  ],
  declarations: [
    MenuPrincipalComponent, MeuFooterComponent, MeuHeaderComponent, TelaRegistroLoginComponent, OpcoesComponent
  ],
  exports: [
    MenuPrincipalComponent, MeuFooterComponent, MeuHeaderComponent, TelaRegistroLoginComponent, OpcoesComponent
  ],
  entryComponents: [
    OpcoesComponent
  ]
})
export class SharedModule { }
