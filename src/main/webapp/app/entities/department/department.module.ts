import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DepartmentComponent } from './list/department.component';
import { DepartmentDetailComponent } from './detail/department-detail.component';
import { DepartmentUpdateComponent } from './update/department-update.component';
import { DepartmentDeleteDialogComponent } from './delete/department-delete-dialog.component';
import { DepartmentRoutingModule } from './route/department-routing.module';
import { SchedulesTreeTableModule } from '../schedule/forms/schedules-tree-table/schedules-tree-table.module';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CommunityService } from '../community/service/community.service';
import { SchedulesPickListModule } from '../schedule/forms/schedules-pick-list/schedules-pick-list.module';
import { ScheduleService } from '../schedule/service/schedule.service';
import { DepartmentService } from './service/department.service';
import { DepartmentFormModule } from './forms/department-form.module';
import { ScheduleTableModule } from '../schedule/table/schedule-table.module';

@NgModule({
  imports: [
    SchedulesPickListModule,
    SchedulesTreeTableModule,
    SharedModule,
    DepartmentRoutingModule,
    DepartmentFormModule,
    ScheduleTableModule,
  ],
  declarations: [DepartmentComponent, DepartmentDetailComponent, DepartmentUpdateComponent, DepartmentDeleteDialogComponent],
  entryComponents: [DepartmentDeleteDialogComponent, DeleteDialogComponent],
  providers: [MessageService, DialogService, ScheduleService, DepartmentService, CommunityService],
  exports: [DepartmentComponent],
})
export class DepartmentModule {}
