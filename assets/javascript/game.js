$(document).ready(function(){
	var wordList = ["elmo","grover","big bird","mr snuffleupagus","count von count","kermit the frog","bert","ernie","cookie monster","oscar the grouch"];
	var userGuessPrint = "";
	var letterToPrint = "";
	var status = "";
	var guessesRemainingElement = document.getElementById("guessesRemaining");
	var characterLinesElement = document.getElementById("characterLines");
	var hintElement = document.getElementById("hint");
	var guessedLettersElement = document.getElementById("guessedLetters");
	var winLossPromptElement = document.getElementById("winLossPrompt");
	var wordOfTheDayElement = document.getElementById("wordOfTheDay");
	var audio = new Audio('./assets/audio/sesameStreetThemeSong.mp3');
	var imageLinks = {
		"elmo": "elmo.jpg",
		"grover": "grover.jpg",
		"big bird": "bigBird.jpg",
		"mr snuffleupagus": "mrSnuffleupagus.jpg",
		"count von count": "countVonCount.png",
		"kermit the frog": "kermitTheFrog.jpg",
		"bert": "bert.png",
		"ernie": "ernie.png",
		"cookie monster": "cookieMonster.jpg",
		"oscar the grouch": "oscarTheGrout.jpg"};



	window.onclick = function () {
		var blankHint = "";
		var userGuessList = [];
		var remainingGuesses = 6;
		var listPosition = Math.floor((Math.random() * wordList.length));
		var selectedWord = wordList[listPosition];
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		winLossPromptElement.textContent = " ";
		wordOfTheDayElement.textContent = " ";
		audio.pause();
		audio.currentTime = 0;
		var result = "";
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
			console.log(selectedWord.length);
			console.log(blankHint.length);
			
			if (remainingGuesses > 0 && selectedWord === result) {
				gameState(" "," "," ");
				winLossDisplay("win");
				audio.play();
			} else if (remainingGuesses <= 0){
				gameState(" "," "," ");
				winLossDisplay("loss");
			} else {
			}
		}
	}
});




