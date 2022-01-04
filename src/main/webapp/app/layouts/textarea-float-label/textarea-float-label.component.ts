import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractValueAccessor } from 'app/core/abstract-value-accessor/abstract-value-accessor.component';

@Component({
  selector: 'jhi-textarea-float-label',
  templateUrl: './textarea-float-label.component.html',
  styleUrls: ['./textarea-float-label.component.scss'],
})
export class TextareaFloatLabelComponent extends AbstractValueAccessor {
  @Input() title = '';
  @Input() text = '';
  @Input() maxLength: number;
  @Input() width?: string;
  @Output() changeText = new EventEmitter();

  constructor() {
    super();
    this.maxLength = 200;
  }

  change(event: string): void {
    this.changeText.emit(event);
  }
}
