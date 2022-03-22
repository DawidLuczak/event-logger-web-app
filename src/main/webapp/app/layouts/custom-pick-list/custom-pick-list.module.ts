import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPickListComponent } from './custom-pick-list.component';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [PickListModule, CommonModule],
  declarations: [CustomPickListComponent],
  exports: [CustomPickListComponent],
})
export class CustomPickListModule {}
