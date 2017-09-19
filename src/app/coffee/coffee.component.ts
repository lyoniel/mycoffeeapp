import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private geolocation: GeolocationService,
    private router: Router,
    private data: DataService) {}

  coffee: Coffee;
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappucino'];
  routingSubscription: any;
  tastingEnabled: boolean = false;

  tastingRatingChanged(checked: boolean) {
    this.coffee.tastingRating = checked ? new TastingRating() : null;
  }

  cancel() {
    this.router.navigate(['/']);
  }

  save() {
    this.data.save(this.coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this.route.params.subscribe(
      params => {
          if (params['id'] ) {
            this.data.get(params['id'], response => {
              this.coffee = response;
              this.tastingEnabled = this.coffee.tastingRating ? true : false;
            });
          }
      }
    );

    this.geolocation.requestLocation(
      location => {
        if (location) {
          this.coffee.location.latitude = location.latitude;
          this.coffee.location.longitude = location.longitude;
        }
      }
    );

  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
