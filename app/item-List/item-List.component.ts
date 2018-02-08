import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
   selector: 'app-item-List',
   templateUrl: './item-List.component.html',
   styleUrls: ['./item-List.component.css']
 })

export class ItemListComponent implements OnInit{
constructor(public snackBar: MatSnackBar, private router: Router, public sanitizer: DomSanitizer) {}
ngOnInit(){ 
  this.readItemListData();
}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onRowClicked(evt){
    debugger;
  }

 createUserData = [{
   ItemName:"",
    Amount:"",
    imagePath:""
  }]

b64toBlob(base64, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
      var byteCharacters = atob(base64)
      var byteArrays = [];
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  } 


readItemListData(){
 var that = this;
window.HostelUserDB.collection('ItemList').find({}).execute().then(docs => {
 debugger;
that.imageRedefiningdata(docs);
});
}

imageRedefiningdata(docs){

  var img;
 for(var i=0;i<docs.length;i++){
  img = this.b64toBlob(docs[i].imagePath, docs[i].imageType, 512);
  docs[i].imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(img));
 }
 this.createUserData=docs;
  
}



// createNewUser(fileString, MIMEType){
//   let dta = this.createUserData[0];
//   //dta.imagePath = fileString;
//   //dta.imageType = MIMEType;
//   let id = window.HostelClient.authedId();
//   //dta.ItemId = id;
//   //dta.owner_id= id;
//   var that = this;
//   window.HostelUserDB.collection('ItemList').insertOne(dta).then(function(){
//     that.openSnackBar('Succesflly user '+ dta.ItemName + ' created', '');
//     that.router.navigate(['/master']);
//     });   
// }

//  refurnfileXString(fileUpload){
//    var files = fileUpload.files;
//  	  if (!files.length) {
//  	   // alert('Please select a file!');
//       this.createNewUser('', ''); 
//       return;
//  	  }
//  	  var file = files[0];
//      var MIMEType = file.type;
//      var that = this;
//  	//  // decode base64 string, remove space for IE compatibility
//  	  var reader = new FileReader();
//  	  reader.onload = function(readerEvt) {
//  	//		// This is done just for the proof of concept
//  	    var binaryString = readerEvt.target.result;
//        var base64 = btoa(binaryString);
//        that.createNewUser(base64, MIMEType);
//  	   // var blobfile = atob(base64);
//  	  };
//  	  reader.readAsBinaryString(file);
//  }

  navigateBefore(evt){
   this.router.navigate(['/master']);
  }


}
