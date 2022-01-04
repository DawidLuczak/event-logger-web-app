import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartment } from '../department.model';
import { DepartmentService } from '../service/department.service';
import { DepartmentFormComponent } from '../forms/department-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';
import { Pageable } from 'app/shared/models/pageable.model';
import { Table } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';
import { TableColumn } from 'app/shared/models/table-column.model';
import { LazyLoadEvent } from 'primeng/api';
import { JoinColumnProps, SearchCriteria, SearchQuery } from 'app/shared/models/search-query.model';

@Component({
  selector: 'jhi-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentComponent implements OnInit {
  @ViewChild('table') dataTable!: Table;
  departments!: IDepartment[];
  tableColumns!: any[];
  totalRecords!: number;
  searchQuery: SearchQuery;
  page: Pageable;
  rows = 5;
  loading = true;

  isModalDialogOpen = false;

  constructor(
    protected departmentService: DepartmentService,
    protected modalService: NgbModal,
    private dialogService: DialogService,
    public changeDetector: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    this.page = new Pageable(0, this.rows * 4, '');
    this.searchQuery = new SearchQuery([], []);
  }

  ngOnInit(): void {
    this.setColumnNames();
    this.initLazyData();
  }

  setColumnNames(): void {
    this.translateService
      .get(['eventloggerApp.department.title', 'eventloggerApp.department.description', 'eventloggerApp.department.schedules'])
      .subscribe(translations => {
        this.tableColumns = [
          new TableColumn(0, 'title', translations['eventloggerApp.department.title']),
          new TableColumn(1, 'description', translations['eventloggerApp.department.description']),
          new TableColumn(2, 'schedules', translations['eventloggerApp.department.schedules']),
        ];
      });
  }

  loadPage(): void {
    this.departmentService.search(this.page, this.searchQuery).subscribe(
      (res: any) => {
        this.departments = res.body!.content;
      },
      error => {
        console.error(`Loading Departments: ${error}`);
        this.loading = false;
        this.changeDetector.markForCheck();
      },
      () => {
        this.loading = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  // loadPage(): void {
  //   this.departmentService.search(this.page, this.getFilterString()).subscribe(
  //     (res: any) => {
  //       this.departments = res.body.content;
  //     },
  //     error => {
  //       console.error(`Loading Departments: ${error}`);
  //       this.loading = false;
  //       this.changeDetector.markForCheck();
  //     },
  //     () => {
  //       this.loading = false;
  //       this.changeDetector.markForCheck();
  //     }
  //   );
  // }

  loadMoreLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.page.page = event.first! / event.rows!;
    this.loadPage();
    console.log(this.page);
    console.log(event);
  }

  loadFilteredRecords(event: any, columnIndex: number): void {
    this.loading = true;
    const columnName = this.tableColumns[columnIndex].field;
    this.addFilterCriteria(columnName, 'LIKE', event.target.value);
    // this.columnFilters.set(columnName, event.target.value);
    this.loadPage();
  }

  openEditDialog(department: IDepartment): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DepartmentFormComponent, {
      header: 'Edytuj department',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        department,
      },
    });
    this.changeDetector.detectChanges();
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.departmentService.update(subject).subscribe(
            res => {
              console.debug(`Department updated: ${res}`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            },
            error => {
              console.debug(`Department update: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            }
          );
        } else {
          console.debug('Department update: canceled');
          this.isModalDialogOpen = false;
          this.changeDetector.markForCheck();
        }
      },
      error => {
        console.debug(`Department update dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  openCreatorDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DepartmentFormComponent, {
      header: 'Dodaj department',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.departmentService.create(subject).subscribe(
            res => {
              this.loadPage();
              console.debug(`Department updated: ${res}`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            },
            error => {
              console.debug(`Department create: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            }
          );
        } else {
          console.debug('Department create: canceled');
          this.isModalDialogOpen = false;
          this.changeDetector.markForCheck();
        }
      },
      error => {
        console.debug(`Department create dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  delete(department: IDepartment): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Usuń department',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        entity: department,
        text: ['Czy chcesz usunąć department o nazwie:', department.title!],
      },
    });
    ref.onClose.subscribe(
      id => {
        if (id) {
          this.departmentService.delete(id).subscribe(
            () => {
              console.debug(`Department deleted: ${id}.`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            },
            error => {
              console.debug(`Department delete: ${error}`);
              this.isModalDialogOpen = false;
              this.changeDetector.markForCheck();
            }
          );
        } else {
          console.debug(`Department delete: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.markForCheck();
        }
      },
      error => {
        console.debug(`Department delete dialog: ${error}`);
        this.isModalDialogOpen = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  trackId(index: number, item: IDepartment): number {
    return item.id!;
  }

  calculateTableScrollHeight(scale: number): number {
    return window.screen.height * scale;
  }

  private initLazyData(): void {
    this.loading = true;
    this.departmentService.countAll().subscribe(
      res => {
        this.totalRecords = res;
        this.loadPage();
      },
      error => {
        console.error(`Counting Departments: ${error}`);
        this.loading = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  // private getFilterString(): string {
  //   let filterString = '';
  //   this.columnFilters.forEach((value: string, key: string) => {
  //     if (value.length > 0) {
  //       filterString += `&${key}=${value}`;
  //     }
  //   });
  //   return filterString.slice(1);
  // }

  private setSortingString(event: any): void {
    const sortField: string = event.sortField;
    this.page.sort = sortField + (event.sortOrder === 1 ? ',asc' : ',desc');
  }

  private addFilterCriteria(columnName: string, operator: string, input: string): void {
    this.searchQuery.searchCriterias = this.searchQuery.searchCriterias?.filter(criteria => criteria.property !== columnName);
    if (input !== '') {
      const searchCriteria = new SearchCriteria(columnName, operator, input);
      this.searchQuery.searchCriterias?.push(searchCriteria);
    }
  }

  private addJoinColumn(columnName: string, attribute: string, operation: string, input: string): void {
    this.searchQuery.joinColumnProps = this.searchQuery.joinColumnProps?.filter(column => column.searchCriteria.property !== attribute);
    if (input !== '') {
      const searchCriteria = new SearchCriteria(attribute, operation, input);
      const joinColumnProp = new JoinColumnProps(columnName, searchCriteria);
      this.searchQuery.joinColumnProps?.push(joinColumnProp);
    }
  }
}
