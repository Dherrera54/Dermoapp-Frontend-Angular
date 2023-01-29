import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiriesComponent } from './inquiries/inquiries.component';
import { AppHeaderModule } from '../app-header/app-header.module';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule
  ],
  declarations: [InquiriesComponent],
  exports: [InquiriesComponent]
})
export class InquiriesModule { }
