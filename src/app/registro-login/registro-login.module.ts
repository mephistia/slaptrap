import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroLoginPageRoutingModule } from './registro-login-routing.module';

import { RegistroLoginPage } from './registro-login.page';
import { TelaRegistroLoginComponent } from '../tela-registro-login/tela-registro-login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroLoginPageRoutingModule
  ],
  declarations: [RegistroLoginPage, TelaRegistroLoginComponent]
})
export class RegistroLoginPageModule {}
