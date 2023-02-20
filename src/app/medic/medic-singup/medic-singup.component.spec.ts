/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let toastrService: jasmine.SpyObj<ToastrService>;


  beforeEach(async(() => {
    const medicServiceSpy = jasmine.createSpyObj('MedicService', ['userSignUp', 'medicCreate', 'imgUpload']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

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
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
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

 



});
