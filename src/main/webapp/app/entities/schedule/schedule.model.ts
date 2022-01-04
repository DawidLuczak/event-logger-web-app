import { IDepartment } from 'app/entities/department/department.model';
import { IEvent } from 'app/entities/event/event.model';
import { IEmployee } from '../employee/employee.model';

export interface ISchedule {
  id?: number;
  title?: string;
  description?: string | null;
  pensum?: number;
  department?: IDepartment | null;
  events?: IEvent[] | null;
  employees?: IEmployee[] | null;
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public pensum?: number,
    public department?: IDepartment | null,
    public events?: IEvent[] | null,
    public employees?: IEmployee[] | null
  ) {}
}

export function getScheduleIdentifier(schedule: ISchedule): number | undefined {
  return schedule.id;
}
