import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.css' ]
})
export class MasterComponent implements OnInit {
    ngOnInit(){ 
      this.readUserListData();
    //  var that = this;
    //   setTimeout(function(){ 
    //     that.readItemListData();
    //   },500)
    this.readItemListData();
    }

    selectedIndex = null;

    readItemListData(){
      var that = this;
     window.HostelUserDB.collection('ItemList').find({}).execute().then(docs => {
      debugger;
     that.imageRedefiningdata(docs, "createItemData");
     });
     }
    
    selectedUser=""
    
      onUserClicked(data){
       debugger;


       var dta = this.createUserData;

       for(var i=0;i<dta.length;i++){
          dta[i].class="notselected"
       }

      //  if (this.selectedIndex === null) {
      //   this.selectedIndex = data.userID;
      // }
      // else if (this.selectedIndex === data.userID) {
      //   this.selectedIndex = null;
      // }
      // else {
      //     this.selectedIndex = data.userID;
      // }
      data.class="selectedIndex";
      this.selectedIndex = "selectedIndex";
    }



      //  this.selectedUser = evt.userID;
      //   // this.router.navigate(['/createUser', evt.userID]);
      // }
    
      onItemClicked(evt){
        debugger;
        this.selectedUser = evt.itemID;
         // this.router.navigate(['/createUser', evt.userID]);
       }

     createUserData = []

      createItemData = []

      // createUserData = [{
      //   fullName:"",
      //   fullfillmentAmt:"",
      //    imagePath:"",
      //    class:""
      //  }]
 
      //  createItemData = [{
      //    ItemName:"",
      //    Amount:"",
      //    imagePath:""
      //  }]
    
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
    
    
    readUserListData(){
     var that = this;
    window.HostelUserDB.collection('UserList').find({}).execute().then(docs => {
     debugger;
    that.imageRedefiningdata(docs, "createUserData");
    });
    }
    
    imageRedefiningdata(docs,selectedData){
    
      var img;
     for(var i=0;i<docs.length;i++){
      img = this.b64toBlob(docs[i].imagePath, docs[i].imageType, 512);
     this.conversionToImage(URL.createObjectURL(img),docs[i]);
      docs[i].class = 'notselected';
     }
     this[selectedData]=docs;
      
    }
    
    
    conversionToImage(blobUrl, dtaVal){
      //var blob = new Blob(["Hello, world!"], { type: 'text/plain' });
      //var blobUrl = URL.createObjectURL(blob);
      
      var xhr = new XMLHttpRequest;
      xhr.responseType = 'blob';
      
      xhr.onload = function() {
         var recoveredBlob = xhr.response;
      
         var reader = new FileReader;
      
         reader.onload = function() { debugger;
           var blobAsDataUrl = reader.result;
           dtaVal.imagePath= blobAsDataUrl;
         };
      
         reader.readAsDataURL(recoveredBlob);
      };
      
      xhr.open('GET', blobUrl);
      xhr.send();
      }

  getHeroes(): void {
   // this.heroService.getHeroes()
   //   .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  matSelectionList() {
    debugger;
  }

  onSubmit(){

debugger;

    // let dta = this.createUserData;
    // if(dta.fullName == ''){
    //   this.openSnackBar('Enter full name', '');
    //   return;
    // }else if(dta.mobileNo == ''){
    //   this.openSnackBar('Enter mobile no', '');
    //   return;
    // }else if(dta.joiningDte == ''){
    //   this.openSnackBar('Enter joining date', '');
    //   return;
    // }else if(dta.RntAmount == ''){ 
    //   this.openSnackBar('Enter Rent Amount', '');
    //   return;
    // }
    // //debugger;
    // this.refurnfileXString(document.getElementById('fileUpload'));
   // var data 
    // this.router.navigate(['/master']);
    // debugger;
  }



}




