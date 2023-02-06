/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { asNativeElements, DebugElement } from '@angular/core';

import { MedicSingupComponent } from './medic-singup.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


describe('MedicSingupComponent', () => {
  let component: MedicSingupComponent;
  let fixture: ComponentFixture<MedicSingupComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicSingupComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule],
      providers: [
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test a form group elemnte count',()=>{
    const FormElement = fixture.debugElement.nativeElement.querySelector('#medicForm');
    const inputElements = FormElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(8); })

  /*it('CHECK LOGH IN FORM IS VALID WHE VALIDATIONS ARE FULFILLED',()=>{
    const createMedicFormElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#medicForm');
    const inputElements = FormElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(8); })*/

});
