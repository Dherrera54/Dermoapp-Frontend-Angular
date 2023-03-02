/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryDetailComponent } from './inquiry-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicService } from 'src/app/medic/medic.service';
import { Inquiry } from '../inquiriy';
import { of, throwError } from 'rxjs';

describe('InquiryDetailComponent', () => {
  let component: InquiryDetailComponent;
  let fixture: ComponentFixture<InquiryDetailComponent>;
  let medicServiceSpy: jasmine.SpyObj<MedicService>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InquiryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const spy = jasmine.createSpyObj('MedicService', ['addInquiryToMedic']);
    TestBed.configureTestingModule({
      declarations: [ InquiryDetailComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [ { provide: MedicService, useValue: spy } ]
    })
    .compileComponents();

    medicServiceSpy = TestBed.inject(MedicService) as jasmine.SpyObj<MedicService>;
  }));


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


});
