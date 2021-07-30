/* 
	scores refare to players scores
	activePlayer refare to active player
	dice refare to current dice number
	roundScore refare to current round dice number

*/
var scores ,  activePlayer , roundScore , gamePlaying;
init();

// Handlling the roll button event 
document.querySelector('.btn-roll').addEventListener('click' , function() {
	if (gamePlaying){
	// cause of we need to use .dice over and over
	var diceDOM = document.querySelector('.dice');

	// 1. create random number
	var dice = Math.floor(Math.random() * 6) + 1;

	// 2. Display the result
	diceDOM.style.display = 'block';
	diceDOM.src = './img/dice-' + dice + '.png';

	// 3. update the round score if the rolled number was't 1
	 
		if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else {
			// Next player
			nextplayer();

		}
	}
})

// Handlling Hold button
document.querySelector('.btn-hold').addEventListener('click' , function() {
	if (gamePlaying){
	// 1- Add current (roundScore) score to global (scores)
	scores[activePlayer] += roundScore;
	
	// 2- update UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	// 3- Next Player turn 
	

	// 4- Check who is win
	if (scores[activePlayer] >= 20){

		document.querySelector('#name-' + activePlayer).textContent = "WINNER";
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;

	} else{
		nextplayer();
	}
	}
})

// Handelling New Game button 
// Set all fundamental game variables to zero 
// Remove winner and active classes
document.querySelector('.btn-new').addEventListener('click' , init);

// according to DRY we avoide nextPlayer repeated code 
function nextplayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	// Set roundScore to zero for next player and to change the global var to 0.
	roundScore = 0;

	// Also we need to set current score for each player in ui to 0

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	// Change the background and show whose player is active
	// toggle between classes

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	// Hide the Dice at the begine for nextplayer
	document.querySelector('.dice').style.display = 'none';
}

// according to DRY we avoide repeat initail varibels in newGame handlling and at the beginning of the code
function init(){

	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	// Hide Dice at the begine in the game
	document.querySelector('.dice').style.display = 'none';

	// Setting inital values to zero
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('name-0').textContent = "Player 1";
	document.getElementById('name-1').textContent = "Player 2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
 
}