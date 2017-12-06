$(document).ready(function(){
	var sesameStreet = [
		"elmo",
		"grover",
		"big bird",
		"mr snuffleupagus",
		"count von count",
		"kermit the frog",
		"bert",
		"ernie",
		"cookie monster",
		"oscar the grouch"];
	var programmingLanguages = [
		"python",
		"swift",
		"javascript",
		"react",
		"nodejs",
		"golang",
		"perl"]
	var wordList = [];
	var userGuessPrint = "";
	var letterToPrint = "";
	var status = "";
	var guessesRemainingElement = document.getElementById("guessesRemaining");
	var characterLinesElement = document.getElementById("characterLines");
	var hintElement = document.getElementById("hint");
	var guessedLettersElement = document.getElementById("guessedLetters");
	var winLossPromptElement = document.getElementById("winLossPrompt");
	var wordOfTheDayElement = document.getElementById("wordOfTheDay");
	var imageLinks = {};	
	var whichList = 0;

	whichList = Math.floor(Math.random() * 2);
	
	if (whichList === 0) {
		wordList = sesameStreet;
		$("div.title").attr("style","content: url(./assets/images/sesame-street-sign.png)");
		$(".signage").attr("style","background-image: url(./assets/images/sesamesign.png)");
		var audioWin = new Audio('./assets/audio/sesameStreetThemeSong.mp3');
		var audioLoss = new Audio('./assets/audio/sesameFail.mp3');
	} else if (whichList === 1) {
		wordList = programmingLanguages;
		$("div.title").attr("style","content: url(./assets/images/programming-languages.png)");
		$(".signage").attr("style","background-image: url(./assets/images/monitor.png)");
		$("#characterLines, #guessesRemaining, #guessedLetters, #winLossPrompt, #wordOfTheDay").attr("style","color: black");
		var audioWin = new Audio('./assets/audio/programmingWin.mp3');
		var audioLoss = new Audio('./assets/audio/programmingFail.mp3');
	} else {};

	for (i = 0; i < wordList.length; i++) {
		var imageURL = wordList[i].toString();
		imageURL = imageURL.replace(/\s+/g, '') +".png";
		imageLinks[wordList[i]] = imageURL.toString();
	};

	window.onclick = function () {
		var blankHint = "";
		var userGuessList = [];
		var remainingGuesses = 6;
		var listPosition = Math.floor(Math.random() * wordList.length);
		var selectedWord = wordList[listPosition];
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var result = "";

		winLossPromptElement.textContent = " ";
		wordOfTheDayElement.textContent = " ";
		audioWin.pause();
		audioLoss.pause();
		audioWin.currentTime = 0;
		audioLoss.pause();
		
		function printBlanks(){
			for (i = 0; i < selectedWord.length; i++) {
				letterToPrint = selectedWord.charAt(i);
				if ($.inArray(letterToPrint, userGuessList) != -1){
					blankHint += letterToPrint;
					result += letterToPrint;
				} else if (letterToPrint === " ") {
					blankHint += "\xa0";
					result += " ";
				} else {
					blankHint += " _ ";
				}

			}
			return blankHint;
			return result;
		}

		printBlanks();

		function gameState(hint,letters,remaining){
			characterLinesElement.textContent = hint;
			guessedLettersElement.textContent = letters;
			guessesRemainingElement.textContent = remaining;
		};
		gameState(blankHint, "Letters Guessed: " + userGuessList, "Guesses Remaining: \xa0\xa0\xa0\xa0" + remainingGuesses);
		
		var imageToGet = imageLinks[selectedWord];

		hintElement.innerHTML = "<img src='./assets/images/"+imageToGet+"' class='img-rounded' alt='"+selectedWord+"'></img>";

		document.onkeyup = function(event) {
			var userGuess = event.key;
			userGuess = userGuess.toLowerCase();
			var guessCheck = selectedWord.includes(userGuess);
			var characterCheck = alphabet.includes(userGuess);
			var hasLetterBeenGuessed;
			blankHint = "";
			result = "";
			if (userGuessList.indexOf(userGuess) > -1 && characterCheck === true){
				hasLetterBeenGuessed = true;
			} else if (characterCheck === true){ 
				hasLetterBeenGuessed = false;
				userGuessList.push(userGuess);
			}

			if ((guessCheck === true) && (characterCheck === true)){
			} else {
				if (hasLetterBeenGuessed === false ) {
					remainingGuesses = remainingGuesses - 1;
				} 
				else { 
				}
			}

			printBlanks();

			gameState(blankHint,"Letters Guessed: " + userGuessList,"Guesses Remaining: \xa0\xa0\xa0\xa0" + remainingGuesses);

			function winLossDisplay(status){
				if (status === "win"){
					winLossPromptElement.textContent = "Congrats! You Won!";
					wordOfTheDayElement.textContent = "That's " + selectedWord;
				} else if (status === "loss"){
					winLossPromptElement.textContent = "You're out of guesses!";
					wordOfTheDayElement.textContent = "That's " + selectedWord + "!";
				}
			};
			
			if (remainingGuesses > 0 && selectedWord === result) {
				gameState(" "," "," ");
				winLossDisplay("win");
				audioWin.play();
			} else if (remainingGuesses <= 0){
				gameState(" "," "," ");
				winLossDisplay("loss");
				audioLoss.play();
			} else {
			}
		}
	}
});




