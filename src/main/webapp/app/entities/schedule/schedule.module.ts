import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ScheduleComponent } from './list/schedule.component';
import { ScheduleDetailComponent } from './detail/schedule-detail.component';
import { ScheduleUpdateComponent } from './update/schedule-update.component';
import { ScheduleDeleteDialogComponent } from './delete/schedule-delete-dialog.component';
import { ScheduleRoutingModule } from './route/schedule-routing.module';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { AccordionModule } from 'primeng/accordion';
import { ScheduleFormModule } from './forms/form/schedule.module';
import { ScheduleEventsTableModule } from './forms/schedule-events-table/schedule-events-table.module';
import { WeekScheduleModule } from './week-schedule/week-schedule.module';
import { EventTableModule } from '../event/table/event-table.module';
import { EmployeeTableModule } from '../employee/table/employee-table.module';

@NgModule({
  imports: [
    AccordionModule,
    BackdropModule,
    ScheduleFormModule,
    SharedModule,
    ScheduleRoutingModule,
    ScheduleEventsTableModule,
    WeekScheduleModule,
    EventTableModule,
    EmployeeTableModule,
  ],
  declarations: [ScheduleComponent, ScheduleDetailComponent, ScheduleUpdateComponent, ScheduleDeleteDialogComponent],
})
export class ScheduleModule {}
