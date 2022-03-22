import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EventCopyConstructor, IEvent } from 'app/entities/event/event.model';
import { EventFormComponent } from 'app/entities/event/form/event-form.component';
import { DisabledTextInputComponent } from 'app/layouts/disabled-text-input/disabled-text-input.component';
import { getNumberOfDaysInMonth, weekDays } from 'app/shared/models/date-pattern.model';
import { IScheduleColumn, ScheduleColumn } from 'app/shared/models/schedule-column.model';
import { DialogService } from 'primeng/dynamicdialog';
import { ScheduleFormComponent } from '../forms/form/schedule-form.component';
import { ISchedule, Schedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';
import { Subscription, fromEvent, merge } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
  schedule!: ISchedule;
  horizontalCols!: IScheduleColumn[];
  verticalCols!: any[];
  showBackdrop = false;
  selectedIndexes!: { dayIndex: number; startHourIndex: number; endHourIndex: number } | undefined;
  fontSize = 12;
  employees: IEmployee[] = [];
  selectedEvent!: IEvent | undefined;
  showActionButtons = true;
  employeeListVisible = false;
  subscriptions$: Subscription[] = [];
  tableWidth = 0;

  @ViewChild('scheduleTable') scheduleTable!: Table;
  @ViewChild('captionInput', { static: true }) captionInput!: DisabledTextInputComponent;

  constructor(
    private datePipe: DatePipe,
    private changeDetector: ChangeDetectorRef,
    private dialogService: DialogService,
    private scheduleService: ScheduleService
  ) {}

  resizeTableColumn(event: any): void {
    const dayColumnIndex: number = event.element.cellIndex - 1;
    this.horizontalCols[dayColumnIndex].columnWidth += event.delta;
    for (let i = dayColumnIndex + 1; i < this.horizontalCols.length; i++) {
      this.horizontalCols[i].objects.forEach((employeeColumn: IScheduleColumn) => {
        employeeColumn.columnOffsetLeft += event.delta;
      });
    }
    this.changeDetector.detectChanges();
  }

  resize(event: any, column: IScheduleColumn): void {
    column.columnWidth = event.newRect.width;
    if (!event.isFirst) {
      const deltaWidth = event.newRect.width - event.oldRect.width;
      const columnIndex = this.horizontalCols.findIndex(col => col.data === column.data);
      for (let i = columnIndex + 1; i < this.horizontalCols.length; i++) {
        this.horizontalCols[i].objects.forEach((employeeColumn: IScheduleColumn) => {
          employeeColumn.columnOffsetLeft += deltaWidth;
        });
      }
    }

    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.prepareScheduleEmptyPattern();
  }

  ngAfterViewInit(): void {
    this.configComponent();
  }

  prepareScheduleEmptyPattern(): void {
    this.schedule = new Schedule();
    this.verticalCols = [
      '6:00',
      '6:15',
      '6:30',
      '6:45',
      '7:00',
      '7:15',
      '7:30',
      '7:45',
      '8:00',
      '8:15',
      '8:30',
      '8:45',
      '9:00',
      '9:15',
      '9:30',
      '9:45',
      '10:00',
      '10:15',
      '10:30',
      '10:45',
      '11:00',
      '11:15',
      '11:30',
      '11:45',
      '12:00',
      '12:15',
      '12:30',
      '12:45',
      '13:00',
      '13:15',
      '13:30',
      '13:45',
      '14:00',
      '14:15',
      '14:30',
      '14:45',
      '15:00',
      '15:15',
      '15:30',
      '15:45',
      '16:00',
      '16:15',
      '16:30',
      '16:45',
      '17:00',
    ];
    this.horizontalCols = [];
    for (let i = 0; i < 7; i++) {
      const scheduleColumn = new ScheduleColumn(weekDays[i], [], 0, 0);
      this.horizontalCols.push(scheduleColumn);
    }
    this.changeDetector.detectChanges();
  }

  configComponent(): void {
    // const mouseEvents = ['mousedown', 'mousemove', 'mouseup'];
    // const eventStreams = mouseEvents.map((event) => fromEvent(this.scheduleTable.el.nativeElement, event));
    // const tableMouseEvents$ = merge(...eventStreams);
    // this.subscriptions$.push(tableMouseEvents$.subscribe(event => {
    //   console.log(event);
    // }));
  }

  isEventAtTime(event: IEvent, time: string): boolean {
    const startDate = new Date(event.startDate!);
    const endDate = new Date(event.endDate!);
    return (
      ((startDate.getHours() === parseInt(time.split(':')[0], 10) && startDate.getMinutes() <= parseInt(time.split(':')[1], 10)) ||
        startDate.getHours() < parseInt(time.split(':')[0], 10)) &&
      (endDate.getHours() > parseInt(time.split(':')[0], 10) ||
        (endDate.getHours() === parseInt(time.split(':')[0], 10) && endDate.getMinutes() > parseInt(time.split(':')[1], 10)))
    );
  }

  showEventTooltip(event: IEvent): string {
    return (
      event.title! +
      '\n' +
      event.employee!.firstName! +
      ' ' +
      event.employee!.lastName! +
      '\n' +
      this.datePipe.transform(event.startDate!, 'short')! +
      '\n' +
      this.datePipe.transform(event.endDate!, 'short')!
    );
  }

  showEmployeeTooltip(employee: IEmployee): string {
    return employee.firstName! + ' ' + employee.lastName!;
  }

  selectEvent(event: IEvent | undefined): void {
    setTimeout(() => {
      this.selectedEvent = event;
    }, 1000);
  }

  unselectEvent(): void {
    if (this.selectedEvent) {
      this.selectedEvent = undefined;
    }
  }

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  setBackdrop(bool: boolean): void {
    this.showBackdrop = bool;
    this.changeDetector.detectChanges();
  }

  checkSelectedCells(dayIndex: number, hourIndex: number): boolean {
    return this.selectedIndexes &&
      this.selectedIndexes.dayIndex === dayIndex &&
      this.selectedIndexes.startHourIndex <= hourIndex &&
      this.selectedIndexes.endHourIndex > hourIndex
      ? true
      : false;
  }

  selectOneScheduleSquare($event: any, dayIndex: number, startHourIndex: number): void {
    this.selectedIndexes = { dayIndex, startHourIndex, endHourIndex: startHourIndex + 1 };
    this.changeDetector.detectChanges();
  }

  selectEndTimeSquare($event: any, dayIndex: number, startHourIndex: number, endHourIndex: number): void {
    if (this.selectedIndexes) {
      this.selectedIndexes.endHourIndex = endHourIndex;
    } else {
      this.selectedIndexes = { dayIndex, startHourIndex, endHourIndex };
    }
  }

  setAndReturnNewEvent(patternEvent: IEvent, date: Date): IEvent {
    const newEvent = new EventCopyConstructor(patternEvent);
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + 1);
    startDate.setHours(patternEvent.startDate!.getHours());
    startDate.setMinutes(patternEvent.startDate!.getMinutes());
    const endDate = new Date(startDate);
    endDate.setHours(patternEvent.endDate!.getHours());
    endDate.setMinutes(patternEvent.endDate!.getMinutes());
    newEvent.startDate = startDate;
    newEvent.endDate = endDate;
    return newEvent;
  }

  setScheduleTitle(text: string): void {
    this.schedule.title = text;
  }

  updateEventInSchedulePattern(event: IEvent, eventIndex: number, employeeIndex: number): void {
    this.removeEventFromSchedulePattern(eventIndex, employeeIndex, event.employee!.id!);
    if (event.employee!.id) {
      this.addEventToSchedulePattern(event, employeeIndex);
    }
  }

  removeEventFromSchedulePattern(eventIndex: number, employeeIndex: number, employeeId: number): void {
    if (employeeIndex > -1 && this.horizontalCols[this.selectedIndexes!.dayIndex].objects.length > employeeIndex) {
      this.horizontalCols[this.selectedIndexes!.dayIndex].objects[employeeIndex].objects.splice(eventIndex, 1);
      if (this.horizontalCols[this.selectedIndexes!.dayIndex].objects[employeeIndex].objects.length === 0) {
        this.horizontalCols[this.selectedIndexes!.dayIndex].objects.splice(employeeIndex, 1);
        if (this.isEmployeeInSchedule(employeeId)) {
          this.removeEmployeeFromSchedule(employeeId);
        }
      }
    }
  }

  isEmployeeInSchedule(employeeId: number): boolean {
    let employeeIndexInOtherDays = -1;
    for (let i = 0; i < this.horizontalCols.length; i++) {
      employeeIndexInOtherDays = this.horizontalCols[i].objects.findIndex((employee: IScheduleColumn) => employee.data.id === employeeId);
      if (employeeIndexInOtherDays > -1) {
        return true;
      }
    }
    return false;
  }

  addEventToSchedulePattern(event: IEvent, employeeIndex: number): void {
    if (employeeIndex > -1 && employeeIndex < this.horizontalCols[this.selectedIndexes!.dayIndex].objects.length) {
      this.addNextEventToExistingEmployeeColumn(event, employeeIndex);
    } else {
      this.addEmployeeColumnToSchedulePatternFromEvent(event);
      this.addEmployeeToSchedule(event);
    }
  }

  addNextEventToExistingEmployeeColumn(event: IEvent, employeeIndex: number): void {
    this.horizontalCols[this.selectedIndexes!.dayIndex].objects[employeeIndex].objects.push(event);
  }

  addEmployeeColumnToSchedulePatternFromEvent(event: IEvent): void {
    let employeeColumnOffsetLeft = 102;
    let minDayColumnWidth = 0;
    for (let i = 0; i < this.selectedIndexes!.dayIndex; i++) {
      employeeColumnOffsetLeft += this.horizontalCols[i].columnWidth + 4;
    }
    this.horizontalCols[this.selectedIndexes!.dayIndex].objects.forEach((employeeColumn: IScheduleColumn) => {
      employeeColumnOffsetLeft += employeeColumn.columnWidth;
      minDayColumnWidth += employeeColumn.columnWidth;
    });
    const employeeColumn = new ScheduleColumn(event.employee, [event], 100, employeeColumnOffsetLeft);
    this.horizontalCols[this.selectedIndexes!.dayIndex].objects.push(employeeColumn);
    if (this.horizontalCols[this.selectedIndexes!.dayIndex].columnWidth < minDayColumnWidth) {
      this.horizontalCols[this.selectedIndexes!.dayIndex].columnWidth = minDayColumnWidth;
    }
  }

  addEmployeeToSchedule(event: IEvent): void {
    if (this.employees.findIndex(employee => employee.id === event.employee!.id) < 0) {
      this.employees.push(event.employee!);
    }
  }

  removeEmployeeFromSchedule(employeeId: number): void {
    const employeeIndex = this.employees.findIndex(employee => employee.id === employeeId);
    if (employeeIndex > -1) {
      this.employees.splice(employeeIndex, 1);
    }
  }

  findEmployeeIndexInColumn(employeeId: number, dayIndex: number): any {
    return this.horizontalCols[dayIndex].objects.findIndex((object: { data: { id: any } }) => object.data.id === employeeId);
  }

  createScheduleFromPattern(subject: any): void {
    const schedule: ISchedule = subject.schedule;
    if (!schedule.events) {
      schedule.events = [];
    }
    const date = new Date(subject.calendarRange.startDate);
    const endDate = new Date(subject.calendarRange.endDate);
    while (endDate.getFullYear() >= date.getFullYear()) {
      let endMonth = endDate.getMonth();
      if (endDate.getFullYear() > date.getFullYear()) {
        endMonth = 11;
      }
      while (date.getMonth() < endMonth) {
        while (date.getDate() < getNumberOfDaysInMonth(date.getFullYear())[date.getMonth()]) {
          this.horizontalCols[date.getDay()].objects.forEach((employee: { objects: any[] }) => {
            employee.objects.forEach((scheduleEvent: any) => {
              const newEvent = this.setAndReturnNewEvent(scheduleEvent, date);
              schedule.events!.push(newEvent);
            });
          });
          date.setDate(date.getDate() + 1);
        }
        date.setMonth(date.getMonth() + 1);
        date.setDate(1);
      }
      let endDay;
      if (endDate.getFullYear() !== date.getFullYear() || endDate.getMonth() !== date.getMonth()) {
        endDay = getNumberOfDaysInMonth(date.getFullYear())[date.getMonth()];
      } else {
        endDay = endDate.getDate();
      }
      while (date.getDate() < endDay) {
        this.horizontalCols[date.getDay()].objects.forEach((employee: { objects: any[] }) => {
          employee.objects.forEach((scheduleEvent: any) => {
            const newEvent = this.setAndReturnNewEvent(scheduleEvent, date);
            schedule.events!.push(newEvent);
          });
        });
        date.setDate(date.getDate() + 1);
      }
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(0);
      date.setDate(1);
    }
    schedule.employees = [];
    this.employees.forEach(employee => schedule.employees!.push(employee));

    this.scheduleService.create(subject.schedule).subscribe(
      res => {
        if (res.body) {
          console.debug(`Schedule created: ${res}`);
          this.setBackdrop(false);
        } else {
          console.debug(`Schedule create: ${res}`);
          this.setBackdrop(false);
        }
      },
      error => {
        console.debug(`Schedule create: ${error}`);
        this.setBackdrop(false);
      }
    );
  }

  openScheduleCreatorDialog(): void {
    this.setBackdrop(true);
    const ref = this.dialogService.open(ScheduleFormComponent, {
      header: 'Dodaj schedule',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        showCalendarRange: true,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.createScheduleFromPattern(subject);
        } else {
          console.debug(`Schedule create: canceled`);
          this.setBackdrop(false);
        }
      },
      error => {
        console.debug(`Schedule create dialog: ${error}`);
        this.setBackdrop(false);
      }
    );
  }

  openEditDialog(event: IEvent, employeeIndex: number, eventIndex: number): void {
    const ref = this.dialogService.open(EventFormComponent, {
      header: 'Edytuj event',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        event,
      },
    });
    const tempEmployeeId = event.employee!.id;
    this.setBackdrop(true);
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          if (tempEmployeeId && tempEmployeeId !== subject.employee.id) {
            this.updateEventInSchedulePattern(subject, eventIndex, employeeIndex);
          }
          console.debug(`Event in Schedule creator edited: ${subject.title}`);
          this.setBackdrop(false);
        } else {
          console.debug(`Event update: canceled`);
          this.setBackdrop(false);
        }
      },
      error => {
        console.debug(`Event update dialog: ${error}`);
        this.setBackdrop(false);
      }
    );
  }

  openCreatorDialog(): void {
    const ref = this.dialogService.open(EventFormComponent, {
      header: 'Dodaj event',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        date: {
          startHour: this.verticalCols[this.selectedIndexes!.startHourIndex],
          endHour: this.verticalCols[this.selectedIndexes!.endHourIndex],
          timeOnly: true,
        },
      },
    });
    this.setBackdrop(true);
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          const employeeIndex = this.findEmployeeIndexInColumn(subject, this.selectedIndexes!.dayIndex);
          this.addEventToSchedulePattern(subject, employeeIndex);
          console.debug(`Event added to schedule pattern.`);
          this.setBackdrop(false);
        } else {
          console.debug(`Event create: canceled`);
          this.setBackdrop(false);
        }
      },
      error => {
        console.debug(`Event create dialog: ${error}`);
        this.setBackdrop(false);
      }
    );
  }
}
