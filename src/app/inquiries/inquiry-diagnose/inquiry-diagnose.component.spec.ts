/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryDiagnoseComponent } from './inquiry-diagnose.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { Inquiry } from '../inquiriy';
import { Patient } from 'src/app/shared/models/patient';
import { of } from 'rxjs';


describe('InquiryDiagnoseComponent', () => {
  let component: InquiryDiagnoseComponent;
  let fixture: ComponentFixture<InquiryDiagnoseComponent>;
  let inquiryServiceSpy: jasmine.SpyObj<InquiryService>;
  let debug: DebugElement;


  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('InquiryService', ['getInquiryById']);

    TestBed.configureTestingModule({

      declarations: [ InquiryDiagnoseComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: InquiryService, useValue: spy },
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

    inquiryServiceSpy = TestBed.inject(InquiryService) as jasmine.SpyObj<InquiryService>;
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
/*   it('should call inquiryService.getInquiryById with correct arguments', fakeAsync(() => {
    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: '2000-02-23T08:00:00.000Z',
      country: 'test',
      profilePicture: 'test'
    }
    const inquiry: Inquiry = {
      id: 'test-inquiry-id',
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


    inquiryServiceSpy.getInquiryById.and.returnValue(of(inquiry));

    component.getInquiryById();

    expect(inquiryServiceSpy.getInquiryById).toHaveBeenCalledWith('test-inquiry-id', 'test-token');

    // Need to use tick() to simulate asynchronous behavior of subscribe() call
    tick();
    expect(component.inquiry).toEqual(inquiry);
  })); */
});
