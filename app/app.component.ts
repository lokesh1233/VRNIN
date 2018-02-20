import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {}
    
    ngOnInit(){ 
      this.loadVRNMasterList()
       }

  loadVRNMasterList(){
    var that = this;
    window.VRNUserDB.collection('VRNHeader').find({}).execute().then(docs => {
      that.createUserData=docs;
    });
  }

  createUserData = []

  onVRNSelected(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";
    this.router.navigate(['/detail']);
  }  

}

