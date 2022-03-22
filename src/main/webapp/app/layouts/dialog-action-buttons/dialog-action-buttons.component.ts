import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-dialog-action-buttons',
  templateUrl: './dialog-action-buttons.component.html',
  styleUrls: ['./dialog-action-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogActionButtonsComponent {
  @Input() cancel!: () => void;
  @Input() confirm!: () => void;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
