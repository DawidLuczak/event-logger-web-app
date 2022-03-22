import { ISchedule } from 'app/entities/schedule/schedule.model';

export interface IDepartment {
  id?: number;
  title?: string;
  description?: string | null;
  schedules?: ISchedule[] | null;
}

export class Department implements IDepartment {
  constructor(public id?: number, public title?: string, public description?: string | null, public schedules?: ISchedule[] | null) {}
}

export function getDepartmentIdentifier(department: IDepartment): number | undefined {
  return department.id;
}
