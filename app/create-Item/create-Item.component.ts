import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ItemListComponent }   from '../item-List/item-List.component';

@Component({
   selector: 'app-create-Item',
   templateUrl: './create-Item.component.html',
   styleUrls: ['./create-Item.component.css']
 })
export class CreateItemComponent {
constructor(public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public itemComponent: ItemListComponent) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(){ 

      let id = this.route.snapshot.paramMap.get('id');
      if(id != 'A'){
     //   this.createUserData = this.itemComponent.getItem(id);
      }


  }

 createUserData = {
  owner_id:"",
  Amount:"",
  ItemId:"",
  ItemName:"",
  imagePath:"",
  imageType:"",
  ingredient:""
}


onSubmit(){
  let dta = this.createUserData;
  if(dta.ItemName == ''){
    this.openSnackBar('Enter item name', '');
    return;
  }else if(dta.Amount == ''){ 
    this.openSnackBar('Enter Amount', '');
    return;
  }
  //debugger;
  this.refurnfileXString(document.getElementById('ItemfileUpload'));
  // var data 
  // this.router.navigate(['/master']);
  // debugger;
}

createNewUser(fileString, MIMEType){
  let dta = this.createUserData;
  dta.imagePath = fileString;
  dta.imageType = MIMEType;
  let id = window.HostelClient.authedId();
  dta.ItemId = id;
  dta.owner_id= id;
  var that = this;
  window.HostelUserDB.collection('ItemList').insertOne(dta).then(function(){
    that.openSnackBar('Succesflly '+ dta.ItemName + ' item created', '');
    that.router.navigate(['/master']);
    }).catch(err => {
      console.error(err)
      that.openSnackBar(err, '');
    });   
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
 	//		// This is done just for the proof of concept
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
