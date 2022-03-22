import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [PasswordModule, SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
