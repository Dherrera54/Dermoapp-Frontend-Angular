/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MedicService } from './medic.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

describe('Service: Medic', () => {
  let injector: TestBed;
  let service: MedicService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule
      ],
      providers: [MedicService,
        HttpClient,
        {
          provide: HttpClient
        },

        ]
    });
    // Inject the http service and test controller for each test
    injector = getTestBed();
    service = injector.get(MedicService);

  });


  it('should ...', inject([MedicService], (service: MedicService) => {
    expect(service).toBeTruthy();
  }));
});
