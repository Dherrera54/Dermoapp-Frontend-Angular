/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiriesComponent } from './inquiries.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, of} from 'rxjs';

describe('InquiriesComponent', () => {
  let component: InquiriesComponent;
  let fixture: ComponentFixture<InquiriesComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiriesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }},

          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {params: {id: 100}}
            }
          },

      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
