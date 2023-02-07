/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { PatientService } from './patient.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('Service: Patient', () => {
  let injector: TestBed;
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule
      ],
      providers: [PatientService,
        HttpClient,
        {
          provide: HttpClient
        },

        ]
    });
    injector = getTestBed();
    service = injector.get(PatientService);
    });

  it('should ...', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));
});
