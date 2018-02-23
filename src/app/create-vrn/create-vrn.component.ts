import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AppComponent }   from '../app.component';

@Component({
   selector: 'app-create-user',
   templateUrl: './create-vrn.component.html',
   styleUrls: ['./create-vrn.component.css']
 })
export class CreateVRNComponent {
  constructor(public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
  let id = this.route.snapshot.paramMap.get('id');
  if(id != 'A'){
  //  this.createUserData = this.userComponent.getItem(id);
  }
  var that = this;

  window.VRNUserDB.collection('Params').find({'Domain':'TrnsprtMode'},{'modeNum':1,'modeTxt':1 }).execute().then(docs => {
    that.TransModes =  docs;
  })

  window.VRNUserDB.collection('Params').find({'Domain':'TrnsprtMode'},{'modeNum':1,'modeTxt':1 }).execute().then(docs => {
    that.TransModes =  docs;
  })
  
  }
  
 createVRNData = {
  owner_id:"",
  vrnnum:"",
  vehnum:"",
  purpose:"",
  transmode:"",
  vehstat:"",
  sealNo:"",
  fleetType:"",
  Transporter:"",
  sealCond:"",
  noOfBoxes:"",
  LicNo:"",
  DriverName:"",
  MobNo:"",
  LrNo:"",
  remarks:""
}


switchHstl(evt){
  //this.createUserData.typeOfHstl=evt.value;
}

onSubmit(){
  // window.VRNUserDB.collection('VRNHeader').insertOne(this.createVRNData).then(function(){
  //   debugger;
  // })

}

  // window.HostelUserDB.collection('UserList').insertOne(dta).then(function(){
  //   that.openSnackBar('Succesflly user '+ dta.fullName + ' created', '');
  //   that.fileUpload(fileString, id, MIMEType);
  //   that.router.navigate(['/master']);
  //   });   

  navigateBefore(evt){
   this.router.navigate(['/master']);
  }
}
