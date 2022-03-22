import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISchedule } from '../schedule.model';

@Component({
  selector: 'jhi-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTableComponent {
  @Input() schedules!: ISchedule[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
