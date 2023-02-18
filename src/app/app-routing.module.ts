import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicSingupComponent } from './medic/medic-singup/medic-singup.component';
import { MedicLoginComponent } from './medic/medic-login/medic-login.component';
import { HomeComponent } from './home/home.component';
import { InquiriesListComponent } from './inquiries/inquiries-list/inquiries-list.component';
import { InquiryImagesListComponent } from './inquiries/inquiry-images-list/inquiry-images-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: MedicLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'singup',
    component: MedicSingupComponent,
    pathMatch: 'full'
  },
  {
    path: 'inquiries/:medicId/:medicSpecialty/:userToken',
    component: InquiriesListComponent,
    pathMatch: 'full'
  },
  {
    path: 'inquiries/:medicId/:medicSpecialty/:inquiryid/images/:userToken',
    component: InquiryImagesListComponent,
    pathMatch: 'full'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
