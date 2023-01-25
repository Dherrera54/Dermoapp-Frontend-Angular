import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicSingupComponent } from './medic-singup/medic-singup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [MedicSingupComponent],
  exports:[MedicSingupComponent]
})
export class MedicModule { }
