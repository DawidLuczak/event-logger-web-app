import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityFormModule } from 'app/layouts/modules/entity-form.module';
import { DepartmentFormComponent } from './department-form.component';

@NgModule({
  declarations: [DepartmentFormComponent],
  imports: [CommonModule, EntityFormModule],
  exports: [],
  providers: [],
})
export class DepartmentFormModule {}
