import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/entities/schedule/service/schedule.service';
import { PickListInDialogComponent } from 'app/layouts/pick-list-in-dialog/pick-list-in-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ISchedule } from '../../schedule.model';

@Component({
  selector: 'jhi-schedules-pick-list',
  templateUrl: './schedules-pick-list.component.html',
  styleUrls: ['./schedules-pick-list.component.scss'],
})
export class SchedulesPickListComponent extends PickListInDialogComponent implements OnInit {
  availableSchedules: ISchedule[];
  pairedSchedules: ISchedule[];

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private changeDetector: ChangeDetectorRef,
    private scheduleService: ScheduleService
  ) {
    super(dynamicDialogRef, config);
    this.availableSchedules = [];
    this.pairedSchedules = [];
  }

  ngOnInit(): void {
    if (this.config.data.schedules) {
      this.pairedSchedules = this.config.data?.schedules;
    }
    this.scheduleService
      .query({
        params: {
          page: 0,
          itemsPerPage: 5,
          totalItems: 5,
        },
      })
      .subscribe(response => {
        if (response.body) {
          this.availableSchedules = response.body.filter(schedule => !schedule.department?.id);
        }
      });
  }
}
