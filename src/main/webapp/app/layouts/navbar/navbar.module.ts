import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ClockModule } from '../clock/clock.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [ClockModule, CommonModule, PanelMenuModule],
  exports: [NavbarComponent],
  providers: [DatePipe],
})
export class NavbarModule {}
