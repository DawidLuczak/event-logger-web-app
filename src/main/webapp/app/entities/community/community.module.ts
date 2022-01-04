import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CommunityComponent } from './list/community.component';
import { CommunityUpdateComponent } from './update/community-update.component';
import { CommunityDeleteDialogComponent } from './delete/community-delete-dialog.component';
import { CommunityRoutingModule } from './route/community-routing.module';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { DeleteDialogModule } from 'app/layouts/delete-dialog/delete-dialog.module';
import { DialogActionButtonsModule } from 'app/layouts/dialog-action-buttons/dialog-action-buttons.module';
import { InputFloatLabelModule } from 'app/layouts/input-float-label/input-float-label.module';
import { TextareaFloatLabelModule } from 'app/layouts/textarea-float-label/textarea-float-label.module';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { CommunityFormComponent } from './form/community-form.component';
import { EmployeeTableModule } from '../employee/table/employee-table.module';
import { CommunityDetailComponent } from './detail/community-detail.component';

@NgModule({
  imports: [
    BackdropModule,
    DeleteDialogModule,
    AccordionModule,
    DropdownModule,
    InputFloatLabelModule,
    TextareaFloatLabelModule,
    DialogActionButtonsModule,
    SharedModule,
    CommunityRoutingModule,
    EmployeeTableModule,
  ],
  declarations: [
    CommunityComponent,
    CommunityUpdateComponent,
    CommunityDeleteDialogComponent,
    CommunityFormComponent,
    CommunityDetailComponent,
  ],
})
export class CommunityModule {}
