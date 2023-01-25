import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicModule } from './medic/medic.module';
import { AppHeaderModule } from './app-header/app-header.module';
import { HomeComponent } from './home/home.component';

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
    AppHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
