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
jsdom();
describe('Homework Reach Targets', function(){
  before(function(){
    document.body.innerHTML = "\
      <h2 id='numeric-display'>100</h2>\
      <h4> Progress Bar </h4>\
      <div class='component' id='progress-bars'>\
        <div class='progress-bar'></div>\
        <div class='progress-bar'></div>\
      </div>\
      <h4> Lit Fuse </h4>\
      <div class='component' id='fuses'>\
        <div class='fuse'>\
          <div class='unburnt'></div>\
          <div class='flame'></div>\
          <div class='burnt'></div>\
        </div>\
        <div class='fuse'>\
          <div class='unburnt'></div>\
          <div class='flame'></div>\
          <div class='burnt'></div>\
        </div>\
      </div>\
      <h4> Crawler </h4>\
      <div class='component' id='crawlers'>\
        <div class='crawler-track'>\
          <div class='crawler'></div>\
        </div>\
        <div class='crawler-track'>\
          <div class='crawler'></div>\
        </div>\
      </div>\
    ";
  });
  describe('timerUI', function(){
    describe("#drawNumericDisplay(timerValue)", function(){
      context("when the timer is down to the last ten seconds", function(){
        it("changes the color of the text in the numeric display to 'red'", function(){
          let timerValue = 7;
          timerUI.drawNumericDisplay(timerValue);
          assert.equal(document.getElementById('numeric-display').style.color, 'red');
        });
        it("increases the size of the font in the display by 5% per second (at 10 seconds left, the size should be 5% bigger); round to two decimal places", function(){
          let timerValue = 10;
          timerUI.drawNumericDisplay(timerValue);
          assert.equal(document.getElementById('numeric-display').style.fontSize, '1.58em');
          timerValue = 9;
          timerUI.drawNumericDisplay(timerValue);
          assert.equal(document.getElementById('numeric-display').style.fontSize, '1.65em');
        })
      })
      // it("sets the numeric display to the current value of the timer", function(){
      //   let timerValue = 45;
      //   timerUI.drawNumericDisplay(timerValue);
      //   assert.equal(document.getElementById('numeric-display').textContent, timerValue);
      // });
    });
    describe("#drawProgressBars(timerValue)", function(){
      it("sets the width of every progress bar to 'N%', where N is the amount of time elapsed in seconds", function(){
        let timerValue = 66;
        let timeElapsed = 100 - timerValue;
        timerUI.drawProgressBars(timerValue);
        let progressBars = document.getElementsByClassName('progress-bar');
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
            assert.equal(unburntBars[i].style.width, '98%');
          }
        });
        it("sets the width of the 'burnt' bars to 0%", function(){
          timerUI.drawLitFuses(timerValue);
          for (var i = 0; i < burntBars.length; i++) {
            assert.equal(burntBars[i].style.width, '0%');
          }
        });
      });
      context("when the time left on the timer is 0", function(){
        let timerValue = 0;
        it("sets the width of the 'unburnt' bars to 0%", function(){
          timerUI.drawLitFuses(timerValue);
          for (var i = 0; i < unburntBars.length; i++) {
            assert.equal(unburntBars[i].style.width, '0%');
          }
        });
        it("sets the width of the 'burnt' bars to 98%", function(){
          timerUI.drawLitFuses(timerValue);
          for (var i = 0; i < burntBars.length; i++) {
            assert.equal(burntBars[i].style.width, '98%');
          }
        });
      });
      context("when the time left on the timer is between 100 and 0", function(){
        it("scales the widths of 'burnt'/'unburnt' bars linearly, based on the amount of time elapsed/remaining", function(){
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
      it('draws left margins for each "crawler" that scale with the amount of time elapsed, at a rate of 10px per second', function(){
        [100, 90, 80, 70 ,60, 50, 40, 30, 20, 10, 0].forEach(function(timerValue){
          timerUI.drawCrawlers(timerValue);
          for (var i = 0; i < crawlers.length; i++) {
            assert.equal(crawlers[i].style.marginLeft, ((100 - timerValue) * 10) + 'px');
          }
        });
      });
      it('sets the top margin of every "crawler" to either 0px or 10px every other second, starting with 0px when the timer is at 100 seconds left', function() {
        [100, 98, 82, 76, 64, 50, 44, 38, 28, 16, 6].forEach(function(timerValue){
          timerUI.drawCrawlers(timerValue);
          for (var i = 0; i < crawlers.length; i++) {
            assert.equal(crawlers[i].style.marginTop, '0px');
          }
        });
        [95, 83, 77, 61, 53, 49, 31, 21, 19, 3].forEach(function(timerValue){
          timerUI.drawCrawlers(timerValue);
          for (var i = 0; i < crawlers.length; i++) {
            assert.equal(crawlers[i].style.marginTop, '10px');
          }
        });
      });
    });
  });
});
