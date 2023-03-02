import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { InquiryDetailComponent } from './inquiry-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicService } from 'src/app/medic/medic.service';
import { Inquiry } from '../inquiriy';
import { of } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient';

describe('InquiryDetailComponent', () => {
  let component: InquiryDetailComponent;
  let fixture: ComponentFixture<InquiryDetailComponent>;
  let medicService: MedicService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryDetailComponent ],
      imports:[ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
               {provide: ToastrService},
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate age correctly for a given birth date', () => {
    const birthDate = '1990-01-01';
    const age = component.calculateAge(birthDate);
    expect(age).toEqual(32); // change this to the expected age based on current year
  });

  it('should return 0 when birth date is not provided', () => {
    const age = component.calculateAge('');
    expect(age).toEqual(0);
  });


  it('should set owned to true if inquiry belongs to medic', () => {

    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: 'test',
      country: 'test',
      profilePicture: 'test'
    }
    const inquiry: Inquiry = {
      id: '1',
      shape: 'Example Shape',
      numberOfInjuries: '2',
      distribution: 'Example Distribution',
      comment: 'Example Comment',
      image: 'Example Image',
      creationDate: '2022-02-23T08:00:00.000Z',
      typeOfInjury: 'Example Type',
      specialty: 'Example Specialty',
      assigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };
    // Arrange
    component.medicInquiries=[inquiry,
      inquiry,
      inquiry,
      inquiry ,
      inquiry,
      component.selectedInquiry]


    // Act
    component.checkMedicInquiries();

    // Assert
    expect(component.owned).toBe(true);
  });

  it('should set owned to false if inquiry does not belong to medic', () => {

    const patient: Patient={
      id: '22',
      name: 'test',
      birthDate: 'test',
      country: 'test',
      profilePicture: 'test'
    }
    const inquiry: Inquiry = {
      id: '1',
      shape: 'Example Shape',
      numberOfInjuries: '2',
      distribution: 'Example Distribution',
      comment: 'Example Comment',
      image: 'Example Image',
      creationDate: '2022-02-23T08:00:00.000Z',
      typeOfInjury: 'Example Type',
      specialty: 'Example Specialty',
      assigned: false,
      diagnosis: 'Initial Diagnosis',
      injuryQuantity: '',
      patient: patient

    };

    // Arrange
    component.medicInquiries=[inquiry,
      inquiry,
      inquiry,
      inquiry,
      inquiry,
      inquiry]

    // Act
    component.checkMedicInquiries();

    // Assert
    expect(component.owned).toBe(false);
  });


});


