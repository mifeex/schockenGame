// with closed cups and finished player
// var objSeatDices = {
//
//   0 : {
//     seat: 1,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 1, roll: 1 },
//     dice3: { val: 1, roll: 3 }
//   },
//   1 : {
//     seat: 2,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 3, roll: 1 },
//     dice3: { val: 6, roll: 3 }
//   },
//   2 : {
//     seat: 3,
//     dice1: { val: 6, roll: 3 },
//     dice2: { val: 6, roll: 1 },
//     dice3: { val: 2, roll: 3 }
//   },
//   3 : {
//     seat: 4,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 1, roll: 1 },
//     dice3: { val: 2, roll: 3 }
//   },
//   4 : {
//     seat: 5,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 2, roll: 1 },
//     dice3: { val: 3, roll: 3 }
//   },
//   5 : {
//     seat: 6,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 2, roll: 3 },
//     dice3: { val: 5, roll: 3 }
//   },
//   6 : {
//     seat: 7,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 1, roll: 1 },
//     dice3: { val: 5, roll: 3 }
//   },
//   7 : {
//     seat: 8,
//     dice1: { val: 1, roll: 2 },
//     dice2: { val: 3, roll: 1 },
//     dice3: { val: 6, roll: 3 }
//   },
//   8 : {
//     seat: 9,
//     dice1: { val: 6, roll: 3 },
//     dice2: { val: 6, roll: 1 },
//     dice3: { val: 2, roll: 3 }
//   },
//   9 : {
//     seat: 10,
//     cup: 0
//   },
//   10 : {
//     seat: 11,
//     cup: 0,
//     finish: 1
//   },
//   11 : {
//     seat: 12,
//     cup: 0,
//     finish: 1
//   }
// }

// all players has roll the dices
var objSeatDices = {

  0 : {
    seat: 1,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 2, roll: 1 },
    dice3: { val: 1, roll: 3 }
  },
  1 : {
    seat: 2,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 3, roll: 1 },
    dice3: { val: 6, roll: 3 }
  },
  2 : {
    seat: 3,
    dice1: { val: 6, roll: 3 },
    dice2: { val: 6, roll: 1 },
    dice3: { val: 2, roll: 3 }
  },
  3 : {
    seat: 4,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 1, roll: 1 },
    dice3: { val: 2, roll: 3 }
  },
  4 : {
    seat: 5,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 2, roll: 1 },
    dice3: { val: 3, roll: 3 }
  },
  5 : {
    seat: 6,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 2, roll: 3 },
    dice3: { val: 5, roll: 3 }
  },
  6 : {
    seat: 7,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 1, roll: 1 },
    dice3: { val: 5, roll: 3 }
  },
  7 : {
    seat: 8,
    dice1: { val: 1, roll: 2 },
    dice2: { val: 3, roll: 1 },
    dice3: { val: 6, roll: 3 }
  },
  8 : {
    seat: 9,
    dice1: { val: 6, roll: 3 },
    dice2: { val: 6, roll: 1 },
    dice3: { val: 2, roll: 3 }
  },
  9 : {
    seat: 10,
    dice1: { val: 6, roll: 3 },
    dice2: { val: 6, roll: 1 },
    dice3: { val: 2, roll: 3 }
  },
  10 : {
    seat: 11,
    dice1: { val: 6, roll: 3 },
    dice2: { val: 6, roll: 1 },
    dice3: { val: 2, roll: 3 }
  },
  11 : {
    seat: 12,
    dice1: { val: 6, roll: 2 },
    dice2: { val: 6, roll: 1 },
    dice3: { val: 2, roll: 3 }
  }
}

function showAllDice() {
  $('.darkDiceSmall').removeClass("darkDiceSmall");
}

var aryStrokes = [
  {strokes: 1, seat: 1},
  {strokes: 2, seat: 2},
  {strokes: 3, seat: 3},
  {strokes: 4, seat: 4},
  {strokes: 5, seat: 5},
  {strokes: 6, seat: 6},
  {strokes: 7, seat: 7},
  {strokes: 8, seat: 8},
  {strokes: 9, seat: 9},
  {strokes: 10, seat: 10},
  {strokes: 11, seat: 11},
  {strokes: 12, seat: 12}
];

var aryPlayer = [
  {user: "Kermit", seat: 1, status: "offline"},
  {user: "Itschi", seat: 2, status: "online"},
  {user: "Thomas", seat: 3, status: "online"},
  {user: "Wenge", seat: 4, status: "offline"},
  {user: "Harti", seat: 5, status: "online"},
  {user: "Catcher", seat: 6, status: "online"},
  {user: "Risse", seat: 7, status: "online"},
  {user: "Benni", seat: 8, status: "online"},
  {user: "Brunni", seat: 9, status: "online"},
  {user: "Stefan", seat: 10, status: "online"},
  {user: "Floh", seat: 11, status: "online"},
  {user: "Fritz", seat: 12, status: "offline"}
];

for (var i = 0; i < aryPlayer.length; i++) {
  $('#playerName'+aryPlayer[i].seat).html(aryPlayer[i].user);
  if(aryPlayer[i].status == 'online') {
    $('#player'+aryPlayer[i].seat+'Status').html('Online').addClass('online');
  } else {
    $('#player'+aryPlayer[i].seat+'Status').html('Offline').addClass('offline');
  }
}


function setPlayerStrokes() {
  for (var i = 0; i < aryPlayer.length; i++) {
    var playerNo = i+1;
    localStorage.setItem("Player"+playerNo+"Strokes", aryStrokes[i].strokes);
  }
}

function functionName() {
  setLoserRound(player,round);
}
