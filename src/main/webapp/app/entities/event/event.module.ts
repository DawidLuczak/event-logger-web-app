import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EventComponent } from './list/event.component';
import { EventDetailComponent } from './detail/event-detail.component';
import { EventUpdateComponent } from './update/event-update.component';
import { EventDeleteDialogComponent } from './delete/event-delete-dialog.component';
import { EventRoutingModule } from './route/event-routing.module';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeService } from '../employee/service/employee.service';
import { ScheduleService } from '../schedule/service/schedule.service';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { EventFormModule } from './form/event-form.module';

@NgModule({
  imports: [AccordionModule, BackdropModule, CalendarModule, SharedModule, EventRoutingModule, DropdownModule, EventFormModule],
  providers: [EmployeeService, ScheduleService],
  declarations: [EventComponent, EventDetailComponent, EventUpdateComponent, EventDeleteDialogComponent],
})
export class EventModule {}
