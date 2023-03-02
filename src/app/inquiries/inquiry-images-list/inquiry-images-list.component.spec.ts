/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InquiryImagesListComponent } from './inquiry-images-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('InquiryImagesListComponent', () => {
  let component: InquiryImagesListComponent;
  let fixture: ComponentFixture<InquiryImagesListComponent>;
  let debug: DebugElement;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryImagesListComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,  HttpClientModule,SharedModule, TranslateModule.forRoot()],
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
    fixture = TestBed.createComponent(InquiryImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to inquiry details if origin is inquiry-list', () => {
    component.origin = 'inquiry-list';
    component.medicId = 'medic123';
    component.specialty = 'dermatology';
    component.inquiryId = 'inquiry123';
    component.token = 'token123';

    component.return();

    expect(router.navigate).toHaveBeenCalledWith([`/inquiries/${component.medicId}/${component.specialty}/${component.inquiryId}/${component.token}`]);
  });

  it('should navigate to claimed inquiries if origin is not inquiry-list', () => {
    component.origin = 'some-other-origin';
    component.medicId = 'medic123';
    component.specialty = 'dermatology';
    component.inquiryId = 'inquiry123';
    component.token = 'token123';

    component.return();

    expect(router.navigate).toHaveBeenCalledWith([`/inquiries/${component.medicId}/${component.specialty}/${component.inquiryId}/${component.token}/claimed`]);
  });
});
