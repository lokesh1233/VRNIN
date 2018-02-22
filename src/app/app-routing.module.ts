import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent }   from './detail/detail.component';
import { CreateVRNComponent }   from './create-vrn/create-vrn.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'createvrn', component: CreateVRNComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
