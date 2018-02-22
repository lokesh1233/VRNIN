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
  }

//   constructor(private heroService: HeroService) { }

 //  ngOnInit() {
//     this.getHeroes();

 createUserData = {
  owner_id:"",
   fullfillmentAmt:"",
   creationDate:new Date(),
   userID:"",
   fullName:"",
   joiningDte:"",
   mobileNo:"",
   RntAmount:"",
   DOB:"",
   OthrMobileNo:"",
  address:"",
  typeOfHstl:"Hostel/PG",
  hstlTypes:[{
      value:"Hostel/PG"
      },{
      value:"Outer"
      }]
}


switchHstl(evt){
  this.createUserData.typeOfHstl=evt.value;
}

onSubmit(){
  let dta = this.createUserData;
  if(dta.fullName == ''){
    this.openSnackBar('Enter full name', '');
    return;
  }else if(dta.mobileNo == ''){
    this.openSnackBar('Enter mobile no', '');
    return;
  }else if(dta.joiningDte == ''){
    this.openSnackBar('Enter joining date', '');
    return;
  }else if(dta.RntAmount == ''){ 
    this.openSnackBar('Enter Rent Amount', '');
    return;
  }
  //debugger;
  this.refurnfileXString(document.getElementById('fileUpload'));
 // var data 
  // this.router.navigate(['/master']);
  // debugger;
}

createNewUser(fileString, MIMEType){
  let dta = this.createUserData;
  //dta.imagePath = fileString;
  dta.fullfillmentAmt = dta.RntAmount
  dta.creationDate = new Date();
 // dta.imageType = MIMEType;
  let id = new Date().getTime().toString();
  dta.userID = id;
  delete dta.hstlTypes;
  dta.owner_id= id;
  var that = this;
  window.HostelUserDB.collection('UserList').insertOne(dta).then(function(){
    that.openSnackBar('Succesflly user '+ dta.fullName + ' created', '');
    that.fileUpload(fileString, id, MIMEType);
    that.router.navigate(['/master']);
    });   
}

fileUpload(fileString, id, MIMEType){
  if(fileString != ''){
    var imgData = {
      imageData: fileString,
      imageId: id,
      imageType: MIMEType,
      itemId: '',
      owner_id: id,
      userId: id
    }
  var that= this;
    window.HostelUserDB.collection('ImageData').insertOne(imgData).then(function(){
      that.openSnackBar('image uploaded succesfully', '');
      });  
  }

}

 refurnfileXString(fileUpload){
   var files = fileUpload.files;
 	  if (!files.length) {
 	   // alert('Please select a file!');
      this.createNewUser('', ''); 
      return;
 	  }
 	  var file = files[0];
     var MIMEType = file.type;
     var that = this;
 	//  // decode base64 string, remove space for IE compatibility
 	  var reader = new FileReader();
 	  reader.onload = function(readerEvt) {
 	//	// This is done just for the proof of concept
 	    var binaryString = readerEvt.target.result;
       var base64 = btoa(binaryString);
       that.createNewUser(base64, MIMEType);
 	   // var blobfile = atob(base64);
 	  };
 	  reader.readAsBinaryString(file);
 }

  navigateBefore(evt){
   this.router.navigate(['/master']);
  }


}
