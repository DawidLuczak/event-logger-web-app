import { Component, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomPickListComponent } from '../custom-pick-list/custom-pick-list.component';

@Component({
  selector: 'jhi-pick-list-in-dialog',
  templateUrl: './pick-list-in-dialog.component.html',
  styleUrls: ['./pick-list-in-dialog.component.scss'],
})
export class PickListInDialogComponent extends CustomPickListComponent {
  @Input() cancel: () => void;
  @Input() confirm!: () => void;

  constructor(public dynamicDialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {
    super();
    const initialState = this.target;
    this.cancel = (): void => {
      this.target = initialState;
      this.dynamicDialogRef.close(false);
    };
    this.confirm = (): void => {
      this.dynamicDialogRef.close(this.target);
    };
  }
}
