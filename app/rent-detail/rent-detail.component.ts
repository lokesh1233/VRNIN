import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import { Master }         from '../master';
// import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './rent-detail.component.html',
  styleUrls: [ './rent-detail.component.css' ]
})
export class RentDetailComponent implements OnInit {
  //@Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    //private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
  //  const id = +this.route.snapshot.paramMap.get('id');
  //  this.heroService.getHero(id)
  //    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
