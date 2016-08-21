import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Storage, LocalStorage } from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Data} from '../../providers/data/data';



@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [Data]

})
export class ListPage {
  private local: any;
  selectedItem: any;
  violations: any;
  house_number: number;
  street: string = '';
  boro: number = 2;
  showSpinner: Boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, private _data: Data) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.local = new Storage(LocalStorage);
  }
  ngOnInit(): void {
    this._data.getDobViolations(430, 'EAST 149 STREET', this.boro)
      .then(data => {
        this.showSpinner = false;
        this.violations = data;
        console.log(data);
      })
  }

  lookup(): void {
    this.showSpinner = true;
    console.log(this.house_number, this.street, this.boro);
    this._data.getDobViolations(this.house_number, this.street.toUpperCase(), this.boro)
      .then(data => {
        this.showSpinner = false;
        this.violations = data;
        this.local.set(this.house_number + ' ' + this.street + ' ' + this.boro, JSON.stringify(data));
        console.log(data);
      })
  }

  isActive(vio: string): string {
    return vio.includes('ACTIVE') ? 'Active' : 'Closed';
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
