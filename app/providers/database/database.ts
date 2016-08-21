import { Injectable } from '@angular/core';
let PouchDB = require('pouchdb');
let _ = require('underscore');


/*
  Generated class for the Database provider.
  using PouchDB to maangae data base
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
window["PouchDB"] = PouchDB;
@Injectable()
export class Database {
  private _db;
  private _properties;
  constructor() {
    this._db = new PouchDB('properties', { adapter: 'websql' });
  }
  add(property) {
    this.getAll()
      .then(allSavedEnteries => {
        if (_.where(allSavedEnteries, { number: property.number, isn_dob_bis_viol: property.isn_dob_bis_viol }).length === 0) {
          property.Date = new Date();
          return this._db.post(property);
        } else {
          return { error: 'already saved to db' };
        }
      })
  }
  update(property) {
    return this._db.put(property);
  }
  delete(property) {
    return this._db.remove(property);
  }
  getAll() {
    if (!this._properties) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {

          // Each row has a .doc object and we just want to send an
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._properties = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);

          return this._properties;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._properties);
    }
  }
  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._properties, change.id);
    var birthday = this._properties[index];

    if (change.deleted) {
      if (birthday) {
        this._properties.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (birthday && birthday._id === change.id) {
        this._properties[index] = change.doc; // update
      } else {
        this._properties.splice(index, 0, change.doc) // insert
      }
    }
  }

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }
}
