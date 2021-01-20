function newRoll() {

  var currentUserDiceRoll = parseInt($('#currentDiceRoll').attr('diceRoll'),10);

  switch (currentUserDiceRoll) {
    case 0:
      diceRoll(currentUserDiceRoll,false);
      break;
    case 1:
      diceRoll(currentUserDiceRoll,false);
      break;
    case 2:
      diceRoll(currentUserDiceRoll,true);
      $('#saveRollbtn').hide();
      $('#newRollBtn').hide();
      swalNextPlayer();
      break;
    default:
  }

}

function swalNextPlayer() {
  Swal.fire({
  title: "Now it's your turn",
  text: "{Playername}",
  icon: 'info'
  }).then(function(result){
    if (result.value) {
      // new roll
      // highlight new player card
    }
  })
}

function diceRoll(currentRoll,boolDarkRoll) {

  for (var i = 1; i <= 3; i++) {
    var dice = $('#currentDiceNo'+i);
    if ($('#currentDiceNo'+i).hasClass("blocked")) {
      //
    } else { // roll the free dice
      var newDiceRoll = Math.floor( Math.random() * 6 ) +1;
      $('#currentDice'+i).html('');
      if(boolDarkRoll){
        $('#currentDice'+i).append('<span id="currentDiceNo'+i+'" diceRoll="'+i+'" diceValue="'+newDiceRoll+'" onclick="toggleDice(this.id)" class="icon-dice-'+newDiceRoll+' currentDiceSize currentDices free darkDice"><span class="path1"></span><span class="path2"></span></span>');
      } else {
        $('#currentDice'+i).append('<span id="currentDiceNo'+i+'" diceRoll="'+i+'" diceValue="'+newDiceRoll+'" onclick="toggleDice(this.id)" class="icon-dice-'+newDiceRoll+' currentDiceSize currentDices free"><span class="path1"></span><span class="path2"></span></span>');
      }
    }
  }

  var dice1val = $('#currentDice1').attr('diceValue');
  var dice2val = $('#currentDice2').attr('diceValue');
  var dice3val = $('#currentDice3').attr('diceValue');
  var dice1roll = $('#currentDice1').attr('diceRoll');
  var dice2roll = $('#currentDice2').attr('diceRoll');
  var dice3roll = $('#currentDice1').attr('diceRoll');

  if (dice1val == 1 && dice2val == 1 && dice2val == 1 && dice1roll <= 2 && dice2roll <= 2 && dice3roll <= 2) {
    swalPlayerHasSchockOut();
  } else {
    //
  }

  $('#currentDiceRoll').html(currentRoll+1); // Count next dice roll
  $('#currentDiceRoll').attr('diceRoll', currentRoll+1);

}

function swalPlayerHasSchockOut() {
    Swal.fire({
    icon: 'success',
    title: 'Bämmm. Schock out!',
    showConfirmButton: false,
    timer: 4000
  })
}

function calculateStrokes() {
  var arrayStrokesLength = aryStrokes.length;
  for (var i = 0; i < arrayStrokesLength; i++) {
    $('#player'+aryStrokes[i].seat+'CurrentStrokes').html('<span class="icon-tally'+aryStrokes[i].strokes+'"></span>');
  }
}

function setPlayerDices() {
  var arrayDicesLength = Object.keys(objSeatDices).length
  for (var i = 0; i < arrayDicesLength; i++) {
    $('#player'+objSeatDices[i].seat+'Dices').html('');

    if (objSeatDices[i].cup == 0) { // The player has not yet roll
      if (objSeatDices[i].cup == 0 && objSeatDices[i].finish == 1) {
        var span = $('#player'+objSeatDices[i].seat+'Dices').addClass('rotate180').append('<span class="icon-cup font2x "></span>');
      } else {
        var span = $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-cup font2x"></span>');
      }
    } else {

      if (+objSeatDices[i].dice1.roll == 3){ // Hide the last roll
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice1.val+' font2x smallDices darkDiceSmall" diceRoll="'+objSeatDices[i].dice1.roll+'"></span>');
      } else {
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice1.val+' font2x smallDices" diceRoll="'+objSeatDices[i].dice1.roll+'"></span>');
      }

      if (+objSeatDices[i].dice2.roll == 3){
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice2.val+' font2x smallDices darkDiceSmall" diceRoll="'+objSeatDices[i].dice2.roll+'"></span>');
      } else {
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice2.val+' font2x smallDices" diceRoll="'+objSeatDices[i].dice2.roll+'"></span>');
      }

      if (+objSeatDices[i].dice3.roll == 3){
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice3.val+' font2x smallDices darkDiceSmall" diceRoll="'+objSeatDices[i].dice3.roll+'"></span>');
      } else {
        $('#player'+objSeatDices[i].seat+'Dices').append('<span class="icon-dice-'+objSeatDices[i].dice3.val+' font2x smallDices" diceRoll="'+objSeatDices[i].dice3.roll+'"></span>');
      }

    }
  }
}

function toggleDice(id) {
  $('#'+id).toggleClass('blocked free');
}

function setLoserRound(player,round) {
  $('#player'+player+'firstRound').addClass('loser').html('<span class="icon-number'+round+' font2x" title="Runde '+round+' verloren"></span>');
}

$(document).ready(function(){

});
