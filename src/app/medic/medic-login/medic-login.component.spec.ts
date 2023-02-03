/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicLoginComponent } from './medic-login.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, of} from 'rxjs';


describe('MedicLoginComponent', () => {
  let component: MedicLoginComponent;
  let fixture: ComponentFixture<MedicLoginComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicLoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
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


      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicLoginComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have an element log in header', () => {

    expect(debug.query(By.css('#logInHeader')).nativeElement.innerText).toContain(
      "Iniciar sesión"
    );
  });
  it('Should have an element cancelbutton', () => {

    expect(debug.query(By.css('#cancelBtn')).nativeElement.innerText).toContain(
      "Cancel"
    );
  });
  it('Should have an element Log in button', () => {

    expect(debug.query(By.css('#logInBtn')).nativeElement.innerText).toContain(
      "Ingresar"
    );
  });

  it('should test invalid login', () => {

    let hostElement = fixture.nativeElement;
    let userNameInput: HTMLInputElement = hostElement.querySelector('#user');
    let passwordInput: HTMLInputElement = hostElement.querySelector('#password');
    let logInBtn: HTMLButtonElement = hostElement.querySelector('#logInBtn')

    fixture.detectChanges();
    userNameInput.value="user@user.com";
    passwordInput.value="testtest";

    userNameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    logInBtn.click;

    expect(debug.query(By.css('#errorMsg')).nativeElement.innerText).toContain('Usuario o contraseña incorrectos');

  });
});
