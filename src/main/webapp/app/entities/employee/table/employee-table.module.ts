import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeRoutingModule } from '../route/employee-routing.module';

@NgModule({
  imports: [TableModule, CommonModule, SharedModule, EmployeeRoutingModule],
  declarations: [EmployeeTableComponent],
  exports: [EmployeeTableComponent],
})
export class EmployeeTableModule {}
