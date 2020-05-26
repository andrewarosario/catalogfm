import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bulk'
  },
  {
    path: 'bulk',
    loadChildren: () => import('./scrobble-bulk/scrobble-bulk.module').then(m => m.ScrobbleBulkModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScrobbleModule { }
