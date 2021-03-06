import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AppComponent }   from '../app.component';

@Component({
   selector: 'app-create-user',
   templateUrl: './create-vrn.component.html',
   styleUrls: ['./create-vrn.component.css']
 })
export class CreateVRNComponent {

  agencyCtrl: FormControl;
  filteredAgencies : Observable<any[]>;
  constructor(public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent, public dialog: MatDialog) {
    this.agencyCtrl = new FormControl();
    var that = this;
    this.filteredAgencies = this.agencyCtrl.valueChanges.pipe(
      startWith(''),
      map(agency => that.filterAgencies(agency))
    );
}

filterAgencies(name: string) {
  debugger;
  var that = this;
  // window.VRNUserDB.collection('Transporter').find({$or:[{'Vendor':name},{'Name1':name }]}).execute().then(docs => {
  //   that.filteredAgencies = docs;
  // })

  if(name == undefined){
    return;
  }
 
  return this.agencies.filter(agency =>
    agency.Name1.toLowerCase().indexOf(name.toLowerCase()) === 0);
}


agencies = [];

  // filterStates(name: string) {
  //   return this.states.filter(state =>
  //     state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  // }
  

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
  this.agenciesData();
  }

agenciesData(){
  var that = this;
   window.VRNUserDB.collection('Transporter').find({}).execute().then(docs => {
     that.agencies = docs;
   })
}


 createVRNData = {
  VRN:"",
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
  VRN:"",
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

var cnt = window.VRNUserDB.collection('VRNHeader').count();
setTimeout(function(){
  debugger;
that.createVRNData.VRN = (100000900 + cnt.__zone_symbol__value).toString(); 

that.createVRNDtlData.VRN = that.createVRNData.VRN;
 window.VRNUserDB.collection('VRNHeader').insertOne(that.createVRNData).then(function(){
  that.openSnackBar('Succesflly placed VRN', '');
  that.appComponent.loadVRNMasterList();
  window.VRNUserDB.collection('VRNDetail').insertOne(that.createVRNDtlData).then(function(){
    debugger;
   });  
  debugger;
});  

},1500)
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
licenseRegionData = [];
// createNewLicense = {
//   Licencenumber : this.createVRNData.LICENSENUM,
//   Lastname : '',
//   Validto : '',
//   MobileNum : '',
//   ReasonCode : ''

// }

  createLicenseDta(): void{
    var that = this;
    // window.VRNUserDB.collection('LicenseRegion').find({}).execute().then(docs => {
    //   that.licenseRegionData =  docs;
    // })

    if(that.createVRNData.LICENSENUM == ''){
      that.openSnackBar('Enter license number', '');
      return;
    }

    let dialogRef = this.dialog.open(CreateLicenseDialog, {
      width: '500px',
      data: { Licencenumber: that.createVRNData.LICENSENUM ,licenseRegionData: that.licenseRegionData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      console.log('The dialog was closed');
    //  this.animal = result;
    });
  }

}

@Component({
  selector: 'create-License-Dialog',  
  templateUrl: './create-License-Dialog.html',
  styleUrls: ['./create-vrn.component.css']
})
export class CreateLicenseDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateLicenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,public createVRNComponent: CreateVRNComponent) { }


    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  licenseRegionData=[];
   createNewLicense = {
    Licencenumber:this.data.Licencenumber,
     Lastname : '',
     Validto : '',
     Telephone  : '',
     Rg  : ''
   }
  ngOnInit() {
  var that = this;
  window.VRNUserDB.collection('LicenseRegion').find({}).execute().then(docs => {
    that.licenseRegionData =  docs;
  })
}

onSubmit() {
  var that = this;
  var dta = this.createNewLicense;

  if(dta.Lastname == '' || dta.Rg == ''|| dta.Telephone == '' || dta.Validto == '' ){
    that.openSnackBar('Enter required fields', '');
    return;
  }

  window.VRNUserDB.collection('License').insertOne(this.createNewLicense).then(docs => {
    debugger;
      that.openSnackBar('Succesflly created license', '');
      that.createVRNComponent.createVRNData.DRIVERNUM = dta.Telephone;
      that.createVRNComponent.createVRNData.DRIVERNAME = dta.Lastname;
      that.dialogRef.close();
  })
}

onClose() {
  this.dialogRef.close();
}

}
