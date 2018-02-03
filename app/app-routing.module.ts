import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterComponent }   from './master/master.component';
import { RentDetailComponent }   from './rent-detail/rent-detail.component';
import { CreateUserComponent }   from './create-user/create-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/master', pathMatch: 'full' },
  { path: 'master', component: MasterComponent },
  { path: 'rentDetail', component: RentDetailComponent },
  { path: 'createUser', component: CreateUserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
