import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterComponent }   from './master/master.component';
import { RentDetailComponent }   from './rent-detail/rent-detail.component';
import { CreateUserComponent }   from './create-user/create-user.component';
import { CreateItemComponent }   from './create-Item/create-Item.component';
import { ItemListComponent }   from './item-List/item-List.component';


const routes: Routes = [
  { path: '', redirectTo: '/master', pathMatch: 'full' },
  { path: 'master', component: MasterComponent },
  { path: 'rentDetail', component: RentDetailComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'createItem', component: CreateItemComponent }
  // ,
  // { path: 'itemList', component: ItemListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
