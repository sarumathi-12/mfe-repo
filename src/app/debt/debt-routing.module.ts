import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtComponent } from './debt.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '',
    component: DebtComponent,
    children: [
      { path: 'header', component: HeaderComponent },
      { path: 'general-info', component: GeneralInfoComponent },
      { path: '', redirectTo: 'general-info', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtRoutingModule { }
