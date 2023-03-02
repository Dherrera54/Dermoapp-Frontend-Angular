import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryDetailComponent } from './inquiry-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicService } from 'src/app/medic/medic.service';
import { Inquiry } from '../inquiriy';
import { of, throwError } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient';
import { Router } from '@angular/router';

describe('InquiryDetailComponent', () => {
  let component: InquiryDetailComponent;
  let fixture: ComponentFixture<InquiryDetailComponent>;
  let medicServiceSpy: jasmine.SpyObj<MedicService>;
  let medicService: MedicService;

  beforeEach(async(() => {
    medicService = TestBed.inject(MedicService);

    const spy = jasmine.createSpyObj('MedicService', ['addInquiryToMedic']);
    TestBed.configureTestingModule({
      declarations: [ InquiryDetailComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [ { provide: MedicService, useValue: spy },
        {provide: Router,
        useValue: {
          navigate: jasmine.createSpy('navigate'),
        }},
        {provide: ToastrService},
]
    })
    .compileComponents();

    medicServiceSpy = TestBed.inject(MedicService) as jasmine.SpyObj<MedicService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should calculate age correctly for a given birth date', () => {
    const birthDate = '1990-01-01';
    const age = component.calculateAge(birthDate);
    expect(age).toEqual(32); // change this to the expected age based on current year
  });

  it('should return 0 when birth date is not provided', () => {
    const age = component.calculateAge('');
    expect(age).toEqual(0);
  });

  it('should call addInquiryToMedic with correct parameters', () => {
    const token = 'test_token';
    const medicId = 'test_medic_id';
    const inquiryId = 'test_inquiry_id';
    component.token = token;
    component.medicId = medicId;
    component.selectedInquiry = { id: inquiryId } as Inquiry;
    const successSpy = spyOn(component, 'showSuccess');
    const errorSpy = spyOn(component, 'showError');
    medicServiceSpy.addInquiryToMedic.and.returnValue(of(null));

    component.claim();

    expect(medicServiceSpy.addInquiryToMedic).toHaveBeenCalledWith(medicId, token, inquiryId);
    expect(successSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should set owned to true if inquiry belongs to medic', () => {

    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: 'test',
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
      assigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };
    // Arrange
    spyOn(medicService, 'getMedicInquiriesById').and.returnValue(of([
     inquiry,
     inquiry,
     inquiry,
     inquiry ,
     inquiry,
     component.selectedInquiry, // selected inquiry is part of medic's inquiries
    ]));

    // Act
    component.checkMedicInquiries();

    // Assert
    expect(component.owned).toBe(true);
  });

  it('should set owned to false if inquiry does not belong to medic', () => {

    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: 'test',
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
      assigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };

    // Arrange
    spyOn(medicService, 'getMedicInquiriesById').and.returnValue(of([
     inquiry,
     inquiry,
     inquiry,
     inquiry ,
     inquiry,
     inquiry,
    ]));

    // Act
    component.checkMedicInquiries();

    // Assert
    expect(component.owned).toBe(false);
  });


});


