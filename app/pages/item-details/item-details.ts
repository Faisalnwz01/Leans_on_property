import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';



@Component({
  templateUrl: 'build/pages/item-details/item-details.html',
  directives: [],
})
export class ItemDetailsPage {
  selectedViolation: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedViolation = navParams.get('item');
    console.log(this.selectedViolation)
  }
  isActive(vio: string): string {
    return vio.includes('ACTIVE') ? 'Active' : 'Closed';
  }
}
