import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { GolfComponent } from './golf/golf.component';

@NgModule({
  declarations: [
    AppComponent,
    GolfComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule, 
    MatButtonModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
