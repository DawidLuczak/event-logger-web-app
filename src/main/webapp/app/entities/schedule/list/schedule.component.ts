import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';
import { ScheduleFormComponent } from '../forms/form/schedule-form.component';

@Component({
  selector: 'jhi-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  schedules!: ISchedule[];
  isLoading = false;
  isModalDialogOpen: boolean;

  constructor(
    protected scheduleService: ScheduleService,
    protected parseLinks: ParseLinks,
    private changeDetector: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.scheduleService.query().subscribe(data => {
      this.schedules = data.body!;
      this.changeDetector.detectChanges();
    });
  }

  openCreatorDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(ScheduleFormComponent, {
      header: 'Dodaj schedule',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.scheduleService.create(subject.schedule).subscribe(
            res => {
              if (res.body) {
                this.loadAll();
                console.debug(`Schedule created: ${res}`);
                this.isModalDialogOpen = false;
              } else {
                console.debug(`Schedule create: ${res}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            error => {
              console.debug(`Schedule create: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Schedule create: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      error => {
        console.debug(`Schedule create dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  openEditDialog(schedule: ISchedule): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(ScheduleFormComponent, {
      header: 'Edytuj Schedule',
      showHeader: true,
      width: '70%',
      height: '90%',
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
                this.loadAll();
                this.isModalDialogOpen = false;
                console.debug(`Schedule updated: ${res}`);
              } else {
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
                console.debug(`Schedule update:  ${res}`);
              }
            },
            error => {
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
              console.debug(`Schedule update: ${error}`);
            }
          );
        } else {
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
          console.debug(`Schedule update: cancelled`);
        }
      },
      error => {
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
        console.debug(`Schedule update dialog: ${error}`);
      }
    );
  }

  delete(schedule: ISchedule): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Usuń schedule',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        entity: schedule,
        text: ['Czy chcesz usunąć schedule o nazwie:', schedule.title!],
      },
    });
    ref.onClose.subscribe(
      id => {
        if (id) {
          this.scheduleService.delete(id).subscribe(
            () => {
              this.loadAll();
              console.debug(`Schedule deleted: ${id}.`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            },
            error => {
              console.debug(`Schedule delete: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Schedule delete: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      error => {
        console.debug(`Schedule delete dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  trackId(index: number, item: ISchedule): number {
    return item.id!;
  }
}
