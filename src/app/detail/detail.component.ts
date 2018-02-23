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
      let vrnMast = this.vrnMaterData;
      vrnMast.DepartureSeal1 = '';
      vrnMast.SealCondition = '';
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

}
