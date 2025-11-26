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
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProposalnameDialogComponent } from './proposalname-dialog/proposalname-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgxMaskModule } from 'ngx-mask';
import { AprVerificationdateDialogComponent } from './apr-verificationdate-dialog/apr-verificationdate-dialog.component';
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from '../config/currency-mask.config';

@NgModule({
  declarations: [
    DebtComponent,
    GeneralInfoComponent,
    HeaderComponent,
    ProposalnameDialogComponent,
    AprVerificationdateDialogComponent
  ],
  imports: [
    CommonModule,
    DebtRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    GridModule,
    FormsModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class DebtModule { }
