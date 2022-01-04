import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityFormModule } from 'app/layouts/modules/entity-form.module';
import { ScheduleFormComponent } from './schedule-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [InputNumberModule, CalendarModule, EntityFormModule, DropdownModule, SharedModule],
  declarations: [ScheduleFormComponent],
  entryComponents: [],
})
export class ScheduleFormModule {}
