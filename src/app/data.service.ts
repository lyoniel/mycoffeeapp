import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public endpoint = 'http://172.16.15.203:3000';

  get(coffeeId: String, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
    .subscribe(response => {
      callback(response.json());
    });
  }

  getList(callback) {
    // TODO: Change it with Real Web Service
    // const list = [
    //   new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St.', 'San Francisco')),
    //   new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid')),
    // ];
    // callback(list);
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        callback(response.json());
      });
  }

  save(coffee, callback) {
    // TODO: Change it with Real Web Service
    // callback(true);
    if (coffee._id) {
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
        });
    } else {
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        callback(true);
      });
    }
  }
}
