import { TastingRating } from './TastingRating';
import { PlaceLocation } from './PlaceLocation';


export class Coffee {
    _id: String;
    type: String;
    rating: number;
    notes: String;
    tastingRating: TastingRating = new TastingRating();

      constructor(
        public name: String = '',
        public place: String = '',
        public location: PlaceLocation= new PlaceLocation()) {

    }
}
