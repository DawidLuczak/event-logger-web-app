import { NgModule } from '@angular/core';
import { DialogActionButtonsModule } from '../dialog-action-buttons/dialog-action-buttons.module';
import { InputFloatLabelModule } from '../input-float-label/input-float-label.module';
import { TextareaFloatLabelModule } from '../textarea-float-label/textarea-float-label.module';

@NgModule({
  imports: [InputFloatLabelModule, TextareaFloatLabelModule, DialogActionButtonsModule],
  exports: [InputFloatLabelModule, TextareaFloatLabelModule, DialogActionButtonsModule],
})
export class EntityFormModule {}
