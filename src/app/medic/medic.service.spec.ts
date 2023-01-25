/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicService } from './medic.service';

describe('Service: Medic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicService]
    });
  });

  it('should ...', inject([MedicService], (service: MedicService) => {
    expect(service).toBeTruthy();
  }));
});
