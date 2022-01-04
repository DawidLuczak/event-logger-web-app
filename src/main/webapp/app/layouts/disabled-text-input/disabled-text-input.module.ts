import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisabledTextInputComponent } from './disabled-text-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'app/shared/shared.module';
import { OutMouseClickDirective } from 'app/core/out-mouse-click/out-mouse-click.directive';

@NgModule({
  imports: [InputTextModule, CommonModule, SharedModule],
  declarations: [DisabledTextInputComponent],
  providers: [OutMouseClickDirective],
  exports: [DisabledTextInputComponent],
})
export class DisabledTextInputModule {}
