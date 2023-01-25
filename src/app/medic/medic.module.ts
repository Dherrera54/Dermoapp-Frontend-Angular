import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicSingupComponent } from './medic-singup/medic-singup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicLoginComponent } from './medic-login/medic-login.component';
import { AppHeaderModule } from '../app-header/app-header.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppHeaderModule
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
