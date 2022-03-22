import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTableComponent } from './schedule-table.component';
import { TableModule } from 'primeng/table';
import { ScheduleRoutingModule } from '../route/schedule-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, CommonModule, TableModule, ScheduleRoutingModule],
  declarations: [ScheduleTableComponent],
  exports: [ScheduleTableComponent],
})
export class ScheduleTableModule {}
