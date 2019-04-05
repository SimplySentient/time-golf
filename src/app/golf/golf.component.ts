import { Component } from '@angular/core';

@Component({
  selector: 'app-golf',
  templateUrl: './golf.component.html',
  styleUrls: ['./golf.component.css']
})
export class GolfComponent {

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

  private gameTimer;

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
      // console.log(self.timeElapsed);
    }, 1000);

  }

  endHole() {
    const GOLF_LINGO = ["Condor","Albatross","Eagle","Birdie","Par","Bogey"]; // score respectively: -4,-3,-2,-1,0,1..+, offset of 4 used 

    this.showResults = true;
    this.showCourse = false;

    this.score = this.strokes - this.holePar;
    var lingoIndex = this.score + 4;
    if (this.score > 1) {
      lingoIndex = 5;     
      if (this.timeElapsed > this.holeTime) {
        this.penalty = this.timeElapsed - this.holeTime;
      } 
    } 

    console.log(lingoIndex, this.strokes, this.holePar);
    this.resultsMessage = GOLF_LINGO[lingoIndex];
    
    clearInterval(this.gameTimer);
  }

  swing() {
    this.strokes++;
    this.spinnerColor = "primary"; // only changes it the first putt

    if (this.holeTime - this.timeElapsed <= 3) {
      this.endHole();
      return;
    }
    
    this.spinnerValue = this.timeElapsed / this.holeTime * 100;

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
    this.holeTime = Math.floor(Math.random() * 120) + 20; // at least 20s up to 3m
    if (this.holeTime <= 60) { 
      this.holePar = 3;
    } else if (this.holeTime <= 120) {
      this.holePar = 4;
    } else {
      this.holePar = 5;
    }
  }
}
