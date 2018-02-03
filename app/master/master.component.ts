import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.css' ]
})
export class MasterComponent implements OnInit {
  

  ngOnInit() {
   // this.getHeroes();
  }

  getHeroes(): void {
   // this.heroService.getHeroes()
   //   .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  matSelectionList() {
    debugger;
  }
}
