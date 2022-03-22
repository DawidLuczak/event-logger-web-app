import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFloatLabelComponent } from './textarea-float-label.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TextareaFloatLabelComponent],
  exports: [TextareaFloatLabelComponent],
})
export class TextareaFloatLabelModule {}
