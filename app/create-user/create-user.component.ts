import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';


@Component({
   selector: 'app-create-user',
   templateUrl: './create-user.component.html',
   styleUrls: ['./create-user.component.css']
 })
 export class CreateUserComponent {
//   heroes: Hero[];

// email = new FormControl('', [Validators.required, Validators.email]);

// getErrorMessage() {
//   return this.email.hasError('required') ? 'You must enter a value' :
//       this.email.hasError('email') ? 'Not a valid email' :
//           '';
// }


constructor(public snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


//   constructor(private heroService: HeroService) { }

 //  ngOnInit() {
//     this.getHeroes();

 createUserData = {
   fullName:"",
   joiningDte:"",
   mobileNo:"",
   RntAmount:"",
   DOB:"",
   OthrMobileNo:"",
   address:"",
   selected:"Hostel/PG",
   typeOfHstl:[{
      value:"Hostel/PG"
      },{
      value:"Outer"
      }],
   imagePath:""
 }


//   }

//   getHeroes(): void {
//     this.heroService.getHeroes()
//     .subscribe(heroes => this.heroes = heroes);
//   }

switchHstl(evt){
  this.createUserData.selected=evt.value;
}

// myFunction(evt){
// debugger;
// }




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




  this.router.navigate(['/master']);
  debugger;
}


navigateBefore(evt){
  this.router.navigate(['/master']);
}


 }
