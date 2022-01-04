import { ISchedule } from 'app/entities/schedule/schedule.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IEvent {
  id?: number;
  title?: string;
  description?: string | null;
  startDate?: Date;
  endDate?: Date;
  type?: number;
  pensum?: number;
  schedule?: ISchedule | null;
  employee?: IEmployee | null;
}

export class Event implements IEvent {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public startDate?: Date,
    public endDate?: Date,
    public type?: number,
    public pensum?: number,
    public schedule?: ISchedule | null,
    public employee?: IEmployee | null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.pensum = pensum;
    this.schedule = schedule;
    this.employee = employee;
  }
}

export class EventCopyConstructor implements IEvent {
  id?: number;
  title: string | undefined;
  description: any;
  startDate: any;
  endDate: any;
  type: any;
  pensum: any;
  schedule: any;
  employee: any;
  constructor(event: IEvent) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.type = event.type;
    this.pensum = event.pensum;
    this.schedule = event.schedule;
    this.employee = event.employee;
  }
}

export function getEventIdentifier(event: IEvent): number | undefined {
  return event.id;
}
