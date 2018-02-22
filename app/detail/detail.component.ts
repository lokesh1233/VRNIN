import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { AppComponent }   from '../app.component';

@Component({
  selector: 'app-master',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent) {}
  
  ngOnInit(){ 
  //  this.readListData('UserList', 'createUserData');
  //  this.readListData('ItemList', 'createItemData');
  //  this.readListData('RentDetails', 'ELEMENT_DATA');
    //this.readRentDetails();

    let id = this.route.snapshot.paramMap.get('id');
    if(id != 'A'){
      this.vrnMaterData = this.appComponent.getMasterItem(id);
    }

    this.loadVRNDetail(id);
  
  }

  vrnMaterData = {};
  selectedIndex = null;
  selectedUser = null;
  readUserItemData = 0;
  createUserData = [];
  createItemData = [];
  ELEMENT_DATA  = [];
  displayedColumns = ['user', 'Item', 'Amount'];
  userIds = [];
  itemIds = []; 
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  loadVRNDetail(id){
    debugger;
    var that = this;
    window.VRNUserDB.collection('VRNDetail').find({VRN:Number(id)}).execute().then(docs => {
      that.createUserData=docs;
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  readListData(entity, createData){
    var that = this;
    window.HostelUserDB.collection(entity).find({}).execute().then(docs => {
      ++that.readUserItemData;
      that.imageIdentifyingData(docs, createData);
    });
  }

  // readItemListData(){
  //   var that = this;
  //   window.HostelUserDB.collection('ItemList').find({}).execute().then(docs => {
  //    that.imageIdentifyingData(docs, "createItemData");
  //    });
  // }

  // readRentDetails(){
  //     var that = this;
  //    window.HostelUserDB.collection('RentDetails').find({}).execute().then(docs => {
  //     debugger;
  //     that.ELEMENT_DATA = docs;
  //     that.dataSource = new MatTableDataSource(that.ELEMENT_DATA);
  //   });
  // } 

  imageIdentifyingData(docs,selectedData){
    var img;
    for(var i=0;i<docs.length;i++){
      docs[i].class = 'mat-list-item';
      docs[i].selectedItem = false;
      docs[i].imageData = '';

      if(docs[i].userID != '' && docs[i].userID != null){
        this.userIds.push(docs[i].userID) 
      }else if(docs[i].ItemId != '' && docs[i].ItemId != null){
        this.itemIds.push(docs[i].ItemId); 
      }
     }
    this[selectedData]=docs;
    if('ELEMENT_DATA' == selectedData){
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }

    this.userIds = this.removeDuplicates(this.userIds);
    this.itemIds = this.removeDuplicates(this.itemIds);

    if(this.readUserItemData == 3){
      this.readImageData();
    }
  }

  removeDuplicates(data){
    var retArr = [];
    for(var i=0;i<data.length;i++){
      if(retArr.indexOf(data[i]) == -1)
      retArr.push(data[i]);
    }
    return retArr;
  }

  readImageData(){
    var that = this;
     window.HostelUserDB.collection('ImageData').find({userId:{$in:this.userIds}},{imageId:1}).execute().then(docs => {
      debugger;
      that.filterImageData(docs);
    });

    window.HostelUserDB.collection('ImageData').find({itemId:{$in:this.itemIds}},{imageId:1}).execute().then(docs => {
      debugger;
      that.filterImageData(docs);
    });
  }

  filterImageData(docs){
    var imgStr = [];
    var imgDat = sessionStorage.getItem('ImageData');
    var datVal = imgDat != null?JSON.parse(imgDat):{}; 
    for(var i=0;i<docs.length;i++){
        if(datVal[docs[i].imageId] == undefined){
          imgStr.push(docs[i].imageId);
        }
    }

    if(imgStr.length>0){
      var that = this;
      window.HostelUserDB.collection('ImageData').find({imageId:{$in:imgStr}}).execute().then(docs => {
        that.imgDat_User_Item_Rent(docs);
      });
    }
  }

  imgDat_User_Item_Rent(docs){
    var usr = this.createUserData,
     itm = this.createItemData,
     det = this.ELEMENT_DATA, strDat,img;
    for(var j=0;j<docs.length;j++){
      strDat = {
        createUserData : [],
        createItemData : [],
        ELEMENT_DATA : []
      };
      for(var i=0;i<usr.length;i++){
        if(usr[i].userID == docs[j].userId){
          strDat['createUserData'].push(i);
        }
      }
      for(var i=0;i<itm.length;i++){
        if(itm[i].ItemId == docs[j].itemId){
          strDat['createItemData'].push(i);
        }
      }
      for(var i=0;i<det.length;i++){
        if(det[i].userID == docs[j].userId){
          strDat['ELEMENT_DATA'].push(i);
        }
      }

      if( strDat['createUserData'].length > 0 || strDat['createItemData'].length > 0 || strDat['ELEMENT_DATA'].length >0){
        img = this.b64toBlob(docs[j].imageData, docs[j].imageType, 512);
        this.conversionToImage(URL.createObjectURL(img), strDat, docs[j].imageId);
      }
    }
  }
   
  onUserClicked(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";
    this.selectedUser = data;
  }

  onItemClicked(evt){
    evt.selectedItem  =   evt.selectedItem  == true?false: true;
  }

  onSubmit(){
    if(this.selectedUser == null){
      this.openSnackBar('Select User', '');
       return;
    }
    var selItmData = [], paymentAmt = 0;
    var itm = this.createItemData;
    var postData = [];
    for(var i=0; i<itm.length; i++){
      if(itm[i].selectedItem == true){
         postData.push({
          ItemId : itm[i].ItemId,
          paymentAmt: itm[i].Amount.toString(),
          paymentDate: new Date(),
          userID : this.selectedUser.userID,
          paymentDesc : itm[i].ItemName
         });
        paymentAmt += Number(itm[i].Amount);
      }
    }
    if(postData.length == 0){
      this.openSnackBar('Select Item', '');
      return;
    }
    var that = this;
    window.HostelUserDB.collection('RentDetails').insertMany(postData).then(function(){
      that.openSnackBar('Succesflly placed '+ that.selectedUser.fullName + ' order', '');
      debugger;
    });  
  }


  conversionToImage(blobUrl, dtaVal, imageId){
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'blob';
    var that = this; 
    xhr.onload = function() {
       var recoveredBlob = xhr.response;
       var reader = new FileReader;
       reader.onload = function() { debugger;
         var blobAsDataUrl = reader.result;
         for(var i in dtaVal){
           for(var j=0;j<dtaVal[i].length;j++){
            that[i][dtaVal[i][j]].imageData = blobAsDataUrl
           }
         }
         sessionStorage.setItem(imageId,blobAsDataUrl); 
       };
       reader.readAsDataURL(recoveredBlob);
    };
    xhr.open('GET', blobUrl);
    xhr.send();
  }

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
}

export interface Element {
  paymentAmt: string;
  fullName: string;
  ItemName: string;
}




