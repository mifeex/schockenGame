function calculateStrokesFromRoll(objSeatDices) {

  var arrayDicesLength = Object.keys(objSeatDices).length
  var diceValues = [];

  function getLowestDiceRoll() {

    for (var i = 0; i < arrayDicesLength; i++) { // What is the lowest dice value?
      var diceConcat = objSeatDices[i].dice1.val + "," + objSeatDices[i].dice2.val + "," + objSeatDices[i].dice3.val;
      var checkOneVal = diceConcat.split(',').sort();
      var oneOdd = findOddOne(checkOneVal); // How many 1-Dices available?
      var sortHighToLowArr = [];
      sortHighToLowArr.push(diceConcat.split(','))
      var sortHighToLow = diceConcat.split(',').sort().reverse().join('');

      if (oneOdd >= 2) { // CHECK FOR SCHOCK
        console.log("Schock: ",checkOneVal);
      } else if (AllTheSame(sortHighToLowArr[0])) { // CHECK FOR GENERAL
        console.log("General: ", sortHighToLowArr[0]);
      } else if (objSeatDices[i].dice1.roll == objSeatDices[i].dice1.roll && objSeatDices[i].dice2.roll == objSeatDices[i].dice1.roll && objSeatDices[i].dice3.roll == objSeatDices[i].dice1.roll && diceInSequenz(sortHighToLow)) { // CHECK FOR STREET
        console.log("STREET: ", sortHighToLowArr[0]);
      } else { // CHECK LOWEST DICE ROLL
        var seatNr = "seat"+objSeatDices[i].seat;
        diceValues[seatNr] = sortHighToLow;
      }
    }
    const lowestObj = Object.entries(diceValues).reduce((a, [k, v]) => a[Object.keys(a)[0]] < v ? a : {[k]: v}, {});
    console.log("Lowest roll: ", lowestObj);

    if(Object.keys(lowestObj).length === 0 && lowestObj.constructor === Object) { // no normal dices available for calculateStrokes
      getLowestStreetGeneralSchock();
    } else {
      var loserSeat = Object.keys(lowestObj)[0];
      $('#'+loserSeat).children(".card").addClass("loserCurrentRound");
      localStorage.setItem("lowestDicePlayer", loserSeat);
      localStorage.setItem("lowestDicePlayerVal", lowestObj[Object.keys(lowestObj)[0]]);
      console.log("Loser has a dice roll " + lowestObj[Object.keys(lowestObj)[0]] + " at " + loserSeat);
    }

  }

  function getHighestDiceRoll() {

    localStorage.setItem("highestRoll",0); // Set initial to zero
    for (var i = 0; i < arrayDicesLength; i++) { // What is the highest dice value?
      var diceConcat = objSeatDices[i].dice1.val + "," + objSeatDices[i].dice2.val + "," + objSeatDices[i].dice3.val;
      var checkOneVal = diceConcat.split(',').sort();
      var oneOdd = findOddOne(checkOneVal); // How many 1-Dices available?
      var sortHighToLowArr = [];
      sortHighToLowArr.push(diceConcat.split(','))
      var sortHighToLow = diceConcat.split(',').sort().reverse().join('');

      var lastSchock = Number(localStorage.getItem("highestRoll")); // transform string to number
      if (oneOdd == 3) {
        console.log("Schock out!");
        localStorage.setItem("highestRoll", 13);
      } else if (oneOdd >= 2) { // CHECK FOR SCHOCK
        console.log("High Schock: ",checkOneVal);
        var removeDiceOne = Number(diceConcat.replace('1,1,',''));
        if (lastSchock < removeDiceOne) {
          localStorage.setItem("highestRoll",removeDiceOne);
        }
      } else if (AllTheSame(sortHighToLowArr[0])) { // CHECK FOR GENERAL
        console.log("General: ", sortHighToLowArr[0]);
        if (lastSchock < 3) {
          localStorage.setItem("highestRoll", 3);
        }
      } else if (objSeatDices[i].dice1.roll == objSeatDices[i].dice1.roll && objSeatDices[i].dice2.roll == objSeatDices[i].dice1.roll && objSeatDices[i].dice3.roll == objSeatDices[i].dice1.roll && diceInSequenz(sortHighToLow)) { // CHECK FOR STREET
        console.log("STREET: ", sortHighToLowArr[0]);
        if (lastSchock < 2) {
          localStorage.setItem("highestRoll", 2);
        }
      } else { // CHECK LOWEST DICE ROLL
        var seatNr = "seat"+objSeatDices[i].seat;
        diceValues[seatNr] = sortHighToLow;
        if (lastSchock < 1) {
          localStorage.setItem("highestRoll", 1);
        }
      }
    }

    var lowestPlayerSeat = localStorage.getItem("lowestDicePlayer");
    var loserPlayerNumber = Number(lowestPlayerSeat.replace('seat',''));
    var loserPlayerDices = localStorage.getItem("lowestDicePlayerVal");
    var playerNameLostRound = $('#playerName'+loserPlayerNumber).text();

    if (localStorage.getItem("highestRoll") == 13) {
      var roundNo = localStorage.getItem("currentRound");
      switch (roundNo) {
        case 1:
          swalGetAllStrike(playerNameLostRound,loserPlayerDices,"erste");
          break;
        case 2:
          swalGetAllStrike(playerNameLostRound,loserPlayerDices,"zweite");
          break;
        default:
      }
      addRemovePlayerStrokes(localStorage.getItem("highestRoll"),loserPlayerNumber);
    } else {
      addRemovePlayerStrokes(localStorage.getItem("highestRoll"),loserPlayerNumber);
      swalGetStrike(playerNameLostRound,loserPlayerDices);
    }

  }

  function checkAllPlayerFinish() {

    async.waterfall([
      function(callback) {
        for(var i = 0; i < arrayDicesLength; i++){
          if(objSeatDices[i]["dice1"] === undefined) {
            var errorRolls = 1;
          }
        }
        callback(null, errorRolls);
      },
      function(errorRolls, callback) {
        if (errorRolls != 1){
          getLowestDiceRoll();
          getHighestDiceRoll();
        } else {
          Swal.fire(
           'Fehler',
           'Es haben noch nicht alle Spieler geworfen!',
           'error'
          )
        }
        callback(null, 'one');
      }
    ], function (err, result) {
      // result now equals 'done'
    });

  }

  checkAllPlayerFinish();
  stapelVal();

}

