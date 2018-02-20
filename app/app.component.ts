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

  createUserData = [{
    VrnNo:'1000000123',
    VhcleNo: 'MH67AD1234',
    status:'01OutBound',
    class:'mat-list-item selectedIndex'
  },{
    VrnNo:'1000000124',
    VhcleNo: 'MH67AD1235',
    status:'51OutBound',
    class:'mat-list-item'
  },{
    VrnNo:'1000000125',
    VhcleNo: 'MH67AD1236',
    status:'01OutBound',
    class:'mat-list-item'
  }]

  onVRNSelected(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";


    this.router.navigate(['/detail']);
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

