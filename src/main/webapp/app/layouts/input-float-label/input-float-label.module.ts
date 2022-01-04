import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFloatLabelComponent } from './input-float-label.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputFloatLabelComponent],
  exports: [InputFloatLabelComponent],
})
export class InputFloatLabelModule {}
