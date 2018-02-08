import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterComponent }   from './master/master.component';
import { RentDetailComponent }   from './rent-detail/rent-detail.component';
import { CreateUserComponent }   from './create-user/create-user.component';
import { CreateItemComponent }   from './create-Item/create-Item.component';
import { ItemListComponent }   from './item-List/item-List.component';
import { UserListComponent }   from './user-List/user-List.component';


const routes: Routes = [
  { path: '', redirectTo: '/master', pathMatch: 'full' },
  { path: 'master', component: MasterComponent },
  { path: 'rentDetail', component: RentDetailComponent },
  { path: 'createUser/:id', component: CreateUserComponent },
  { path: 'createItem/:id', component: CreateItemComponent },
   { path: 'itemList', component: ItemListComponent },
   { path: 'userList', component: UserListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
