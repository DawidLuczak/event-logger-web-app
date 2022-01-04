import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'app/core/util/alert.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ISchedule } from 'app/entities/schedule/schedule.model';
import { ScheduleService } from 'app/entities/schedule/service/schedule.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEvent } from '../event.model';
import { Event as ScheduleEvent } from '../event.model';

@Component({
  selector: 'jhi-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() timeOnly: boolean;
  title = '';
  description = '';
  schedules: ISchedule[];
  selectedSchedule!: ISchedule;
  employees: IEmployee[];
  selectedEmployee!: IEmployee;
  types: { value: number }[];
  selectedType!: { value: number } | undefined;
  startDate: any;
  endDate: any;
  pensum = 25;
  invalidStartDays!: any[];
  invalidEndDays: any[];

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private changeDetector: ChangeDetectorRef,
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private alertService: AlertService
  ) {
    this.schedules = [];
    this.employees = [];
    this.types = [{ value: 1 }, { value: 2 }, { value: 3 }];
    this.selectedType = this.types[0];
    this.invalidEndDays = [];
    this.timeOnly = false;
  }

  ngOnInit(): void {
    const event: IEvent | undefined = this.config.data?.event;
    this.loadEntity(event);
    this.scheduleService.query().subscribe(data => {
      this.schedules = data.body!;
      if (event?.schedule) {
        this.selectedSchedule = data.body!.find(schedule => schedule.id === event.schedule!.id)!;
      }
    });
    this.employeeService.query().subscribe(data => {
      this.employees = data.body!.map(employee => {
        employee.fullName = employee.firstName! + ' ' + employee.lastName!;
        return employee;
      });
      if (event?.employee) {
        this.selectedEmployee = data.body!.find(employee => employee.id === event.employee!.id)!;
      }
    });
  }

  loadEntity(object?: IEvent): void {
    if (object) {
      this.title = object.title!;
      this.description = object.description!;
      this.pensum = object.pensum ?? 20;
      this.endDate = new Date(object.endDate!);
      this.startDate = new Date(object.startDate!);
      if (object.type) {
        this.selectedType = this.types.find(type => type.value === object.type)!;
      }
    } else {
      this.startDate = new Date();
      this.endDate = new Date();
      const date = this.config.data?.date;
      if (date) {
        if (date.startHour) {
          this.startDate.setHours(date.startHour.split(':')[0]);
          this.startDate.setMinutes(date.startHour.split(':')[1]);
        }
        if (date.endHour) {
          this.endDate.setHours(date.endHour.split(':')[0]);
          this.endDate.setMinutes(date.endHour.split(':')[1]);
        }
        if (date.timeOnly) {
          this.timeOnly = date.timeOnly;
        }
      }
    }
    this.changeDetector.detectChanges();
  }

  cancel = () => (): void => {
    this.dynamicDialogRef.close(false);
  };

  confirm = () => (): void => {
    if (this.isValid()) {
      const event: IEvent = this.config.data?.event ?? new ScheduleEvent();
      event.title = this.title;
      event.description = this.description;
      event.type = this.selectedType!.value;
      event.startDate = new Date(this.startDate);
      event.endDate = new Date(this.endDate);
      event.schedule = this.selectedSchedule;
      event.pensum = this.pensum;
      event.employee = this.selectedEmployee;
      this.dynamicDialogRef.close(event);
    } else {
      this.alertService.addAlert({
        type: 'danger',
        translationKey: 'Błąd walidacji',
      });
    }
  };

  isValid(): any {
    return this.title.length > 3 && this.selectedType && this.startDate && this.endDate;
  }

  // onStartDatePick(event: any): void {
  //   const date = new Date(this.startDate);
  //   const day = 1000 * 60 * 60 * 24;
  //   for (let i = 0; i > 1; i--) {
  //     const d = new Date(date.getTime() - i * day).getDay();
  //     this.invalidEndDays.push(d);
  //   }
  // }
}
