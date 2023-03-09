/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryMedicListComponent } from './inquiry-medic-list.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';


describe('InquiryMedicListComponent', () => {
  let component: InquiryMedicListComponent;
  let fixture: ComponentFixture<InquiryMedicListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryMedicListComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
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
    fixture = TestBed.createComponent(InquiryMedicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should scroll media scroller to the right', () => {
    const scrollAmount = 10;
    const val = 1;
    const mediaScroller = fixture.nativeElement.querySelector('.media-scroller');
    spyOnProperty(mediaScroller, 'scrollLeft', 'set');

    component.scrollAmount = scrollAmount;
    component.scrollHorizontally(val);

    expect(mediaScroller.scrollLeft).toBe(scrollAmount * val);
  });

  it('should scroll media scroller to the left', () => {
    const scrollAmount = 10;
    const val = -1;
    const mediaScroller = fixture.nativeElement.querySelector('.media-scroller');
    spyOnProperty(mediaScroller, 'scrollLeft', 'set');

    component.scrollAmount = scrollAmount;
    component.scrollHorizontally(val);

    expect(mediaScroller.scrollLeft).toBe(-scrollAmount * val);
  });
});
