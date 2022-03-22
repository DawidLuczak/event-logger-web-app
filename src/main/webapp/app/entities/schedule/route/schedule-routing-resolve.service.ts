import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISchedule, Schedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

@Injectable({ providedIn: 'root' })
export class ScheduleRoutingResolveService implements Resolve<ISchedule> {
  constructor(protected service: ScheduleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISchedule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((schedule: HttpResponse<Schedule>) => {
          if (schedule.body) {
            return of(schedule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Schedule());
  }
}
