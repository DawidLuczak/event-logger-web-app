import * as dayjs from 'dayjs';
import { ICommunity } from 'app/entities/community/community.model';
import { IEvent } from 'app/entities/event/event.model';
import { ISchedule } from '../schedule/schedule.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  hours?: number | null;
  note?: string | null;
  community?: ICommunity | null;
  events?: IEvent[] | null;
  schedules?: ISchedule[] | null;
  fullName?: string;
  allHours?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string | null,
    public phoneNumber?: string | null,
    public hireDate?: dayjs.Dayjs | null,
    public hours?: number | null,
    public note?: string | null,
    public community?: ICommunity | null,
    public events?: IEvent[] | null,
    public schedules?: ISchedule[] | null
  ) {}
}

export function getEmployeeIdentifier(employee: IEmployee): number | undefined {
  return employee.id;
}
