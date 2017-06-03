import './stylesheets/index.scss'
var $ = require('jquery')

var pressSeries = [], //computer's generated press series
  activeButtons = 0, //toggle buttons
  compareIndex = 0, //which index in pressSeries to compare with. Advanced each time a button press is correct.
  onOff = 0, //Machine is initially off.
  strictMode = 0,

  m = 0;
var context = new AudioContext();
//1
function buttonSounds(button, duration) {
  var oscillator = context.createOscillator();
  oscillator.connect(context.destination);
  oscillator.frequency.value = 200 * button;
  console.log("button" + button)
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration / 1000);
}

//2 DONE - Adds press to pressSeries
function addPress() {
  activeButtons = 0;
  var next = Math.floor(4 * Math.random()) + 1;
  displayCount(pressSeries.length);
  pressSeries.push(next);
  console.log(pressSeries);
}

//3 - Compare Function
function activePress(userpress) {
  activeButtons = 0;
  console.log(compareIndex);
  if (compareIndex >= pressSeries.length - 1 && pressSeries[compareIndex] == userpress) {
    buttonSounds(userpress, 400);
    seriesSuccess();
  } else if (pressSeries[compareIndex] == userpress) {
    buttonSounds(userpress, 400);
    compareIndex++
    console.log('correct Press - compareIndex ' + compareIndex);
    activeButtons = 1;
  } else {
    console.log("wrongPress - compareIndex 0");
    buttonSounds(1, 1000)
    setTimeout(function() {}, 2000)
    compareIndex = 0;
    if (strictMode == 1) {
      resetGame();
      addPress();
      playTheSeries(pressSeries);
    } else {
      playTheSeries(pressSeries);

    }
  }

}

function displayCount(length) {
  $("#count").html(length)
}

//4

//5 DONE
function playTheSeries(series) {


  activeButtons = 0; //disable button input while playing
  var i = 0
  var waitTime = 1200 - ((pressSeries.length / 20) * 600)
  console.log(waitTime);
  var x = setInterval(function() {
    $("#b" + series[i]).css("opacity", "0.85");
    buttonSounds(series[i], 400);
    console.log(series[i]);
    setTimeout(function() {
      $("#b" + series[i++]).css("opacity", "1");
    }, 400)
    if (i >= series.length - 1) {
      clearInterval(x);
      activeButtons = 1;
    }
  }, waitTime);

  //enable button input once done playing
}

//6 - 8 Buttons

$("#onoff").on("click", function() {
  if (onOff == 1) {
    onOff = 0
    $("#onoff").html("OFF");
  } else {
    onOff = 1;
    $("#onoff").html("ON");
  }
  console.log(onOff)
});

$("#strict").on("click", function() {
  if (strictMode == 1) {
    strictMode = 0;
    $("#strict").html("STRICT OFF");
  } else {
    strictMode = 1;
    $("#strict").html("STRICT ON");
  }
});

$("#start").on("click", function() {
  if (onOff == 1) {
    resetGame();
    addPress();
    playTheSeries(pressSeries);
  }
})

$("#b1").on("click", function() {
  if (activeButtons == 1) {
    activePress(1);
  }
})

$("#b2").on("click", function() {
  if (activeButtons === 1) {
    activePress(2);
  }
})

$("#b3").on("click", function() {
  if (activeButtons === 1) {
    activePress(3);
  }
})

$("#b4").on("click", function() {
  if (activeButtons === 1) {
    activePress(4);
  }
})

//7
function resetGame() {
  pressSeries = [];
}

//8
function seriesSuccess() {
  console.log("SUCCESS")
  compareIndex = 0;
  if (pressSeries.length < 20) {
    addPress();
    playTheSeries(pressSeries);
  } else {
    var i = 0;
    var x = setInterval(function() {
      buttonSounds(5, 200);
      i++
      setTimeout(function() {}, 400)
      if (i >= 5) {
        clearInterval(x);
      }
    }, 400);
    console.log("Game Won!")
  }
}


/* Original Logic

/*

Code Logic:

var pressSeries = [], //computer's generated press series
activeButtons = 0, //toggle buttons
compareIndex = 0, //which index in pressSeries to compare with. Advanced each time a button press is correct.
onOff = 0, //Machine is initially off.
strictMode = 0;


1. DONE Function to create button tone when passed the button number and the duration necessary.

2. DONE Function to add a random button press to pressSeries

3. DONE Function to compare a button press to pressSeries: Accept button presses only when activeButtons is on. Each press must be compared with the current pressSeries, which is pressSeries[compareIndex]. If the press is correct, increase compareIndex by 1 and await next button press. If press is not correct, alert user and replay entire pressSeries. If the press is not correct and strict mode is on, reset pressSeries and start over.

When compareIndex > pressSeries.length, trigger success sound, toggle activeButtons to off, add one new move to pressSeries, and begin to show the user the next series. Display the new count as pressSeries.length.

4 DONE - MOVED TO BUTTONS

5. DONE Function to play the pressSeries to show the user the series. Accepts variable pressSeries. Can be sped up depending on pressSeries length.

6. DONE Buttons:

Turn on the machine with onOff. Create first value in pressSeries, show the user the first button press + trigger sound.

Start button resets pressSeries + begins new play function.

Strict button toggles strictMode

7. DONE Function: reset pressSeries

8. DONE Success Function - when user has reached the end of a sequence, will either start another sequence or end the game if pressSeries is 20

*/
