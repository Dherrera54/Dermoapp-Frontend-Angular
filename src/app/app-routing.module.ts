import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicSingupComponent } from './medic/medic-singup/medic-singup.component';

const routes: Routes = [
  {
    path: '',
    component: MedicSingupComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
