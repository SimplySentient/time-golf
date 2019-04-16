import { Component } from '@angular/core';

@Component({
  selector: 'app-golf',
  templateUrl: './golf.component.html',
  styleUrls: ['./golf.component.css']
})
export class GolfComponent {

  TIMER_INTERVAL = 50;

  showResults: boolean = false;

  strokes: number = 0;

  timeElapsed: number = 0; // seconds

  spinnerValue: number = 0;

  resultsMessage: string = "";

  holePar: number;
  holeTime: number;

  score: number;

  swingEnabled = true;

  timerDisplay = "";

  spinnerMode = "indeterminate";

  swings = [];

  private gameTimer;
  private swingTimer;
  private swingShowTime;

  highlightTime = false;
  secondsElapsed: number;
  spinnerPenalty: number = 0;

  private gameInProgress = false;

  elem;

  constructor () {
    this.nextHole();
    this.elem = document.documentElement;
  }

  teeOff() {
    this.gameInProgress = true;
    this.spinnerMode = "determinate";

    this.setSwings(0); // active until start

    var self = this;
    this.gameTimer = setInterval(function() {
      // console.log(self.timeElapsed);
      self.timeElapsed++;

      self.secondsElapsed = self.timeElapsed / (1000 / self.TIMER_INTERVAL);
      self.timerDisplay = self.getFormattedTime(self.secondsElapsed);

    }, 50);

  }

  getFormattedTime(val: number): string {
    var time = Math.floor(val * 10);
    if (time % 10 === 0) {
      return time / 10 + '.0s';
    } else {
      return time / 10 + 's';
    }
  }

  endHole() {
    const GOLF_LINGO = ["Condor","Albatross","Eagle","Birdie","Par","Bogey"]; // score respectively: -4,-3,-2,-1,0,1..+, offset of 4 used 

    this.showResults = true;
    this.swingEnabled = false;
    this.gameInProgress = false;

    this.score = this.strokes - this.holePar;
    var lingoIndex = this.score + 4;
    if (this.score > 1) {
      lingoIndex = 5;     
    } 

    this.secondsElapsed = Math.floor(this.secondsElapsed); // trim decimals
    if (this.secondsElapsed < this.holeTime) { // happens if game ends less than a second before actual time 
      this.timerDisplay = this.getFormattedTime(this.holeTime);
      this.spinnerValue = 100;
    }

    if (this.secondsElapsed > this.holeTime) {
      lingoIndex = 5;
      this.highlightTime = true;
      this.spinnerPenalty = (this.secondsElapsed - this.holeTime) / this.holeTime * 100;
    }

    this.resultsMessage = GOLF_LINGO[lingoIndex];
    
    clearInterval(this.gameTimer);
  }

  swing() {
    if (!this.gameInProgress) {
      this.teeOff();
    } else {
      if (this.strokes >= this.swings.length) {
        // console.log('need to go over');
        this.swings[this.strokes % this.holePar] = 2;
      } else {
        this.swings[this.strokes] = 1;
      }   

      this.strokes++;
    }
 
    this.swingShowTime = 0;
    var self = this;
    this.swingEnabled = false;
    
    this.swingTimer = setInterval(function() {
      self.spinnerValue = self.secondsElapsed / self.holeTime * 100;
      self.swingShowTime += 100;

      if (self.holeTime - self.secondsElapsed <= 0) {
        self.endHole();
        clearInterval(self.swingTimer);
      }

      if (self.swingShowTime > 3000) {
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
    this.showResults = false;
    this.resultsMessage = "";
    this.swingEnabled = true;
    this.spinnerValue = 0;
    this.spinnerMode = "indeterminate";
    this.highlightTime = false;
    this.spinnerPenalty = 0;

    this.holeTime = Math.floor(Math.random() * 120) + 15;
    if (this.holeTime <= 30) {
      this.holePar = 2;
    } else if (this.holeTime <= 60) { 
      this.holePar = 3;
    } else if (this.holeTime <= 120) {
      this.holePar = 4;
    } else {
      this.holePar = 5;
    }

    this.setSwings(1); // active until start
  }


  private setSwings(index: number) {
    this.swings.length = this.holePar;
    for (var i = 0; i < this.holePar; i++) {
      this.swings[i] = index;
    }
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.elem.exitFullscreen) {
      this.elem.exitFullscreen();
    } else if (this.elem.mozCancelFullScreen) {
      /* Firefox */
      this.elem.mozCancelFullScreen();
    } else if (this.elem.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitExitFullscreen();
    } else if (this.elem.msExitFullscreen) {
      /* IE/Edge */
      this.elem.msExitFullscreen();
    }
  
}

}
