import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-custom-pick-list',
  templateUrl: './custom-pick-list.component.html',
  styleUrls: ['./custom-pick-list.component.scss'],
})
export class CustomPickListComponent {
  @Input() source: any[];
  @Input() target: any[];
  @Input() sourceHeader!: string;
  @Input() targetHeader!: string;
  @Input() filter!: string;

  constructor() {
    this.source = [];
    this.target = [];
  }
}
