import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {}
    
    ngOnInit(){ 
      this.loadVRNMasterList();
     // window.asd = this;
      //this.webhhokURL();
       }


       webhhokURL(){
         debugger;
         var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() { debugger;
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        document.getElementById("demo").innerHTML = xhttp.responseText;
      }
    };
xhttp.open("GET", "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/vrn_apps-iejcy/service/VRNCreate/incoming_webhook/VRNCreateWebHook", true);

xhttp.setRequestHeader('signature','test');
xhttp.setRequestHeader('Accept','application/json');
xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
xhttp.setRequestHeader('X-Hook-Signature','test');
xhttp.send();
       }

  loadVRNMasterList(){
    var that = this;
    window.VRNUserDB.collection('VRNHeader').find({}).execute().then(docs => {
      that.createUserData=docs;
    });
  }

  createUserData = []

  onVRNSelected(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";
    this.router.navigate(['/detail',data.VRN]);
  }  

  getMasterItem(id: number | string){
    return this.createUserData
        .map(data => {
          debugger;
        });
  }

}

