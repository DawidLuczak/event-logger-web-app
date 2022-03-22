import { Component, OnInit, Renderer2 } from '@angular/core';
import { TabPanelService } from './tab-panel.service';

@Component({
  selector: 'jhi-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent implements OnInit {
  constructor(public tabPanelService: TabPanelService, private renderer: Renderer2) {}

  ngOnInit(): void {
    const content = this.renderer.createElement('jhi-department');
    this.tabPanelService.addTab('head', content);
  }

  closeTab(event: any): void {
    const index: number = event.index;
    const left = this.tabPanelService.tabs.slice(0, index);
    if (index + 1 < this.tabPanelService.tabs.length) {
      const right = this.tabPanelService.tabs.slice(index + 1, this.tabPanelService.tabs.length);
      this.tabPanelService.tabs = left.concat(right);
    } else {
      this.tabPanelService.tabs = left;
    }
  }
}
