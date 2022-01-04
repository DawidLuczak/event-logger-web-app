import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'jhi-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
