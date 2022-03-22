import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { Employee } from '../employee.model';
import { EmployeeFormComponent } from '../form/employee-form.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'jhi-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee!: Employee;
  isModalDialogOpen: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService
  ) {
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
  }

  previousState(): void {
    window.history.back();
  }

  openEditDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EmployeeFormComponent, {
      header: 'Edytuj employee',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        employee: this.employee,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.employeeService.update(subject).subscribe(
            res => {
              if (res.body) {
                const index = this.employeeService.employees.getValue().findIndex(object => object.id === res.body!.id);
                this.employeeService.employees.getValue()[index] = res.body;

                console.debug(`Employee updated: ${res.body}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug(`Employee update: failed`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug('Employee update: error');
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug('Employee update: cancelled');
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug('Employee update: error');
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }
}
