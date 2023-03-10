/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { asNativeElements, DebugElement } from '@angular/core';

import { MedicSingupComponent } from './medic-singup.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpErrorResponse } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import {  TranslateModule } from '@ngx-translate/core';
import { MedicService } from '../medic.service';
import { of } from 'rxjs';


describe('MedicSingupComponent', () => {
  let component: MedicSingupComponent;
  let fixture: ComponentFixture<MedicSingupComponent>;
  let debug: DebugElement;
  let medicService: jasmine.SpyObj<MedicService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;


  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success']);


    TestBed.configureTestingModule({
      declarations: [ MedicSingupComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,

        { provide: ToastrService, useValue: toastrServiceSpy },


        {provide: FormBuilder},


      ]

    })
    .compileComponents();
    medicService = TestBed.inject(MedicService) as jasmine.SpyObj<MedicService>;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test a form group elemnt count',()=>{
    const FormElement = fixture.debugElement.nativeElement.querySelector('#medicForm');
    const inputElements = FormElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(8); });

    it('should call error method of toastr service with correct parameters', () => {
      const errorMsg = 'An error occurred';
      component.showError(errorMsg);
      expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMsg, 'Error');
    });

    it('should call success method of toastr service with correct parameters', () => {
      const successMsg = 'Operation successful';
      component.showSuccess(successMsg);
      expect(toastrServiceSpy.success).toHaveBeenCalledWith(successMsg, 'Registro exitoso');
    });

    it('should navigate to login', inject([Router], (mockRouter: Router) => {

      const spy = spyOn(mockRouter, 'navigate').and.stub();

      component.goLogIn();
      expect(spy.calls.first().args[0]).toContain(`/login/`);
    }));

    it('should capture the selected file', () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [mockFile] } };
      component.catchFile(mockEvent);
      expect(component.imgFiles[0]).toBeUndefined();
    });

    it('should set the selected file name', () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [mockFile] } };
      component.catchFile(mockEvent);
      expect(component.selectedFileName).toEqual('test.txt');
    });
    it('should call medicService.medicCreate() with the correct parameters',  inject([MedicService], (medicService: MedicService) => {
      let spy = spyOn(medicService, 'medicCreate').and.returnValue(of(null));

      component.createMedic();

      expect(medicService.medicCreate).toHaveBeenCalledWith(
        component.medicForm.get('name')?.value,
        component.medicForm.get('lastName')?.value,
        component.medicForm.get('country')?.value,
        component.medicForm.get('profesionalId')?.value,
        component.profilePicUrl,
        component.medicForm.get('email')?.value,
        component.medicForm.get('password')?.value,
        component.medicForm.get('specialty')?.value
      );
    }));
    it('should create medic with default profile picture when profile picture is not provided', inject([MedicService], (medicService: MedicService) => {
      let medicServiceSpy = spyOn(medicService, 'userSignUp').and.returnValue(of(null));
      const mockResponse = {};
      const email = 'test@test.com';
      const password = '123456';
      const confirmPassword = '123456';
      const name= 'test';
      const lastName= 'test';
      const country= 'test';
      const profesionalId='test';
      const specialty='test';
      const formValues = {
        email: email,
        password: password,
        confirmPassword:confirmPassword,
        profilePicture: '',
        name:name,
       lastName:lastName,
       country:country,
       profesionalId:profesionalId,
       specialty:specialty

      };
      component.medicForm.setValue(formValues);
      medicServiceSpy.and.returnValue(of(mockResponse));
      component.registerMedic();
      expect(medicService.userSignUp).toHaveBeenCalledWith(email, password, 'Medico');

    }));




});
