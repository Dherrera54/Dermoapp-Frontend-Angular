/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MedicService } from './medic.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import { faker } from '@faker-js/faker';
import { Medic } from './medic';


describe('Service: Medic', () => {
  let injector: TestBed;
  let service: MedicService;
  let resp:any;
  const medicMock: Medic=createRandoMedic();


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

  function createRandoMedic(): Medic{
    return{
      id:faker.datatype.uuid() ,
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      country: faker.address.country(),
      profesionalId: "asad674584",
      profilePicture: faker.image.cats(),
      email: faker.internet.email(),
      password: faker.internet.password(8,true, undefined,'!'),
      specialty: "Pediatria"
   }

  }


  it('should ...', inject([MedicService], (service: MedicService) => {
    expect(service).toBeTruthy();
  }));

  it('check the success services', () => {
    service = TestBed.get(MedicService);
    const spyService = TestBed.get(HttpClient);
    spyOn(spyService, 'post').and.returnValue(medicMock);
    resp=service.userSignUp(medicMock.name,
                       medicMock.lastName,
                       medicMock.country,
                       medicMock.profesionalId,
                       medicMock.profilePicture,
                       medicMock.email,
                       medicMock.password,
                       medicMock.specialty)
      expect(resp.name).toEqual(medicMock.name);
      expect(resp.email).toEqual(medicMock.email);
      expect(resp.lastName).toEqual(medicMock.lastName);

  });
});
