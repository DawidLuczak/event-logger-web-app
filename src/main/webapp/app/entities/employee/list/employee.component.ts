import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Employee, IEmployee } from '../employee.model';

import { EmployeeService } from '../service/employee.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';
import { EmployeeFormComponent } from '../form/employee-form.component';

@Component({
  selector: 'jhi-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[];
  isLoading = false;
  isModalDialogOpen: boolean;

  constructor(
    protected employeeService: EmployeeService,
    private dialogService: DialogService,
    protected modalService: NgbModal,
    protected parseLinks: ParseLinks,
    private changeDetector: ChangeDetectorRef
  ) {
    this.employees = [];
    this.isModalDialogOpen = false;
  }

  loadAll(): void {
    this.employeeService.query().subscribe(data => {
      this.employees = data.body!.map(object => {
        object.allHours = 0;
        object.events?.forEach(event => {
          const endDate = new Date(event.endDate!);
          const startDate = new Date(event.startDate!);
          const hours = endDate.getHours() - startDate.getHours();
          object.allHours! += hours;
        });
        return object;
      });
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEmployee): number {
    return item.id!;
  }

  delete(employee: Employee): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Usuń employee',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        entity: employee,
        text: ['Czy chcesz usunąć employee o nazwie:', employee.firstName! + '' + employee.lastName!],
      },
    });
    ref.onClose.subscribe(
      (id: number) => {
        if (id) {
          this.employeeService.delete(id).subscribe(
            () => {
              this.loadAll();
              console.debug(`Employee deleted: ${id}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            },
            () => {
              console.debug(`Employee delete: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Employee delete: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Employee delete: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  openEditDialog(employee: Employee): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EmployeeFormComponent, {
      header: 'Edytuj employee',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        employee,
      },
    });
    ref.onClose.subscribe(subject => {
      if (subject) {
        this.employeeService.update(subject).subscribe(
          res => {
            if (res.body) {
              this.loadAll();
              console.debug(`Employee updated: ${res}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            } else {
              console.debug(`Employee update: failed`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          },
          () => {
            console.debug(`Employee update: error`);
            this.isModalDialogOpen = false;
            this.changeDetector.detectChanges();
          }
        );
      } else {
        console.debug(`Employee update: canceled`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  openCreatorDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EmployeeFormComponent, {
      header: 'Dodaj employee',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
    });
    ref.onClose.subscribe(subject => {
      if (subject) {
        this.employeeService.create(subject).subscribe(
          (res: HttpResponse<Employee>) => {
            if (res.body) {
              this.loadAll();
              console.debug(`Employee created: ${res}`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            } else {
              console.debug(`Employee create: failed`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          },
          () => {
            console.debug(`Employee create: error`);
            this.isModalDialogOpen = false;
            this.changeDetector.detectChanges();
          }
        );
      } else {
        console.debug(`Employee create: canceled`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    });
  }
}
