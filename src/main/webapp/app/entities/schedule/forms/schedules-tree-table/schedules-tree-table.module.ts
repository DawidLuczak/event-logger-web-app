import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesTreeTableComponent } from './schedules-tree-table.component';
import { TreeTableListModule } from 'app/layouts/tree-table-list/tree-table-list.module';

@NgModule({
  imports: [TreeTableListModule, CommonModule],
  declarations: [SchedulesTreeTableComponent],
  exports: [SchedulesTreeTableComponent],
})
export class SchedulesTreeTableModule {}
