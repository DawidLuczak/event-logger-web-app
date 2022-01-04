import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartment } from '../department.model';
import { TreeNode } from 'app/shared/models/tree-node.model';
import { ScheduleService } from 'app/entities/schedule/service/schedule.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SchedulesPickListComponent } from 'app/entities/schedule/forms/schedules-pick-list/schedules-pick-list.component';
import { ISchedule } from 'app/entities/schedule/schedule.model';
import { DepartmentFormComponent } from '../forms/department-form.component';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'jhi-department-detail',
  templateUrl: './department-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentDetailComponent implements OnInit {
  department!: IDepartment;
  schedules: TreeNode[];
  isModalDialogOpen: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private dialogService: DialogService,
    private departmentService: DepartmentService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.schedules = [];
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
    this.loadSchedules();
  }

  previousState(): void {
    window.history.back();
  }

  loadSchedules(): void {
    this.schedules = this.department.schedules!.map(schedule => {
      const scheduleNode = new TreeNode(schedule);
      scheduleNode.children = [];
      schedule.events!.forEach(event => scheduleNode.children?.push(new TreeNode(event)));
      return scheduleNode;
    });
  }

  openScheduleConnector(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(SchedulesPickListComponent, {
      header: 'Przyłącz plany do departamentu',
      showHeader: true,
      width: '70%',
      modal: true,
      closable: false,
      data: {
        schedules: this.department.schedules,
        departmentId: this.department.id,
      },
    });

    ref.onClose.subscribe((result: ISchedule[]) => {
      async (): Promise<void> => {
        if (result.length > 0) {
          await new Promise(resolve => {
            result.forEach(schedule => {
              schedule.department = this.department;
              this.scheduleService.update(schedule).subscribe(response => console.debug(`Updated schedule: ${response}`));
            });
            resolve(result);
          }).finally(() => this.loadSchedules());
        }
      };
      this.isModalDialogOpen = false;
      this.changeDetector.detectChanges();
    });
  }

  openEditDialog(department: IDepartment): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DepartmentFormComponent, {
      header: 'Edytuj department',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        department,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.departmentService.update(subject).subscribe(
            res => {
              if (res.body) {
                console.debug(`Updated department: ${res.body}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug('Updated create: failed');
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug('Department create: error');
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug('Updated create: canceled');
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug('Department create dialog: error');
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }
}