function addRemovePlayerStrokes() {
  var lowestPlayerSeat = localStorage.getItem("lowestDicePlayer");
  var loserSeat = Number(lowestPlayerSeat.replace('seat',''));
  var loserSeatArrNo = loserSeat - 1;
  var currentStrokes = aryStrokes[loserSeatArrNo].strokes;
  console.log("loser Player has before: ", aryStrokes[loserSeatArrNo].strokes);
  var newLoserStrokeValue = currentStrokes + Number(localStorage.getItem("highestRoll"));
  console.log("loser Player has after: ", newLoserStrokeValue);
}

function swalGetStrike(playerNameLostRound,loserPlayerDices) {

  let timerInterval
  Swal.fire({
    title: playerNameLostRound +' hat mit '+loserPlayerDices +' verloren',
    html: 'Er bekommt ' + localStorage.getItem("highestRoll") + ' Deckel',
    footer: 'Es geht direkt weiter...',
    timer: 3000,
    position: 'top-center',
    allowOutsideClick: false,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log('I was closed by the timer')
    }
  })
  addRemovePlayerStrokes();
}

function swalGetAllStrike(playerNameLostRound,loserPlayerDices,half) {
  let timerInterval
  Swal.fire({
    title: playerNameLostRound +' hat diese '+half+' Hälfte mit '+loserPlayerDices +' verloren',
    footer: 'Es geht direkt weiter...',
    timer: 3000,
    position: 'center',
    allowOutsideClick: false,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}

function getLowestStreetGeneralSchock() {

  //
  // Check schock dice values (Case: All player has a schock roll)
  //
  for (var i = 0; i < arrayDicesLength; i++) {
    var diceConcat = objSeatDices[i].dice1.val + "," + objSeatDices[i].dice2.val + "," + objSeatDices[i].dice3.val;
    var checkOneVal = diceConcat.split(',').sort();
    var oneOdd = findOddOne(checkOneVal); // How many 1-Dices?
    if (oneOdd >= 2) {
      var sortHighToLow = diceConcat.split(',').sort().join('');
      var seatNr = "seat"+objSeatDices[i].seat;
      diceValues[seatNr] = sortHighToLow;
    }
  }
  const lowestObj = Object.entries(diceValues).reduce((a, [k, v]) => a[Object.keys(a)[0]] < v ? a : {[k]: v}, {});
  console.log("lowest Schock: ", lowestObj);
}

function findOddOne(para) { // How many 1-Dices available?
  var count = {};
  para.forEach(function(para) {
    count[para] = (count[para] || 0) + 1;
  });
  return count[1];
}

function diceInSequenz(dices) { // dice in a row (street)?

  var value = dices,
      digits = value.split(''),
      invalid = true;

  for(var i = 0; i < digits.length - 1; i++) {
    if (Math.abs(parseInt(digits[i]) - parseInt(digits[i+1])) > 1) {
      invalid = false;
      break;
    }
  }
  return invalid;
}

function AllTheSame(array) { // General available?
  var x = array[0];
  return array.every(function(element) {
      return element === x;
  });
}

function stapelVal() {
  var stapelVal = localStorage.getItem("stapelVal");
  $('#stapelVal').html(stapelVal);
}

function startNewRound() {
  localStorage.setItem("stapelVal", "12");
  $('#stapelVal').html("13");
  localStorage.setItem("currentRound",1);
  $(".loserCurrentRound").removeClass('loserCurrentRound');
  setPlayerStrokes();
  for (var i = 0; i < aryPlayer.length; i++) {
    player = i+1;
    $('#player'+player+'CurrentStrokes').html('');
  }
}

function calRounds() {
  var currentRound = localStorage.getItem("currentRound");
  localStorage.setItem("currentRound", currentRound +1);
}
