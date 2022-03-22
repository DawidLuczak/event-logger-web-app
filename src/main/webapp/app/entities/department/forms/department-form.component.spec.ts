/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { DepartmentFormComponent } from './department-form.component';

describe('DepartmentFormComponent', () => {
  let component: DepartmentFormComponent;
  let fixture: ComponentFixture<DepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
