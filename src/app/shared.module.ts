import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { MeuHeaderComponent } from 'src/app/meu-header/meu-header.component';
import { JogoComponent } from 'src/app/jogo/jogo.component';
import { MenuPrincipalComponent } from 'src/app/menu-principal/menu-principal.component';
import { MeuFooterComponent } from 'src/app/meu-footer/meu-footer.component';

@NgModule({
    imports: [
      CommonModule,
      IonicModule
    ],
    declarations: [
      MeuHeaderComponent, MeuFooterComponent, JogoComponent, MenuPrincipalComponent
    ],
    exports: [
      MeuHeaderComponent, MeuFooterComponent, JogoComponent, MenuPrincipalComponent
    ]
  })
  
  export class SharedModule {}