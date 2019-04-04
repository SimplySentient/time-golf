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

  putts: number = 0;

  timeElapsed: number = 0; // seconds

  private gameTimer;
  private puttTimer;

  private holeLimit = 20;
  private penalty = 0;

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
    this.showResults = true;
    this.showCourse = false;

    if (this.timeElapsed > this.holeLimit) {
      // this.putts = this.putts + 3;
      this.penalty = 3;
      console.log('PENALTY FOR OVER');
    }
    
    clearInterval(this.gameTimer);
  }

  putt() {
    this.putts++;

    if (this.holeLimit - this.timeElapsed <= 3) {
      this.endHole();
      return;
    }

    this.showCourse = false;
    this.showPutt = true;

    var self = this;
    this.puttTimer = setInterval(function() {
      self.showPutt = false;
      self.showCourse = true;
      console.log('time up!!!!');
      clearInterval(self.puttTimer);
    }, 3000);

  }

  nextHole() {
    this.putts = 0;
    this.timeElapsed = 0;
    this.penalty = 0;
    this.showResults = false;
    this.showHoleDetails = true;
  }
}
