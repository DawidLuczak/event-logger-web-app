import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  date: Date;

  constructor() {
    this.date = new Date();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
