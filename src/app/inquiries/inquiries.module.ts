import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { InquiriesListComponent } from './inquiries-list/inquiries-list.component';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InquiryImagesListComponent } from './inquiry-images-list/inquiry-images-list.component';
import { InquiryMedicListComponent } from './inquiry-medic-list/inquiry-medic-list.component';
import { InquiryDiagnoseComponent } from './inquiry-diagnose/inquiry-diagnose.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    SharedModule,
    TranslateModule,
    MatInputModule,
   
  ],
  declarations: [
    InquiriesListComponent,
    InquiryDetailComponent,
    InquiryImagesListComponent,
    InquiryMedicListComponent,
    InquiryDiagnoseComponent,
  ],
  exports: [
    InquiriesListComponent,
    InquiryDetailComponent,
    InquiryImagesListComponent,
    InquiryMedicListComponent,
    InquiryDiagnoseComponent,
  ],
})
export class InquiriesModule {}
