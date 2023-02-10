import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { InquiriesListComponent } from './inquiries-list/inquiries-list.component';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';


@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule
  ],
  declarations: [InquiriesListComponent, InquiryDetailComponent],
  exports: [InquiriesListComponent,InquiryDetailComponent]
})
export class InquiriesModule { }
