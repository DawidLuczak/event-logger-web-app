import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeFormComponent } from './employee-form.component';
import { EntityFormModule } from 'app/layouts/modules/entity-form.module';
import { SharedModule } from 'app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [SharedModule, CommonModule, EntityFormModule, DropdownModule, InputNumberModule],
  exports: [],
  providers: [],
})
export class EmployeeFormModule {}
