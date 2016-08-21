import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {Database} from './providers/database/database';
import {Keys} from './pipes/keys';
let _ = require('underscore');




@Component({
  templateUrl: 'build/app.html',
  providers: [Database],
  pipes: [Keys]

})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ListPage;
  pages: Array<{ title: string, component: any }>;
  properties: any;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private _database: Database
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'My First List', component: ListPage },
      { title: 'Hello Ionic', component: HelloIonicPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this._database.getAll()
        .then(p => {
          this.properties = _.groupBy(p, prop => { return prop.house_number + ' ' + prop.street });
          console.log(this.properties)
        })
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
