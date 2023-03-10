/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, of} from 'rxjs';

import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, TranslateModule.forRoot()],
      providers: [
            ]


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should have an element register', () => {

    expect(debug.query(By.css('#registerBtn')).nativeElement.innerText).toContain(
      "signUp"
    );
  });
  it('Should have an element Log in', () => {

    expect(debug.query(By.css('#logInBtn')).nativeElement.innerText).toContain(
      "logIn"
    );
  });
  it('should navigate to login', inject([Router], (mockRouter: Router) => {
    fixture.detectChanges();
    const spy = spyOn(mockRouter, 'navigate').and.stub();

    component.goTo('LogIn');
    expect(spy.calls.first().args[0]).toContain(`/login/`);
  }));
  it('should navigate to signup', inject([Router], (mockRouter: Router) => {
    fixture.detectChanges();
    const spy = spyOn(mockRouter, 'navigate').and.stub();

    component.goTo('singUp');
    expect(spy.calls.first().args[0]).toContain(`/singup/`);
  }));
});
