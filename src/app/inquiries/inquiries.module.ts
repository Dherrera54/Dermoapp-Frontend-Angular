import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { InquiriesListComponent } from './inquiries-list/inquiries-list.component';


@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule
  ],
  declarations: [InquiriesListComponent],
  exports: [InquiriesListComponent]
})
export class InquiriesModule { }
