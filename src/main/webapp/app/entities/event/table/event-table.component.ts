import { Component, Input } from '@angular/core';
import { IEvent } from '../event.model';

@Component({
  selector: 'jhi-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent {
  @Input() events!: IEvent[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
