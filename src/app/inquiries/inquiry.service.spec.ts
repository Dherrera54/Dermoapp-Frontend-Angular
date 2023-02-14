/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InquiryService } from './inquiry.service';

describe('Service: Inquiry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InquiryService]
    });
  });

  it('should ...', inject([InquiryService], (service: InquiryService) => {
    expect(service).toBeTruthy();
  }));
});
