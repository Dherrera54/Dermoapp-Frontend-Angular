/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InquiryService } from './inquiry.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

describe('Service: Inquiry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule,SharedModule
      ],
      providers: [InquiryService,
        HttpClient,
        {
          provide: HttpClient
        },
      ]
    });
  });

  it('should ...', inject([InquiryService], (service: InquiryService) => {
    expect(service).toBeTruthy();
  }));
});
