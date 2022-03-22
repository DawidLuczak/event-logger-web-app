import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ScheduleFormComponent } from '../forms/form/schedule-form.component';

import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'jhi-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDetailComponent implements OnInit {
  schedule: ISchedule | null = null;
  isModalDialogOpen: boolean;
  accordionState = [true, false, false, false];

  constructor(
    protected activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private scheduleService: ScheduleService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.schedule = schedule;
    });
  }

  previousState(): void {
    window.history.back();
  }

  openEditDialog(schedule: ISchedule): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(ScheduleFormComponent, {
      header: 'Edytuj Schedule',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        schedule,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.scheduleService.update(subject.schedule).subscribe(
            res => {
              if (res.body) {
                const index = this.scheduleService.schedules.getValue().findIndex(entity => entity.id === res.body!.id);
                this.scheduleService.schedules.getValue()[index] = res.body;
                console.debug(`Schedule updated: ${res}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug(`Schedule update: ${res}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            error => {
              console.debug(`Schedule update: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Schedule update: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      error => {
        console.debug(`Schedule update dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  changeBackdropEvent = (bool: boolean): void => {
    this.isModalDialogOpen = bool;
    this.changeDetector.detectChanges();
  };
}
