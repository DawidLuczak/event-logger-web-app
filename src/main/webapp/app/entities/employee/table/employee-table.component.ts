import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEmployee } from '../employee.model';

@Component({
  selector: 'jhi-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent {
  @Input() employees!: IEmployee[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
