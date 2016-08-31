// General Assembly, WDI (Web Development Immersive) Remote, Cohort 02 (R2D2)
// Copyright (C) 2016 Matt Brendzel under the GNU General Public License.
// See LICENSE for details.
"use strict";

// 'require' external code //
const assert = require('assert');
const jsdom = require('mocha-jsdom');

// Load HW Code (Not a module, so no `require`) //
const vm = require("vm");
const fs = require("fs");
vm.runInThisContext(fs.readFileSync(`${process.cwd()}/hw.js`));

// Tests
describe('Homework Reach Targets', function(){
  describe("#drawNumericDisplay(timerValue)", function(){
    it("sets the numeric display to the current value of the timer", function(){
      let timerValue = 45;
      timerUI.drawNumericDisplay(timerValue);
      assert.equal(document.getElementById('numeric-display').textContent, timerValue);
    });
  });
  describe("#drawProgressBars(timerValue)", function(){
    it("sets the width of the progress bar to 'N%', where N is the amount of time elapsed in seconds", function(){
      let timerValue = 66;
      let timeElapsed = 100 - timerValue;
      timerUI.drawProgressBars(timerValue);
      let progressBars = documents.getElementsByClassName('progress-bar');
      for (var i = 0; i < progressBars.length; i++){
        assert.equal(progressBars[i].style.width, timeElapsed.toString() + '%');
      }
    });
  });
  describe("#drawLitFuses(timerValue)", function(){
    let unburntBars, burntBars;
    beforeEach(function(){
      unburntBars = document.getElementsByClassName('unburnt');
      burntBars = document.getElementsByClassName('burnt');
    });
    context("when the time left on the timer is 100", function(){
      let timerValue = 100;
      it("sets the width of 'unburnt' bars to 98%", function(){
        timerUI.drawLitFuses(timerValue);
        for (var i = 0; i < unburntBars.length; i++) {
          assert.equal(unburntBar.style.width, '98%');
        }
      });
      it("sets the width of the 'burnt' bar to 0%", function(){
        timerUI.drawLitFuses(timerValue);
        for (var i = 0; i < burntBars.length; i++) {
          assert.equal(burntBars[i].style.width, '0%');
        }
      });
    });
    context("when the time left on the timer is 0", function(){
      let timerValue = 0;
      it("sets the width of the 'unburnt' bar to 0%", function(){
        timerUI.drawLitFuses(timerValue);
        for (var i = 0; i < unburntBars.length; i++) {
          assert.equal(unburntBar.style.width, '0%');
        }
      });
      it("sets the width of the 'burnt' bar to 98%", function(){
        timerUI.drawLitFuses(timerValue);
        for (var i = 0; i < burntBars.length; i++) {
          assert.equal(burntBars[i].style.width, '98%');
        }
      });
    });
    context("when the time left on the timer is between 100 and 0", function(){
      it("scales the widths of both bars linearly, based on the amount of time elapsed/remaining", function(){
        let timerValue = 50;
        timerUI.drawLitFuses(timerValue);
        for (var i = 0; i < burntBars.length; i++) {
          assert.equal(unburntBars[i].style.width, '49%');
          assert.equal(burntBars[i].style.width, '49%');
        }
      });
    });
  });
  describe("#drawCrawlers(timerValue)", function(){
    let crawlerTracks, crawlers;
    beforeEach(function(){
      crawlerTracks = document.getElementsByClassName('crawler-track');
      crawlers = document.getElementsByClassName('crawler');
    });
    it('draws a "crawler" whose left margin scales with the amount of time elapsed, at a rate of 10px per second', function(){
      [100, 90, 80, 70 ,60, 50, 40, 30, 20, 10, 0].forEach(function(timerValue){
        timerUI.drawCrawlers(timerValue);
        for (var i = 0; i < crawlers.length; i++) {
          assert.equal(crawlers[i].style.marginLeft, ((100 - timerValue) * 10) + 'px');
        }
      });
    });
    it('sets the top margin of the "crawler" to either 0px or 10px every other second, starting with 0px when the timer is at 100 seconds left', function() {
      [100, 98, 82, 76, 64, 50, 44, 38, 28, 16, 6].forEach(function(timerValue){
        timerUI.drawCrawlers(timerValue);
        for (var i = 0; i < crawlers.length; i++) {
          assert.equal(crawlers[i].style.marginTop, '0px');
        }
      });
      [95, 83, 77, 61, 53, 49, 31, 21, 19, 3].forEach(function(timerValue){
        timerUI.drawCrawlers(timerValue);
        for (var i = 0; i < crawlers.length; i++) {
          assert.equal(crawler.style.marginTop, '10px');
        }
      });
    });
  });
});
