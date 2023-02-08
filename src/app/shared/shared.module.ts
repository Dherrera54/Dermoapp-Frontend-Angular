import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule, TranslateModule, MatInputModule, MatSelectModule
  ],
  declarations: [SwitchLangComponent],
  exports: [
    CommonModule,  TranslateModule,SwitchLangComponent

  ]
})
export class SharedModule { }
