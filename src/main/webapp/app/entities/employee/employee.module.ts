import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeComponent } from './list/employee.component';
import { EmployeeDetailComponent } from './detail/employee-detail.component';
import { EmployeeUpdateComponent } from './update/employee-update.component';
import { EmployeeDeleteDialogComponent } from './delete/employee-delete-dialog.component';
import { EmployeeRoutingModule } from './route/employee-routing.module';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { AccordionModule } from 'primeng/accordion';
import { EmployeeFormModule } from './form/employee-form.module';
import { EventTableModule } from '../event/table/event-table.module';
import { ScheduleTableModule } from '../schedule/table/schedule-table.module';

@NgModule({
  imports: [
    EmployeeFormModule,
    AccordionModule,
    SharedModule,
    EmployeeRoutingModule,
    BackdropModule,
    EventTableModule,
    ScheduleTableModule,
  ],
  declarations: [EmployeeComponent, EmployeeDetailComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  entryComponents: [EmployeeDeleteDialogComponent],
})
export class EmployeeModule {}
