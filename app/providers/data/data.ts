import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import { dobViolation }           from '../../dobViolation';
import { Observable }     from 'rxjs/Observable';
/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
  private _DOBUrl: string = 'https://data.cityofnewyork.us/resource/dvnq-fhaa.json';
  data: Object;
  constructor(private _http: Http) {}
  //
  getDobViolations(house_number: number, street: string, boro:number) {
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this._http.get(this._DOBUrl + `?house_number=${house_number}&street=${street}&boro=${boro}`)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
