/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabPanelService } from './tab-panel.service';

describe('Service: TabPanel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabPanelService],
    });
  });

  it('should ...', inject([TabPanelService], (service: TabPanelService) => {
    expect(service).toBeTruthy();
  }));
});
