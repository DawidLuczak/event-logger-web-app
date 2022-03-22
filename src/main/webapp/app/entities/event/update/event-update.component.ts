import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import { HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize, map } from 'rxjs/operators';
// import * as dayjs from 'dayjs';
// import { DATE_TIME_FORMAT } from 'app/config/input.constants';
// import { IEvent, Event } from '../event.model';

import { EventService } from '../service/event.service';
import { ISchedule } from 'app/entities/schedule/schedule.model';
import { ScheduleService } from 'app/entities/schedule/service/schedule.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-event-update',
  templateUrl: './event-update.component.html',
})
export class EventUpdateComponent {
  isSaving = false;

  schedulesSharedCollection: ISchedule[] = [];
  employeesSharedCollection: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    type: [null, [Validators.required]],
    salary: [null, [Validators.required]],
    schedule: [],
    employees: [],
  });

  constructor(
    protected eventService: EventService,
    protected scheduleService: ScheduleService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(({ event }) => {
  //     if (event.id === undefined) {
  //       const today = dayjs().startOf('day');
  //       event.startDate = today;
  //       event.endDate = today;
  //     }

  //     this.updateForm(event);

  //     this.loadRelationshipsOptions();
  //   });
  // }

  // previousState(): void {
  //   window.history.back();
  // }

  // save(): void {
  //   this.isSaving = true;
  //   const event = this.createFromForm();
  //   if (event.id !== undefined) {
  //     this.subscribeToSaveResponse(this.eventService.update(event));
  //   } else {
  //     this.subscribeToSaveResponse(this.eventService.create(event));
  //   }
  // }

  // trackScheduleById(index: number, item: ISchedule): number {
  //   return item.id!;
  // }

  // trackEmployeeById(index: number, item: IEmployee): number {
  //   return item.id!;
  // }

  // getSelectedEmployee(option: IEmployee, selectedVals?: IEmployee[]): IEmployee {
  //   if (selectedVals) {
  //     for (const selectedVal of selectedVals) {
  //       if (option.id === selectedVal.id) {
  //         return selectedVal;
  //       }
  //     }
  //   }
  //   return option;
  // }

  // protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
  //   result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  // protected onSaveSuccess(): void {
  //   this.previousState();
  // }

  // protected onSaveError(): void {
  //   // Api for inheritance.
  // }

  // protected onSaveFinalize(): void {
  //   this.isSaving = false;
  // }

  // protected updateForm(event: IEvent): void {
  //   this.editForm.patchValue({
  //     id: event.id,
  //     title: event.title,
  //     description: event.description,
  //     // startDate: event.startDate ? event.startDate.format(DATE_TIME_FORMAT) : null,
  //     // endDate: event.endDate ? event.endDate.format(DATE_TIME_FORMAT) : null,
  //     type: event.type,
  //     salary: event.salary,
  //     schedule: event.schedule,
  //     employees: event.employee,
  //   });

  //   this.schedulesSharedCollection = this.scheduleService.addScheduleToCollectionIfMissing(this.schedulesSharedCollection, event.schedule);
  //   this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing(
  //     this.employeesSharedCollection
  //   );
  // }

  // protected loadRelationshipsOptions(): void {
  //   this.scheduleService
  //     .query()
  //     .pipe(map((res: HttpResponse<ISchedule[]>) => res.body ?? []))
  //     .pipe(
  //       map((schedules: ISchedule[]) =>
  //         this.scheduleService.addScheduleToCollectionIfMissing(schedules, this.editForm.get('schedule')!.value)
  //       )
  //     )
  //     .subscribe((schedules: ISchedule[]) => (this.schedulesSharedCollection = schedules));

  //   this.employeeService
  //     .query()
  //     .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
  //     .pipe(
  //       map((employees: IEmployee[]) =>
  //         this.employeeService.addEmployeeToCollectionIfMissing(employees, ...(this.editForm.get('employees')!.value ?? []))
  //       )
  //     )
  //     .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  // }

  // protected createFromForm(): IEvent {
  //   return {
  //     ...new Event(),
  //     id: this.editForm.get(['id'])!.value,
  //     title: this.editForm.get(['title'])!.value,
  //     description: this.editForm.get(['description'])!.value,
  //     // startDate: this.editForm.get(['startDate'])!.value ? dayjs(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
  //     // endDate: this.editForm.get(['endDate'])!.value ? dayjs(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
  //     type: this.editForm.get(['type'])!.value,
  //     salary: this.editForm.get(['salary'])!.value,
  //     schedule: this.editForm.get(['schedule'])!.value
  //   };
  // }
}
