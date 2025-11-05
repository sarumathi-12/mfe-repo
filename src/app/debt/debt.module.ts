import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtComponent } from './debt.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DebtComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DebtComponent }]),
    DebtRoutingModule
  ]
})
export class DebtModule { }
