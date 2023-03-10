/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MedicService } from './medic.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import { faker } from '@faker-js/faker';
import { Medic } from './medic';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('Service: Medic', () => {
  let injector: TestBed;
  let service: MedicService;
  let resp:any;
  const medicMock: Medic=createRandomMedic();
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule,SharedModule, HttpClientTestingModule
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
    httpMock = TestBed.inject(HttpTestingController);


  });
  afterEach(() => {
    httpMock.verify();
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
      specialty: "Pediatria",
      inquiries:[]
   }

  }


  it('should ...', inject([MedicService], (service: MedicService) => {
    expect(service).toBeTruthy();
  }));

  it('cshould create a medic', () => {
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

      it('should get medic by email', () => {
        const email = 'test@example.com';
        const token = 'my_token';

        const expectedResponse = {id: 1, name: 'John Doe', email: email};

        service.getMedicByEmail(email, token).subscribe(response => {
          expect(response).toEqual(expectedResponse);
        });

        const req = httpMock.expectOne(`${service.backUrl}/medics/email/${email}`);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
        req.flush(expectedResponse);
      });

      it('should return a medic by id', () => {
        const id = '123';
        const token = 'abc';
        const expectedMedic = new Medic(
          '123',
          'johndoe@example.com',
          "test",
          'John',
          'Doe',
          "colombia",
          "test",
          "test",
          "testimg",
          []
        );

        service.getMedicById(id, token).subscribe((medic) => {
          expect(medic).toEqual(expectedMedic);
        });

        const req = httpMock.expectOne(`${service.backUrl}/medics/${id}`);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
        req.flush(expectedMedic);
      });

      it('should return a inquiry from medic', () => {
        const mockResponse = { medicId: 'medic1', inquiryId: 'inquiry1' };

        service.addInquiryToMedic('medic1', 'token', 'inquiry1').subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${service.backUrl}/medics/medic1/consultations/inquiry1`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
      });

      it('should upload an image', async () => {
        const imgName = 'test.png';
        const imgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
        const mockResponse = 'https://example.com/test.png';

        service.imgUpload(imgName, imgBase64).then((url: string) => {
          expect(url).toBe(mockResponse);
        });

        const req = httpMock.expectOne(`${service.storageRef}/medic/profilePics/${imgName}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(imgBase64);
        req.flush({ ref: { getDownloadURL: () => mockResponse } });
      });

      it('should handle error', async () => {
        const imgName = 'test.png';
        const imgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
        const errorMsg = 'Server error';
        const mockErrorResponse = { status: 500, statusText: errorMsg };

        service.imgUpload(imgName, imgBase64).then((url: string) => {
          expect(url).toBeNull();
        });

        const req = httpMock.expectOne(`${service.storageRef}/medic/profilePics/${imgName}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(imgBase64);
        req.flush(null, mockErrorResponse);
      });

});
