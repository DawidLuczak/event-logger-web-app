import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ScheduleDetailComponent } from './schedule-detail.component';

describe('Schedule Management Detail Component', () => {
  let comp: ScheduleDetailComponent;
  let fixture: ComponentFixture<ScheduleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ schedule: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ScheduleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ScheduleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load schedule on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.schedule).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
