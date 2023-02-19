import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { InquiriesListComponent } from './inquiries-list/inquiries-list.component';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InquiryImagesListComponent } from './inquiry-images-list/inquiry-images-list.component';


@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [InquiriesListComponent, InquiryDetailComponent, InquiryImagesListComponent],
  exports: [InquiriesListComponent,InquiryDetailComponent,InquiryImagesListComponent]
})
export class InquiriesModule { }
