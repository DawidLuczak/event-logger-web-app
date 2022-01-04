import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableListComponent } from './tree-table-list.component';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  imports: [TreeTableModule, CommonModule],
  exports: [TreeTableListComponent],
  declarations: [TreeTableListComponent],
})
export class TreeTableListModule {}
