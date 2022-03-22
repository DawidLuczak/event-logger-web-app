jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CommunityService } from '../service/community.service';
import { ICommunity, Community } from '../community.model';

import { CommunityUpdateComponent } from './community-update.component';

describe('Community Management Update Component', () => {
  let comp: CommunityUpdateComponent;
  let fixture: ComponentFixture<CommunityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let communityService: CommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommunityUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(CommunityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommunityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    communityService = TestBed.inject(CommunityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const community: ICommunity = { id: 456 };

      activatedRoute.data = of({ community });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(community));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Community>>();
      const community = { id: 123 };
      jest.spyOn(communityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: community }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(communityService.update).toHaveBeenCalledWith(community);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Community>>();
      const community = new Community();
      jest.spyOn(communityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: community }));
      saveSubject.complete();

      // THEN
      expect(communityService.create).toHaveBeenCalledWith(community);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Community>>();
      const community = { id: 123 };
      jest.spyOn(communityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ community });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(communityService.update).toHaveBeenCalledWith(community);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
