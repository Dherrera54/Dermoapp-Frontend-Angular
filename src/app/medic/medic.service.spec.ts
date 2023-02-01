/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MedicService } from './medic.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('Service: Medic', () => {
  let injector: TestBed;
  let service: MedicService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicService,
        HttpClient,
        {
          provide: HttpClient
        },]
    });
    injector = getTestBed();
    service = injector.get(MedicService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify({ignoreCancelled: true});
  });

  it('should ...', inject([MedicService], (service: MedicService) => {
    expect(service).toBeTruthy();
  }));
});
