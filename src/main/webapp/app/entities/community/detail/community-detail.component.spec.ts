import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CommunityDetailComponent } from './community-detail.component';

describe('Community Management Detail Component', () => {
  let comp: CommunityDetailComponent;
  let fixture: ComponentFixture<CommunityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ community: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CommunityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CommunityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load community on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.community).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
