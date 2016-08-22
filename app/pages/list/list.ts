import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Data} from '../../providers/data/data';
import {Database} from '../../providers/database/database';



@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [Data]
})
export class ListPage {
  violations: any = [];
  house_number: number;
  boro: number = 2;
  street: string = '';
  showError: Boolean = false;
  showSpinner: Boolean = false;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    private _data: Data,
    private _database: Database) {
    // If we navigated to this page, we will have an item available as a nav param
    this.violations = navParams.get('item');
  }
  ngOnInit(): void {
  }

  lookup(): void {
    this.showSpinner = true;
    console.log(this.house_number, this.street, this.boro);
    this._data.getDobViolations(this.house_number, this.street.toUpperCase(), this.boro)
      .then(data => {
        this.showSpinner = false;
        this.violations = data;
        this.showError = this.violations.length === 0 ? true : false;
        _.each(this.violations, viol => this._database.add(data[0]));
      });
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
