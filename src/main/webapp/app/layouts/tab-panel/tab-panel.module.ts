import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanelComponent } from './tab-panel.component';
import { TabViewModule } from 'primeng/tabview';
import { TabPanelService } from './tab-panel.service';
import { DepartmentModule } from 'app/entities/department/department.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [TabViewModule, CommonModule, DepartmentModule, SharedModule],
  declarations: [TabPanelComponent],
  providers: [TabPanelService],
  exports: [TabPanelComponent],
})
export class TabPanelModule {}
