import { IEmployee } from 'app/entities/employee/employee.model';

export interface ICommunity {
  id?: number;
  title?: string;
  description?: string | null;
  employees?: IEmployee[] | null;
}

export class Community implements ICommunity {
  constructor(public id?: number, public title?: string, public description?: string | null, public employees?: IEmployee[] | null) {}
}

export function getCommunityIdentifier(community: ICommunity): number | undefined {
  return community.id;
}
