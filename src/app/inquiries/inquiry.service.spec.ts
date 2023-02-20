/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InquiryService } from './inquiry.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Service: Inquiry', () => {
  let service: InquiryService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule,SharedModule, HttpClientTestingModule
      ],
      providers: [InquiryService,
        HttpClient,
        {
          provide: HttpClient
        },
      ]
    });
    service = TestBed.inject(InquiryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([InquiryService], (service: InquiryService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable<any[]>', () => {
    const specialty = 'someSpecialty';
    const token = 'someToken';
    const mockData = [{id: 1, name: 'Inquiry 1'}, {id: 2, name: 'Inquiry 2'}];
    service.getInquiriesBySpecialty(specialty, token).subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(`${environment.URL_PRODUCTION}/consultations/specialty/${specialty}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  it('should return an Observable<any>', () => {
    const id = '1';
    const token = 'someToken';
    const mockData = {id: 1, name: 'Inquiry 1'};
    service.getInquiryById(id, token).subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(`${environment.URL_PRODUCTION}/consultations/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

});
