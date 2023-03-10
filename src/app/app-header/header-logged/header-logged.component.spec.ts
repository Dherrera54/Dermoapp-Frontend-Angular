/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderLoggedComponent } from './header-logged.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, of} from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderLoggedComponent', () => {
  let component: HeaderLoggedComponent;
  let fixture: ComponentFixture<HeaderLoggedComponent>;
  let debug: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLoggedComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,SharedModule, TranslateModule.forRoot()],
      providers: [
        /* {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }},

          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {params: {id: 100}}
            }
          }, */

      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLoggedComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('Should have an element inquiry', () => {

  expect(debug.query(By.css('#inquiryBtn')).nativeElement.innerText).toContain(
    "inquiries"
  );
});
it('Should have an element agenda', () => {

  expect(debug.query(By.css('#agendaBtn')).nativeElement.innerText).toContain(
    "agenda"
  );
});
it('Should have an element patients', () => {

  expect(debug.query(By.css('#patientBtn')).nativeElement.innerText).toContain(
    "patients"
  );
});
it('Should have an element Log Out', () => {

  expect(debug.query(By.css('#logOutBtn')).nativeElement.innerText).toContain(
    "logOut"
  );
});

it('should navigate to inquiries', inject([Router], (mockRouter: Router) => {

  component.medicId="medic-id-test";
  component.specialty="specialty-test";
  component.token="token-test";
  fixture.detectChanges();
  const spy = spyOn(mockRouter, 'navigate').and.stub();

  component.goTo('inquiries');

  expect(spy.calls.first().args[0]).toContain(
    `/inquiries/${component.medicId}/${component.specialty}/inquiryId/${component.token}`,
  );
}));

it('should navigate to patients', inject([Router], (mockRouter: Router) => {
  component.medicId="medic-id-test";
  component.specialty="specialty-test";
  component.token="token-test";
  fixture.detectChanges();
  const spy = spyOn(mockRouter, 'navigate').and.stub();

  component.goTo('patients');
  expect(spy.calls.first().args[0]).toContain(
    `/inquiries/${component.medicId}/${component.specialty}/inquiryId/${component.token}/claimed`,
  );
}));

it('should navigate to login', inject([Router], (mockRouter: Router) => {
  component.medicId="medic-id-test";
  component.specialty="specialty-test";
  component.token="token-test";
  fixture.detectChanges();
  const spy = spyOn(mockRouter, 'navigate').and.stub();

  component.goTo('logOut');
  expect(spy.calls.first().args[0]).toContain(`/login/`);
}));
});
