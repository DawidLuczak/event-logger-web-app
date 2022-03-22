import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesPickListComponent } from './schedules-pick-list.component';
import { PickListInDialogModule } from 'app/layouts/pick-list-in-dialog/pick-list-in-dialog.module';

@NgModule({
  imports: [PickListInDialogModule, CommonModule],
  declarations: [SchedulesPickListComponent],
  exports: [SchedulesPickListComponent],
})
export class SchedulesPickListModule {}
