import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickListInDialogComponent } from './pick-list-in-dialog.component';
import { CustomPickListModule } from '../custom-pick-list/custom-pick-list.module';
import { DialogActionButtonsModule } from '../dialog-action-buttons/dialog-action-buttons.module';

@NgModule({
  imports: [CustomPickListModule, DialogActionButtonsModule, CommonModule],
  declarations: [PickListInDialogComponent],
  exports: [PickListInDialogComponent],
})
export class PickListInDialogModule {}
