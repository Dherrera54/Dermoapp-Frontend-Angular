/* tslint:disable:no-unused-variable */
import { async, ComponentFixture,  TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryDiagnoseComponent } from './inquiry-diagnose.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { Inquiry } from '../inquiriy';
import { Patient } from 'src/app/shared/models/patient';
import { of, throwError } from 'rxjs';


describe('InquiryDiagnoseComponent', () => {
  let component: InquiryDiagnoseComponent;
  let fixture: ComponentFixture<InquiryDiagnoseComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let debug: DebugElement;


  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success']);

    TestBed.configureTestingModule({

      declarations: [ InquiryDiagnoseComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        {provide: ToastrService, useValue: toastrServiceSpy},
   
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDiagnoseComponent);
    component = fixture.componentInstance;
    component.inquiryId = 'test-inquiry-id';
    component.token = 'test-token';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call error method of toastr service with correct parameters', () => {
    const errorMsg = 'An error occurred';
    component.showError(errorMsg);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMsg, 'Error');
  });

  it('should call success method of toastr service with correct parameters', () => {
    const successMsg = 'Operation successful';
    component.showSuccess(successMsg);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(successMsg, 'Registro exitoso');
  });

  it('Navigate to /inquiry list', inject([Router], (mockRouter: Router) => {


     component.medicId="medic-id-test";
    component.specialty="specialty-test";
    component.origin="inquiry-list";
    component.token="token-test";
    component.inquiryId="inquiry-id-test"
    fixture.detectChanges();

  const spy = spyOn(mockRouter, 'navigate').and.stub();

  component.return();

  expect(spy.calls.first().args[0]).toContain(`/inquiries/medic-id-test/specialty-test/inquiry-id-test/token-test`);

 }));
 it('Navigate to /inquiry medic list', inject([Router], (mockRouter: Router) => {


  component.medicId="medic-id-test";
 component.specialty="specialty-test";
 component.origin="inquiry-medic-list";
 component.token="token-test";
 component.inquiryId="inquiry-id-test"
 fixture.detectChanges();

const spy = spyOn(mockRouter, 'navigate').and.stub();

component.return();

expect(spy.calls.first().args[0]).toContain(`/inquiries/medic-id-test/specialty-test/inquiry-id-test/token-test/claimed`);

}));

it('should set owned to true if medic has the selected inquiry', inject([InquiryService], (inquiryService: InquiryService) => {
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
  component.inquiry=inquiry;
  fixture.detectChanges();


  let spy = spyOn(inquiryService, 'updateDiagnosisOnInquiry').and.returnValue(of(inquiry));


  component.createDiagnosis();


  expect(spy.calls.first().args[0].diagnosis).toBe("Initial Diagnosis");
}));

it('should display error when diagnostic not updayed of the selected inquiry', inject([InquiryService], (inquiryService: InquiryService) => {

  const errorMessage = 'fake error message';

  component.medicId="medic-id-test";
  component.specialty="specialty-test";
  component.origin="origin-test";
  component.token="token-test";

  fixture.detectChanges();

  spyOn(component, 'showError');

  let spy = spyOn(inquiryService, 'updateDiagnosisOnInquiry').and.returnValue(throwError({ message: errorMessage }));


  component.createDiagnosis();


  expect(component.showError).toHaveBeenCalledWith(`Ha ocurrido un error: ${errorMessage}`);
}));


});
