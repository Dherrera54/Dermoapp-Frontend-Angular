/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicLoginComponent } from './medic-login.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {  TranslateModule } from '@ngx-translate/core';
import { MedicService } from '../medic.service';
import { of } from 'rxjs';


describe('MedicLoginComponent', () => {
  let component: MedicLoginComponent;
  let fixture: ComponentFixture<MedicLoginComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicLoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,SharedModule, TranslateModule.forRoot()],
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
      "logIn"
    );
  });
  it('Should have an element cancelbutton', () => {

    expect(debug.query(By.css('#cancelBtn')).nativeElement.innerText).toContain(
      "cancel"
    );
  });
  it('Should have an element Log in button', () => {

    expect(debug.query(By.css('#logInBtn')).nativeElement.innerText).toContain(
      "enter"
    );
  });

  it('Navigate to /signup', inject([Router], (mockRouter: Router) => {

  const spy = spyOn(mockRouter, 'navigate').and.stub();

  component.goRegister();

  expect(spy.calls.first().args[0]).toContain(`/singup/`);

  }));

  it('Navigate to /home', inject([Router], (mockRouter: Router) => {

    const spy = spyOn(mockRouter, 'navigate').and.stub();

    component.goHome();

    expect(spy.calls.first().args[0]).toContain(`/`);

    }));

    it('should set owned to true if medic has the selected inquiry', inject([MedicService], (medicService: MedicService) => {

      const email:string="test@email.com"
      const password:string="testPassword1!"

      let spy = spyOn(medicService, 'userLogIn').and.returnValue(of({token:"test-token"}));


      component.onLogInMedic(email, password);

      expect(component.error).toBeFalsy();
      expect(spy.calls.first().args[0]).toBe("test-token");
    }));



});
