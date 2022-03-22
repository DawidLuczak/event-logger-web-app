import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISchedule, getScheduleIdentifier } from '../schedule.model';
import { IDepartment } from 'app/entities/department/department.model';

export type EntityResponseType = HttpResponse<ISchedule>;
export type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  schedules = new BehaviorSubject<ISchedule[]>([]);
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/schedules');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  loadIfSchedulesEmpty(): void {
    if (this.schedules.getValue().length < 1) {
      this.loadSchedules();
    }
  }

  create(schedule: ISchedule): Observable<EntityResponseType> {
    return this.http.post<ISchedule>(this.resourceUrl, schedule, { observe: 'response' });
  }

  update(schedule: ISchedule): Observable<EntityResponseType> {
    return this.http.put<ISchedule>(`${this.resourceUrl}/${getScheduleIdentifier(schedule) as number}`, schedule, { observe: 'response' });
  }

  partialUpdate(schedule: ISchedule): Observable<EntityResponseType> {
    return this.http.patch<ISchedule>(`${this.resourceUrl}/${getScheduleIdentifier(schedule) as number}`, schedule, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByDepartment(departmentId: number, options: any): Observable<EntityArrayResponseType> {
    return this.http.get<ISchedule[]>(`${this.resourceUrl}/department/${departmentId}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addScheduleToCollectionIfMissing(scheduleCollection: ISchedule[], ...schedulesToCheck: (ISchedule | null | undefined)[]): ISchedule[] {
    const schedules: ISchedule[] = schedulesToCheck.filter(isPresent);
    if (schedules.length > 0) {
      const scheduleCollectionIdentifiers = scheduleCollection.map(scheduleItem => getScheduleIdentifier(scheduleItem)!);
      const schedulesToAdd = schedules.filter(scheduleItem => {
        const scheduleIdentifier = getScheduleIdentifier(scheduleItem);
        if (scheduleIdentifier == null || scheduleCollectionIdentifiers.includes(scheduleIdentifier)) {
          return false;
        }
        scheduleCollectionIdentifiers.push(scheduleIdentifier);
        return true;
      });
      return [...schedulesToAdd, ...scheduleCollection];
    }
    return scheduleCollection;
  }

  updateDepartmentInEachSchedule = async (schedules: ISchedule[], department: IDepartment): Promise<any> =>
    await new Promise(resolve => {
      schedules.forEach(schedule => {
        schedule.department = department;
        this.update(schedule).subscribe(response => console.debug(`Updated schedule: ${response}`));
      });
      resolve(schedules);
    });

  private loadSchedules(): void {
    this.query().subscribe(res => {
      if (res.body) {
        this.schedules.next(res.body);
      }
    });
  }
}
