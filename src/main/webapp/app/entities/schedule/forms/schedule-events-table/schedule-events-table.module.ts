import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScheduleEventsTableComponent } from './schedule-events-table.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  imports: [TooltipModule, CommonModule, TableModule],
  providers: [DatePipe, DialogService],
  declarations: [ScheduleEventsTableComponent],
  exports: [ScheduleEventsTableComponent],
})
export class ScheduleEventsTableModule {}
