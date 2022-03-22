import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { ISchedule, Schedule } from 'app/entities/schedule/schedule.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jhi-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleFormComponent implements OnInit {
  title = '';
  description = '';
  pensum = 25;
  departments!: IDepartment[];
  selectedDepartment!: IDepartment | null;
  calendarRange!: { startDate: Date; endDate: Date };
  showCalendarRange: boolean;

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private changeDetector: ChangeDetectorRef,
    private departmentService: DepartmentService
  ) {
    this.showCalendarRange = false;
  }

  ngOnInit(): void {
    const configData = this.config.data;
    const schedule: ISchedule | undefined = configData?.schedule;
    this.loadEntity(schedule);
    this.loadConfig(configData);
    this.departmentService.query().subscribe(data => {
      this.departments = data.body!;
      if (schedule?.department) {
        this.selectedDepartment = data.body!.find(department => department.id === this.config.data.schedule!.department.id)!;
      }
      this.changeDetector.detectChanges();
    });
  }

  loadEntity(schedule: ISchedule | undefined): void {
    if (schedule) {
      this.title = schedule.title!;
      this.description = schedule.description!;
      this.pensum = schedule.pensum ?? 0;
      this.changeDetector.detectChanges();
    }
  }

  loadConfig(configData: any): void {
    if (configData?.showCalendarRange) {
      this.showCalendarRange = configData.showCalendarRange;
      this.calendarRange = { startDate: new Date(), endDate: new Date() };
    }
  }

  cancel = () => (): void => {
    this.dynamicDialogRef.close(false);
  };

  confirm = () => (): void => {
    if (this.isValid()) {
      const schedule = this.config.data?.schedule ?? new Schedule();
      schedule.title = this.title;
      schedule.description = this.description;
      schedule.department = this.selectedDepartment;
      schedule.pensum = this.pensum;
      const scheduleResponse: { schedule: ISchedule; calendarRange?: any } = { schedule };
      if (this.showCalendarRange) {
        scheduleResponse.calendarRange = this.calendarRange;
      }
      this.dynamicDialogRef.close(scheduleResponse);
    }
  };

  isValid = (): boolean => this.title.length > 3;
}
