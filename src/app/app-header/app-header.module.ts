import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderLoggedComponent } from './header-logged/header-logged.component';

@NgModule({
  imports: [
    CommonModule
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
