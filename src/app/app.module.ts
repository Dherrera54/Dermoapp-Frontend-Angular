import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicModule } from './medic/medic.module';
import { AppHeaderModule } from './app-header/app-header.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { InquiriesModule } from './inquiries/inquiries.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MedicService } from './medic/medic.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MedicModule,
    HttpClientModule,
    AppHeaderModule,
    InquiriesModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
 ],
  providers: [MedicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
