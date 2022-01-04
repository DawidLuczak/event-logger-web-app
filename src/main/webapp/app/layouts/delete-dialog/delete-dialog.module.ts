import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  imports: [DynamicDialogModule, ButtonModule, CommonModule],
  declarations: [DeleteDialogComponent],
  providers: [DialogService],
  exports: [DeleteDialogComponent],
})
export class DeleteDialogModule {}
