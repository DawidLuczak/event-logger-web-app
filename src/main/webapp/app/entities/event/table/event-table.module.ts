import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTableComponent } from './event-table.component';
import { TableModule } from 'primeng/table';
import { EventRoutingModule } from '../route/event-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, CommonModule, TableModule, EventRoutingModule],
  declarations: [EventTableComponent],
  exports: [EventTableComponent],
})
export class EventTableModule {}
