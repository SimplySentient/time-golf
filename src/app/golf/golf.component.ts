import { Component } from '@angular/core';

@Component({
  selector: 'app-golf',
  templateUrl: './golf.component.html',
  styleUrls: ['./golf.component.css']
})
export class GolfComponent {

  TIMER_INTERVAL = 50;

  showHoleDetails: boolean = true;
  showCourse: boolean = false;
  showPutt: boolean = false;
  showResults: boolean = false;

  strokes: number = 0;

  timeElapsed: number = 0; // seconds

  spinnerValue: number = 0;
  spinnerColor: string = "primary"; // switches between accent

  resultsMessage: string = "";

  holePar: number;
  holeNumber: number = 0;
  holeTime: number;

  score: number;

  swingEnabled = true;

  private gameTimer;
  private swingTimer;
  private swingShowTime;

  private secondsElapsed;

  private penalty = 0;

  constructor () {
    this.nextHole();
  }

  teeOff() {
    this.showHoleDetails = false;
    this.showCourse = true;

    var self = this;
    this.gameTimer = setInterval(function() {
      self.timeElapsed++;

      self.secondsElapsed = self.timeElapsed / (1000 / self.TIMER_INTERVAL);
      // console.log('seconds elapsed', self.secondsElapsed);
      // console.log(self.timeElapsed);
    }, 50);

  }

  endHole() {
    const GOLF_LINGO = ["Condor","Albatross","Eagle","Birdie","Par","Bogey"]; // score respectively: -4,-3,-2,-1,0,1..+, offset of 4 used 

    this.showResults = true;
    this.showCourse = false;
    this.swingEnabled = true;

    this.score = this.strokes - this.holePar;
    var lingoIndex = this.score + 4;
    if (this.score > 1) {
      lingoIndex = 5;     
    } 

    this.secondsElapsed = Math.floor(this.secondsElapsed); // trim decimals

    if (this.secondsElapsed > this.holeTime) {
      this.penalty = this.secondsElapsed - this.holeTime;
      lingoIndex = 5;
    } 

    // console.log(lingoIndex, this.strokes, this.holePar);
    this.resultsMessage = GOLF_LINGO[lingoIndex];
    
    clearInterval(this.gameTimer);
  }

  swing() {
    this.strokes++;
    this.spinnerColor = "primary"; // only changes it the first putt
    this.swingShowTime = 0;
    var self = this;
    // this.secondsElapsed = this.timeElapsed / 50;
    this.swingEnabled = false;
    
    this.swingTimer = setInterval(function() {
      self.spinnerValue = self.secondsElapsed / self.holeTime * 100;
      self.swingShowTime += 100;

      if (self.holeTime - self.secondsElapsed <= 0) {
        self.endHole();
        clearInterval(self.swingTimer);
      }

      if (self.swingShowTime >= 3000) {
        clearInterval(self.swingTimer);
        self.swingEnabled = true;
        
        if (self.holeTime - self.secondsElapsed <= 0.5) {
          self.endHole();
        }
      }
    }, 100);
    
    

  }

  nextHole() {
    this.strokes = 0;
    this.timeElapsed = 0;
    this.penalty = 0;
    this.showResults = false;
    this.showHoleDetails = true;
    this.resultsMessage = "";
    // this.spinnerColor = "accent"; // don't like how this works
    this.spinnerValue = 0;

    this.holeNumber++;
    this.holeTime = Math.floor(Math.random() * 10) + 20; // at least 20s up to 3m
    if (this.holeTime <= 60) { 
      this.holePar = 3;
    } else if (this.holeTime <= 120) {
      this.holePar = 4;
    } else {
      this.holePar = 5;
    }
  }
}
