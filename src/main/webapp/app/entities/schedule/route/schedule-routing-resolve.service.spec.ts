jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISchedule, Schedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

import { ScheduleRoutingResolveService } from './schedule-routing-resolve.service';

describe('Schedule routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ScheduleRoutingResolveService;
  let service: ScheduleService;
  let resultSchedule: ISchedule | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ScheduleRoutingResolveService);
    service = TestBed.inject(ScheduleService);
    resultSchedule = undefined;
  });

  describe('resolve', () => {
    it('should return ISchedule returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSchedule = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSchedule).toEqual({ id: 123 });
    });

    it('should return new ISchedule if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSchedule = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSchedule).toEqual(new Schedule());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Schedule })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSchedule = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSchedule).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
