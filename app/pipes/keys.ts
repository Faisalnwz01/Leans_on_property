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
   transform(value: any, args?: any[]): any[] {
          // create instance vars to store keys and final output
          let keyArr: any[] = Object.keys(value),
              dataArr = [];

          // loop through the object,
          // pushing values to the return array
          keyArr.forEach((key: any) => {
              dataArr.push(value[key]);
          });

          // return the resulting array
          return dataArr;
      }
}
