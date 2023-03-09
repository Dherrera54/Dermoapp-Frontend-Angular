/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
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
  let routerPath: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryImagesListComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,  HttpClientModule,SharedModule, TranslateModule.forRoot()],
      providers: [
   /*      {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }},

          {
            provide: ActivatedRoute,
            useClass: class {
              snapshot= {params: {id: 100}}
            }
          },
 */
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
  it('Navigate to /inquiry list', inject([Router], (mockRouter: Router) => {


    component.medicId="medic-id-test";
   component.specialty="specialty-test";
   component.origin="inquiry-list";
   component.token="token-test";
   component.inquiryId="inquiry-id-test"
   fixture.detectChanges();

 const spy = spyOn(mockRouter, 'navigate').and.stub();

 component.return();

 expect(spy.calls.first().args[0]).toContain(`/inquiries/medic-id-test/specialty-test/inquiry-id-test/token-test`);

}));
it('Navigate to /inquiry medic list', inject([Router], (mockRouter: Router) => {


 component.medicId="medic-id-test";
component.specialty="specialty-test";
component.origin="inquiry-medic-list";
component.token="token-test";
component.inquiryId="inquiry-id-test"
fixture.detectChanges();

const spy = spyOn(mockRouter, 'navigate').and.stub();

component.return();

expect(spy.calls.first().args[0]).toContain(`/inquiries/medic-id-test/specialty-test/inquiry-id-test/token-test/claimed`);

}));


});
