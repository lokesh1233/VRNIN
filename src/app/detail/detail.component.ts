import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { AppComponent }   from '../app.component';
import { FormsModule }    from '@angular/forms';

@Component({
  selector: 'app-master',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent) {
    window.thatDetail = this;
    this.route.params.subscribe(function(res){
      debugger;
      window.thatDetail.vrnMasterSelData();
    })
  }
  
  ngOnInit(){ 
    
  }




  vrnMasterSelData(){
    let id = this.route.snapshot.paramMap.get('id');
    this.vrnMaterData = {};
    if(id != 'A'){
      this.vrnMaterData = this.appComponent.getMasterItem();
      // this.vrnMaterData.VEHICLESTATUS = '';
      // this.vrnMaterData.SEALCONDITION = '';
      // this.vrnMaterData.REMARKS = '';
      // this.vrnMaterData.NUMOFBOXES = '';
      // this.vrnMaterData.SEALNUM = '';
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
    window.VRNUserDB.collection('VRNDetail').find({VRN:id}).execute().then(docs => {
      var vrnMat = that.vrnMaterData;
      if(docs.length>0){
        vrnMat.VEHICLESTATUS = docs[0].VEHICLESTATUS;
        vrnMat.SEALCONDITION = docs[0].SEALCONDITION;
        vrnMat.REMARKS = docs[0].REMARKS;
        vrnMat.NUMOFBOXES = docs[0].NUMOFBOXES;
        vrnMat.SEALNUM = docs[0].SEALNUM;
      }
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

}
