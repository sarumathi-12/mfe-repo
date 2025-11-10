import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtComponent } from './debt.component';
import { RouterModule } from '@angular/router';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatLegacyTabsModule } from '@angular/material/legacy-tabs';
import { HeaderComponent } from './header/header.component';


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
    MatLegacyTabsModule
  ]
})
export class DebtModule { }
