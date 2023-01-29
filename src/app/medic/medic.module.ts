import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicSingupComponent } from './medic-singup/medic-singup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicLoginComponent } from './medic-login/medic-login.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppHeaderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],

  declarations: [
    MedicSingupComponent,
    MedicLoginComponent
  ],

  exports:[
    MedicSingupComponent,
    MedicLoginComponent
  ]
})
export class MedicModule { }
