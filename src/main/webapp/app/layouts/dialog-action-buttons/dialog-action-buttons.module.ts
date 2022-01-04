import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogActionButtonsComponent } from './dialog-action-buttons.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [ButtonModule, CommonModule],
  declarations: [DialogActionButtonsComponent],
  exports: [DialogActionButtonsComponent],
})
export class DialogActionButtonsModule {}
