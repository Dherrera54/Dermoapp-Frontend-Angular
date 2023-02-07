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
  const medicMock: Medic=createRandomMedic();


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

  function createRandomMedic(): Medic{
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

  it('check the success sign up medicservices', () => {
    service = TestBed.get(MedicService);
    const spyService = TestBed.get(HttpClient);
    spyOn(spyService, 'post').and.returnValue(medicMock);
    resp=service.medicCreate(medicMock.name,
                       medicMock.lastName,
                       medicMock.country,
                       medicMock.profesionalId,
                       medicMock.profilePicture,
                       medicMock.email,
                       medicMock.password,
                       medicMock.specialty)
      expect(resp.name).toEqual(medicMock.name);
      expect(resp.email).toEqual(medicMock.email);
      expect(resp.country).toEqual(medicMock.country);
      expect(resp.profesionalId).toEqual(medicMock.profesionalId);
      expect(resp.profilePicture).toEqual(medicMock.profilePicture);
      expect(resp.password).toEqual(medicMock.password);
      expect(resp.specialty).toEqual(medicMock.specialty);

  });

  it('check the success  log in user services', () => {
    service = TestBed.get(MedicService);
    const spyService = TestBed.get(HttpClient);
    spyOn(spyService, 'post').and.returnValue(medicMock);
    resp=service.userLogIn(medicMock.name,
                       medicMock.password,
                       )
      expect(resp.token).toBeDefined;
      });

      it('check the success sign up medicservices', () => {
        service = TestBed.get(MedicService);
        const spyService = TestBed.get(HttpClient);
        spyOn(spyService, 'post').and.returnValue(medicMock);
        resp=service.userSignUp(medicMock.name,
                           medicMock.password,
                           'Medico')
          expect(resp.name).toEqual(medicMock.name);
          expect(resp.password).toEqual(medicMock.password);

      });

});
