import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'app/entities/event/event.model';
import { DateCapsule } from 'app/shared/models/date-capsule.model';
import { ISchedule } from '../../schedule.model';
import { DatePipe } from '@angular/common';
import { IEmployee } from 'app/entities/employee/employee.model';
import { DialogService } from 'primeng/dynamicdialog';
import { EventService } from 'app/entities/event/service/event.service';
import { EventFormComponent } from 'app/entities/event/form/event-form.component';

@Component({
  selector: 'jhi-schedule-events-table',
  templateUrl: './schedule-events-table.component.html',
  styleUrls: ['./schedule-events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleEventsTableComponent implements OnInit {
  @Input() schedule!: ISchedule;
  @Input() horizontalCols!: any[];
  @Input() verticalCols!: any[];
  @Input() backdropEvent!: (bool: boolean) => void;

  constructor(
    private datePipe: DatePipe,
    private changeDetector: ChangeDetectorRef,
    private dialogService: DialogService,
    private eventService: EventService
  ) {
    this.verticalCols = [
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
  }

  ngOnInit(): void {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    this.horizontalCols = [];
    let totalOffset = 68;
    for (let i = 0; i < 7; i++) {
      const employees: any[] = [];
      let columnWidth = 0;
      this.schedule.events?.forEach(event => {
        const eventDate = new Date(event.startDate!);
        if (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        ) {
          const index = employees.findIndex((object: any) => object.employee.id === event.employee!.id);
          if (index !== -1) {
            employees[index].events.push(event);
          } else {
            const object = {
              employee: event.employee,
              events: [event],
              offsetLeft: totalOffset,
            };
            employees.push(object);
            columnWidth += 61;
            totalOffset += 61;
          }
        }
      });
      if (employees.length === 0) {
        totalOffset += 86;
      }
      const dateCapsule: DateCapsule = {
        date: new Date(date),
        objects: employees,
        columnWidth,
      };
      this.horizontalCols.push(dateCapsule);
      date.setDate(date.getDate() + 1);
    }
    this.changeDetector.detectChanges();
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

  openEditDialog(event: IEvent): void {
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
    this.backdropEvent(true);
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.eventService.update(subject).subscribe(
            res => {
              if (res.body) {
                console.debug(`Event updated: ${res}`);
                this.backdropEvent(false);
                this.changeDetector.detectChanges();
              } else {
                console.debug(`Event update: failed`);
                this.backdropEvent(false);
              }
            },
            () => {
              console.debug(`Event update: error`);
              this.backdropEvent(false);
            }
          );
        } else {
          console.debug(`Event update: canceled`);
          this.backdropEvent(false);
        }
      },
      () => {
        console.debug(`Event update dialog: error`);
        this.backdropEvent(false);
      }
    );
  }
}
