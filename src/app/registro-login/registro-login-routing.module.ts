import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroLoginPage } from './registro-login.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroLoginPageRoutingModule {}
