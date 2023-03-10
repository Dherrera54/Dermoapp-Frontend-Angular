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
    const medicServiceSpy = jasmine.createSpyObj('MedicService', ['userSignUp', 'medicCreate', 'imgUpload']);
    let toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [ MedicSingupComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: MedicService, useValue: medicServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }},

          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {params: {id: 100}}
            }
          },
          {provide: FormBuilder},
          {provide: ToastrService},

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
      expect(component.imgFiles[0]).toBeDefined();
      expect(component.imgFiles[0]).toContain('data:text/plain;base64,dGVzdCBjb250ZW50');
    });

    it('should set the selected file name', () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [mockFile] } };
      component.catchFile(mockEvent);
      expect(component.selectedFileName).toEqual('test.txt');
    });

    it('should handle empty file list', () => {
      const mockEvent = { target: { files: [] } };
      component.catchFile(mockEvent);
      expect(component.imgFiles[0]).toBeUndefined();
      expect(component.selectedFileName).toBeUndefined();
    });


});
