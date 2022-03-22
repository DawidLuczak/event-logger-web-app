import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Department, IDepartment } from '../department.model';

@Component({
  selector: 'jhi-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentFormComponent implements OnInit {
  title = '';
  description = '';

  constructor(public dynamicDialogRef: DynamicDialogRef, public config: DynamicDialogConfig, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.config.data?.department !== undefined) {
      const department: IDepartment = this.config.data.department;
      this.title = department.title!;
      this.description = department.description ?? '';
      this.changeDetector.detectChanges();
    }
  }

  cancel = () => (): void => {
    this.dynamicDialogRef.close(false);
  };

  confirm = () => (): void => {
    if (this.isValid()) {
      const department = this.config.data?.department ?? new Department();
      department.title = this.title;
      department.description = this.description;
      this.dynamicDialogRef.close(department);
    }
  };

  isValid = (): boolean => this.title.length > 3;
}
