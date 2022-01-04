/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'jhi-tree-table-list',
  templateUrl: './tree-table-list.component.html',
  styleUrls: ['./tree-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeTableListComponent implements OnInit {
  @Input() values: TreeNode[];
  @Input() columns: any[] = [];

  constructor(protected changeDetector: ChangeDetectorRef) {
    this.values = [];
    this.columns = [{ field: 'id', header: 'Id' }];
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
