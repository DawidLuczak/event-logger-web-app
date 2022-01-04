/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityFormComponent } from './community-form.component';

describe('FormComponent', () => {
  let component: CommunityFormComponent;
  let fixture: ComponentFixture<CommunityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
