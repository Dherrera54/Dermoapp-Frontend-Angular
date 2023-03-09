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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';


describe('InquiryMedicListComponent', () => {
  let component: InquiryMedicListComponent;
  let fixture: ComponentFixture<InquiryMedicListComponent>;
  let debug: DebugElement;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success']);
    TestBed.configureTestingModule({
      declarations: [ InquiryMedicListComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        {provide: ToastrService, useValue: toastrServiceSpy},
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
    const scrollAmount = 0;
    const val = 1;
    const mediaScroller = fixture.nativeElement.querySelector('.media-scroller');
    spyOnProperty(mediaScroller, 'scrollLeft', 'set');

    component.scrollAmount = scrollAmount;
    component.scrollHorizontally(val);

    expect(mediaScroller.scrollLeft).toBe(scrollAmount * val);
  });

  it('should scroll media scroller to the left', () => {
    const scrollAmount = 0;
    const val = -1;
    const mediaScroller = fixture.nativeElement.querySelector('.media-scroller');
    spyOnProperty(mediaScroller, 'scrollLeft', 'set');

    component.scrollAmount = scrollAmount;
    component.scrollHorizontally(val);

    expect(mediaScroller.scrollLeft).toBe(-scrollAmount * val);
  });
  it('should calculate age correctly for a given birth date', () => {
    const birthDate = '1990-01-01';
    const age = component.calculateAge(birthDate);
    let timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    let ageExpect = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    expect(age).toEqual(ageExpect);
  });

  it('should return 0 when birth date is not provided', () => {
    const age = component.calculateAge('');
    expect(age).toEqual(0);
  });
  it('should call error method of toastr service with correct parameters', () => {
    const errorMsg = 'An error occurred';
    component.showError(errorMsg);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMsg, 'Error!');
  });
  it('should set selected to true on cancel', () => {
    const cancel = true;

    component.onCancel(cancel);

    expect(component.selected).toBeTrue();
  });

  it('should call getInquiriesFromMedic on claimed inquiry', () => {
    spyOn(component, 'getInquiriesFromMedic');

    component.onClaimedInquiry(true);

    expect(component.getInquiriesFromMedic).toHaveBeenCalled();
  });
});
