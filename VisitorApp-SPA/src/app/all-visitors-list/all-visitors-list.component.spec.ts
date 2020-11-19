/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllVisitorsListComponent } from './all-visitors-list.component';

describe('AllVisitorsListComponent', () => {
  let component: AllVisitorsListComponent;
  let fixture: ComponentFixture<AllVisitorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVisitorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVisitorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
