import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrobbleBulkComponent } from './containers/scrobble-bulk/scrobble-bulk.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ScrobbleBulkModule { }
