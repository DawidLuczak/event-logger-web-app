import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jhi-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit {
  text!: string;

  constructor(public dynamicDialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.text = this.config.data.text;
  }

  confirm(): void {
    this.dynamicDialogRef.close(this.config.data.entity.id);
  }

  cancel(): void {
    this.dynamicDialogRef.close();
  }
}
