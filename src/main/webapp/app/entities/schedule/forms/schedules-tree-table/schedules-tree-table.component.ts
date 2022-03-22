import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeTableListComponent } from 'app/layouts/tree-table-list/tree-table-list.component';

@Component({
  selector: 'jhi-schedules-tree-table',
  templateUrl: './schedules-tree-table.component.html',
  styleUrls: ['./schedules-tree-table.component.scss'],
})
export class SchedulesTreeTableComponent extends TreeTableListComponent implements OnInit {
  constructor(changeDetector: ChangeDetectorRef) {
    super(changeDetector);
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Nazwa' },
      { field: 'description', header: 'Opis' },
      { field: 'type', header: 'Typ' },
      { field: 'department', header: 'Department', childEntityField: 'title' },
    ];
  }
}
