import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { InquiryDetailComponent } from './inquiry-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { Inquiry } from '../inquiriy';
import { Patient } from 'src/app/shared/models/patient';

describe('InquiryDetailComponent', () => {
  let component: InquiryDetailComponent;
  let fixture: ComponentFixture<InquiryDetailComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success']);

    TestBed.configureTestingModule({
      declarations: [ InquiryDetailComponent ],
      imports:[ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
               {provide: ToastrService, useValue: toastrServiceSpy},

]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: '2000-02-23T08:00:00.000Z',
      country: 'test',
      profilePicture: 'test'
    }

    const selectedInquiry:Inquiry = {
      id: '444',
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

    fixture = TestBed.createComponent(InquiryDetailComponent);
    component = fixture.componentInstance;
    component.selectedInquiry=selectedInquiry;
    component.selectedInquiry.patient=patient;
    fixture.detectChanges();



  });
  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should set owned to false if inquiry does not belong to medic', () => {

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
      assigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };
    component.medicInquiries=[inquiry,
      inquiry,
      inquiry,
      inquiry,
      inquiry,
      inquiry]
      fixture.detectChanges();

    component.checkMedicInquiries();
    expect(component.owned).toBe(false);
  });

 it('should call error method of toastr service with correct parameters', () => {
    const errorMsg = 'An error occurred';
    component.showError(errorMsg);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMsg, 'Error!');
  });

  it('should call success method of toastr service with correct parameters', () => {
    const successMsg = 'Operation successful';
    component.showSuccess(successMsg);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(successMsg, 'Success!');
  });



});


