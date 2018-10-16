const api = require('./api');

// TODO: Enter your API key
const API_KEY = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

// Game options
const maxPlayers = 1;
const map = 'standardmap';
const numberOfStreams = 10;
const numberOfElevations = 10;
const numberOfPowerups = 10;

function play(gameState) {
	console.log('Starting turn ' + gameState.turn)
	// TODO: Implement your solution
	
	// Example
	var directions = ['e', 'w', 'n', 's'];
	if (gameState.turn < 50) {
		var direction = directions[Math.floor(Math.random() * directions.length)];
		api.makeMove(gameState.gameId, direction, 'slow', play);
	}
}

function main() {
	//Can only have 2 active games at once. This will end any previous ones.
	api.endPreviousGamesIfAny(initGame);
}

function initGame() {
	console.log("initing game");
	api.initGame(maxPlayers, map, numberOfStreams, numberOfElevations, numberOfPowerups, joinGame);
}

function joinGame(gameId) {
	console.log("joining game");
	api.joinGame(gameId, readyUp);
}

function readyUp(gameState) {
	console.log("readying up");
	api.tryReadyUp(gameState.gameId, play);
}

api.setApiKey(API_KEY);
main();
