import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrobbleBulkComponent } from './containers/scrobble-bulk/scrobble-bulk.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ScrobbleBulkComponent
  }
];

@NgModule({
  declarations: [
    ScrobbleBulkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScrobbleBulkModule { }
