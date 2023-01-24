/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicSingupComponent } from './medic-singup.component';

describe('MedicSingupComponent', () => {
  let component: MedicSingupComponent;
  let fixture: ComponentFixture<MedicSingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicSingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
