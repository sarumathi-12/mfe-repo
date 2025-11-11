import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtComponent } from './debt.component';
import { RouterModule } from '@angular/router';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DebtComponent,
    GeneralInfoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DebtRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DebtModule { }
