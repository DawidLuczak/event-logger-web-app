import { Injectable } from '@angular/core';
import { Tab } from './tab.model';

@Injectable({
  providedIn: 'root',
})
export class TabPanelService {
  tabs: Tab[];

  constructor() {
    this.tabs = [];
  }

  addTab(header: string, content: any): void {
    this.tabs.push({ header, content });
  }
}
