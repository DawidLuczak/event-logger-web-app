import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeekScheduleComponent } from './week-schedule.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from 'app/shared/shared.module';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DisabledTextInputModule } from 'app/layouts/disabled-text-input/disabled-text-input.module';
import { OutMouseClickDirective } from 'app/core/out-mouse-click/out-mouse-click.directive';
import { ResizableDirective } from 'app/shared/resizeable/resizeable.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    DisabledTextInputModule,
    AngularResizeEventModule,
    SharedModule,
    InputNumberModule,
    TooltipModule,
    TableModule,
    CommonModule,
    BackdropModule,
    ButtonModule,
    DragDropModule,
  ],
  providers: [DatePipe, DialogService, OutMouseClickDirective, ResizableDirective],
  declarations: [WeekScheduleComponent],
  exports: [WeekScheduleComponent],
})
export class WeekScheduleModule {}
