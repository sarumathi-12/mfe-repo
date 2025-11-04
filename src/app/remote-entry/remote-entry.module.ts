import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryRoutingModule } from './remote-entry-routing.module';
import { RemoteEntryComponent } from './remote-entry.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RemoteEntryComponent },
    ]),
    RemoteEntryRoutingModule
  ]
})
export class RemoteEntryModule { }
