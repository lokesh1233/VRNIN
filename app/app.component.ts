import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  onRowClicked(evt){

    // if(evt.ind == 'X'){
    //   this.router.navigate([evt.router, 'A']);
    // }else{
      this.router.navigate([evt.router]);
    // }
   // drawer.toggle()
  }

  createHomeData = [{
    icon:"home",
    name:"My Home",
    router:"/master",
    ind:""
  },{   
    icon:"account_circle",
    name:"Users",
    router:"/userList",
    ind:"X"
  },{
    icon:"store",
    name:"Items",
    router:"/itemList",
    ind:"X"
  },{
    icon:"equalizer",
    name:"Report",
    router:"/Report",
    ind:""
  }]

  

}

