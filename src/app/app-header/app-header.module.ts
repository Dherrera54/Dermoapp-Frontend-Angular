import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderLoggedComponent } from './header-logged/header-logged.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,SharedModule,
  ],
  declarations: [
    HeaderComponent,
    HeaderLoggedComponent
  ],
  exports: [
    HeaderComponent,
    HeaderLoggedComponent
  ]
})
export class AppHeaderModule { }
