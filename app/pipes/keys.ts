import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Keys pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'keys'
})
@Injectable()
export class Keys {
  /*
    itterate over objects
   */
  transform(value: any, args?: any[]): Object[] {
    if (!value) return;
    let keyArr: any[] = Object.keys(value),
      dataArr = [],
      keyName = args[0];

    keyArr.forEach((key: any) => {
      value[key][keyName] = key;
      dataArr.push(value[key])
    });

    if (args[1]) {
      dataArr.sort((a: Object, b: Object): number => {
        return a[keyName] > b[keyName] ? 1 : -1;
      });
    }

    return dataArr;
  }
}
