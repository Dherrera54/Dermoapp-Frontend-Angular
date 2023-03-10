/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiriesListComponent } from './inquiries-list.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { Inquiry } from '../inquiriy';
import { Patient } from 'src/app/shared/models/patient';
import { of } from 'rxjs';
import { MedicService } from 'src/app/medic/medic.service';
import { InquiryService } from '../inquiry.service';

describe('InquiriesComponent', () => {
  let component: InquiriesListComponent;
  let fixture: ComponentFixture<InquiriesListComponent>;
  let debug: DebugElement;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success']);
    TestBed.configureTestingModule({
      declarations: [ InquiriesListComponent ],
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
    fixture = TestBed.createComponent(InquiriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*   it('should scroll media scroller to the right', () => {
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
  }); */

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
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMsg, 'Error');
  });
  it('should set selected to true on cancel', () => {
    const cancel = true;

    component.onCancel(cancel);

    expect(component.selected).toBeTrue();
  });

  it('should call getInquiriesFromMedic on claimed inquiry', () => {
    spyOn(component, 'getInquiriesBySpecialty');

    component.onClaimedInquiry(true);

    expect(component.getInquiriesBySpecialty).toHaveBeenCalled();
  });

  it('should set selected to true and update selected inquiry', () => {
    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: '2000-02-23T08:00:00.000Z',
      country: 'test',
      profilePicture: 'test'
    }
    const inquiry: Inquiry = {
      id: '1',
      shape: 'Example Shape',
      numberOfInjuries: '2',
      distribution: 'Example Distribution',
      comment: 'Example Comment',
      image: 'Example Image',
      creationDate: '2022-02-23T08:00:00.000Z',
      typeOfInjury: 'Example Type',
      specialty: 'Example Specialty',
      asigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };
    component.selected = false;

    component.onSelectedInquiry(inquiry);

    expect(component.selected).toBeTrue();
    expect(component.selectedInquiry).toBe(inquiry);
    expect(component.inquiry).toBe(inquiry);
  });

  it('should set selected inquiry if if user coms fromother views', inject([MedicService, InquiryService], (medicService: MedicService, inquiryService: InquiryService) => {
    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: '2000-02-23T08:00:00.000Z',
      country: 'test',
      profilePicture: 'test'
    }
    const inquiry: Inquiry = {
      id: '1',
      shape: 'Example Shape',
      numberOfInjuries: '2',
      distribution: 'Example Distribution',
      comment: 'Example Comment',
      image: 'Example Image',
      creationDate: '2022-02-23T08:00:00.000Z',
      typeOfInjury: 'Example Type',
      specialty: 'Example Specialty',
      asigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };

    component.medicId="medic-id-test";
    component.specialty="specialty-test";
    component.origin="origin-test";
    component.token="token-test";
    component.selectedInquiry=inquiry;
    component.showInquiries=[inquiry,inquiry]
    fixture.detectChanges();


    spyOn(inquiryService, 'getInquiriesBySpecialty').and.returnValue(of([inquiry,inquiry]));
    spyOn(medicService, 'getMedicInquiriesById').and.returnValue(of([inquiry,inquiry]));

    component.getInquiriesBySpecialty();

    expect(component.selectedInquiry).toBe(inquiry);
  }));

});
