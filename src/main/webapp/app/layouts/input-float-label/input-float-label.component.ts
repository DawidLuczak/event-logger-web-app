import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jhi-input-float-label',
  templateUrl: './input-float-label.component.html',
  styleUrls: ['./input-float-label.component.scss'],
})
export class InputFloatLabelComponent {
  @Input() title = '';
  @Input() text = '';
  @Input() maxLength: number;
  @Input() width?: string;
  @Output() changeText = new EventEmitter();

  constructor() {
    this.maxLength = 20;
  }

  change(event: string): void {
    this.changeText.emit(event);
  }
}
