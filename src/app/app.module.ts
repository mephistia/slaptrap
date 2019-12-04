import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { HttpClientModule } from '@angular/common/http';

import { FB_CONFIG } from './fbconfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Vibration } from '@ionic-native/vibration/ngx';




@NgModule({
  declarations: [

    AppComponent, 

  ],

  entryComponents: [],
  imports: [BrowserModule, 
  IonicModule.forRoot(),
  AppRoutingModule,
  HttpClientModule,
  AngularFireModule.initializeApp(FB_CONFIG),
  AngularFireAuthModule,
  AngularFireDatabaseModule
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SQLitePorter,
    Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
