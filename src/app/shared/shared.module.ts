import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SharedSelectComponent } from './components/shared-select/shared-select.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    SharedSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule
  ],
  exports: [
    SharedSelectComponent  
  ]
})
export class SharedModule {}
