import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

@Component({
  templateUrl: './schedule-delete-dialog.component.html',
})
export class ScheduleDeleteDialogComponent {
  schedule?: ISchedule;

  constructor(protected scheduleService: ScheduleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.scheduleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
