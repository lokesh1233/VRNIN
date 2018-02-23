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

  selectedIndex=0;
  TransModes=[];
  ngOnInit() {
 
  var that = this;

  window.VRNUserDB.collection('Params').find({'Domain':'TrnsprtMode'},{'modeNum':1,'modeTxt':1 }).execute().then(docs => {
    that.TransModes =  docs;
  })

 
  }
  
 createVRNData = {
  VRN:"100000900",
  MODEOFTRANSPORT:"RD",
  PURPOSE:"",
  SITE:"",
  VEHICLENUM:"",
  DRIVERNAME:"",
  DRIVERNUM:"",
  FLEETTYPE:"",
  IDPROOFNUM:"",
  IDPROOFTYPE:"",
  LRNUM:"",
  LRDATE:new Date(),
  LICENSENUM:"",
  VRNSTATUS:"",
  CHANGEDBY:"Bhaskar",
  CHANGEDON:new Date(),
  CREATEDBY:'Bhaskar',
  CREATEDON:new Date(),
  TRANSPORTER:"",
  TRANSPORTERCODE:""
}


createVRNDtlData = {
  VRN:"100000900",
  CHECKINOUT:"I",  
  VEHICLESTATUS:"L",
  SEALCONDITION:"I",
  REMARKS:"",
  NUMOFBOXES:"",
  SEALNUM:"",
  VEHICLESECURITYTIME: new Date(),
  VEHICLESECURITYDATE: new Date(),
  VEHICLECHECKINDATE: new Date(),
  VEHICLECHECKINTIME: new Date(),
  VRNCHECKINBY: 'Bhaskar'
}

licenseSelection(){
  let LcnseNo = this.createVRNData.LICENSENUM;
  if(LcnseNo == ""){
    this.openSnackBar('Enter License Number', '');
     return;
  }

  var that = this;
  window.VRNUserDB.collection('License').find({'Licencenumber':Number(LcnseNo)},{'Lastname': 1,'Telephone': 1 }).execute().then(docs => {
    that.createVRNData.DRIVERNAME = docs.length>0?docs[0].Lastname:"";
    that.createVRNData.DRIVERNUM = docs.length>0?docs[0].Telephone:"";
  })
  
}

vehicleSelection(){
  let vhcle = this.createVRNData.VEHICLENUM;
  if(vhcle == ""){
    this.openSnackBar('Enter Vehicle Number', '');
     return;
  }

  var that = this;
  window.VRNUserDB.collection('Vehicle').find({'VehicleNumber':vhcle},{'Vendor': 1 }).execute().then(docs => {
    that.createVRNData.TRANSPORTER = docs.length>0?docs[0].Vendor:"";
    that.createVRNData.TRANSPORTERCODE = docs.length>0?docs[0].Vendor:"";
  })
  
}


switchHstl(evt){
  //this.createUserData.typeOfHstl=evt.value;
}

onSubmit(){
 
debugger;

this.createVRNData.PURPOSE = this.selectedIndex == 0 ? "Inbound" : "Outbound"; 
var that = this;
 window.VRNUserDB.collection('VRNHeader').insertOne(this.createVRNData).then(function(){
  that.openSnackBar('Succesflly placed VRN', '');

  debugger;
});  

window.VRNUserDB.collection('VRNDetail').insertOne(this.createVRNDtlData).then(function(){
 debugger;
});  

}

VRNCheckIn(){
  this.createVRNData.VRNSTATUS = "X";
  this.onSubmit();
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
