import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jhi-disabled-text-input',
  templateUrl: './disabled-text-input.component.html',
  styleUrls: ['./disabled-text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTextInputComponent {
  @Input() text = '';
  @Output() textEvent = new EventEmitter();
  @Input() disabled = false;
  @Input() placeholder = 'Nazwa';
  @Input() styleClass = '';
  @Input() style = '';

  constructor(private changeDetector: ChangeDetectorRef) {}

  textChanged(event: string): void {
    this.textEvent.emit(event);
  }

  disableInput(): void {
    if (!this.disabled) {
      this.disabled = true;
    }
  }

  enableInput(): void {
    if (!this.disabled) {
      this.disabled = true;
    }
  }
}
