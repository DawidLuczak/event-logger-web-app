import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { EntityFormModule } from 'app/layouts/modules/entity-form.module';
import { SharedModule } from 'app/shared/shared.module';
import { EventFormComponent } from './event-form.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [EventFormComponent],
  imports: [CalendarModule, SharedModule, CommonModule, EntityFormModule, DropdownModule],
  exports: [],
  providers: [],
})
export class EventFormModule {}
