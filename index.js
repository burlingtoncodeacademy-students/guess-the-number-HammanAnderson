const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
/*---------------------- Readline Interface -------------------*/

//Ask Function (promise)
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

/*-------------------- Initializing Game Play -----------------*/

//Game start - prompting user in console as to which version to play.

async function gamePlay() {
  //Four options available. User guessing, computer guessing, exiting or Cheat.
  let gameMode = await ask(
    "\nWould you like to play a game?\nIf you want me to guess your number, input forward.\nIf you want to guess my number, input reverse.\nOtherwise you can leave by inputting exit.\n\n"
  );
  //user guessing game mode
  if (gameMode === "forward" || gameMode === "Forward") {
    Forward(); //function for original game mode
  }
  //computer guessing game mode
  else if (gameMode === "reverse" || gameMode === "Reverse") {
    Reverse(); //function for reverse game mode
  }
  //user exiting game
  else if (gameMode === "exit" || gameMode === "Exit") {
    console.log("Thanks for visitng.");
    process.exit(); //exit
  }
  //player inputs some other value in the terminal
  else {
    console.log(
      "Please input one of the options given. Otherwise we can't play!"
    );
    gamePlay();
  }
}

/*-------------------- Forward Game Play -----------------*/

//Async Funtion for user guessing game

//------------------- User Parameter Setup -------------------//

async function Forward() {
  //Computer greeting user
  console.log("\nFantastic, I can't wait to guess your number!\n");

  //Prompt user for maximum input value and assign to max variable
  max = await ask("What is the highest number I can guess?  ");

  //Cheat handling for max not being high enough
  if (max < 0) {
    max = await ask(
      "Please make sure to choose a maximum value equal to or above 1. Input your maximum range."
    );
  }

  //Turn max response into integer (number type)
  max = parseInt(max);
  //confirm value corresponds
  console.log(max);

  //Prompt user for minimum input value and assign to min variable
  min = await ask(
    "\nWhat is the lowest number I can guess? \nThis number must be 1 or higher.  "
  );

  //Cheat handling for min not being high enough
  if (min < 0 || min > max) {
    min = await ask(
      "Please make sure to choose a minimum value equal to or above 1. Input your minimum range."
    );
  }

  //Turn min response into integer (number type)
  min = parseInt(min);
  //confirm value corresponds
  console.log(min);

  //Prompt user for their Secret Number and assign to secretNumb variable
  let secretNumb = await ask(
    "What is your secret number?\nI promise not to cheat!  "
  );

  //Turn min response into integer (number type)
  secretNumb = parseInt(secretNumb);
  //confirm value corresponds
  // console.log(secretNumb);

  //Computer calculates guess based on provided min and max from user
  function guess(min, max) {
    //returns a number half way between minimum and maximum range values
    return Math.floor((max - min) / 2) + min;
  }

  //Cheat handling for secretNumb not being within range
  while (secretNumb < min || secretNumb > max) {
    secretNumb = await ask(
      "Your secret number must be in the range you specified. Please input your secret number."
    );
  }

  //Confirm secret number and show user through template literal
  console.log(`Your secret number is ${secretNumb}`);

  //assign variable for computer to guess answer "smartly"
  let compNumb = guess(min, max);
  //verification of computers guess
  // console.log(compNumb);

  //------------------- Computer begins guessing -------------------//

  //ask user if guess is correct and verify computer guess using template literal
  let answer = await ask(`is your number ${compNumb}? (Y) or (N) `);
  //to upper case to ensure user input of N/Y or n/y will work
  answer = answer.toUpperCase();

  //Computer guesses correctly on the first try. Game starts over to game choice.
  if (answer === "Y") {
    console.log(
      `Your number is really ${compNumb}? I can't believe I guessed it on the first try!`
    );
    gamePlay();
  } else {
    //Computer guessed wrong - begins Yes/No and High/Low questions

    //Tried to figure out where GuessCount should go, but ran out of time.

    while (answer !== "Y") {
      /*Computer did not guess correctly, now need to ask if secret number is higher or lower */
      let hLAnswer = await ask(
        ` Is your number higher (H) or lower (L) than ${compNumb}?\n`
      );
      //to upper case to ensure user input of H/L or h/l will work
      hLAnswer = hLAnswer.toUpperCase();
      //check user input
      // console.log(hLAnswer);

      //Cheat Handling for human inputting incorrect answer
      //When player says their number is Lower than the computer guess and that is false
      if (compNumb - 1 < min && hLAnswer === "L") {
        console.log(
          `No cheating allowed! I know your number is higher than ${
            compNumb - 1
          }`
        );
      }
      //When player says their number is Higher than the computer guess and that is false
      else if (compNumb + 1 > max && hLAnswer === "H") {
        console.log(
          `No cheating allowed! I know your number is lower than ${
            compNumb + 1
          }`
        );
      }
      //Player number is Lower than the computer guess
      else if (hLAnswer === "L") {
        //Maximum range is now changing
        max = compNumb - 1;
        //Computer calculates new guess based on new range
        compNumb = guess(min, max);
      }
      //Player number is Higher than the computer guess
      else if (hLAnswer === "H") {
        //Minimum range is now changing
        min = compNumb + 1;
        //Computer calculates new guess based on new range
        compNumb = guess(min, max);
      }
      //Computer repeats guessing until they find the right answer
      answer = await ask(`is your number ${compNumb}? Y or N `);
      //to upper case to ensure user input of Y/Y or y/n will work
      answer = answer.toUpperCase();
    }
    console.log(`YAY. I guessed your number ${secretNumb}! `);
    gamePlay();
  }
}

//Brings player back to Screen to choose game
gamePlay();

/*-------------------- Reverse Game Play -----------------*/

//Game functions but little to no Cheat handling. Also could not get recursive function to work so it just exits the game.

async function Reverse() {
  //Computer greeting user
  console.log("\nFantastic, I can't wait for you to guess my number!\n");

  //------------------- User Parameter Setup -------------------//

  max = await ask("What is the highest number for my range?  ");
  //Turn max response into integer (number type)
  max = parseInt(max);
  //confirm value corresponds
  console.log(max);

  min = await ask(
    "What is the lowest number for my range? This number needs to be above 1. "
  );
  //Turn min response into integer (number type)
  min = parseInt(min);
  //confirm value corresponds
  console.log(min);

  //Computer calculates random number based on user range input
  let compNumb = Math.floor(Math.random() * max + min);
  //Record computer number for testing
  console.log(compNumb);

  //Player guesses the computer number
  let playerGuess = await ask(
    `Okay I have thought of a number between ${min} and ${max}. Make your guess! `
  );

  //Make sure guess is an integer
  playerGuess = parseInt(playerGuess);

  //Cheat handling for input not equal to number value
  if (playerGuess == NaN) {
    ("Please be sure your guess is a number value.");
  } else if (playerGuess === compNumb) {
    console.log(
      `Wow! You guessed ${playerGuess} which is equal to my number ${compNumb} on the first guess!`
    );
    gamePlay();
  }
  //Player begins guessing computer number since they did not get the number to begin with
  else {
    while (playerGuess !== compNumb) {
      //Computer lets player know their guess is not within the specified range
      if (playerGuess < min || playerGuess > max) {
        playerGuess = await ask(
          `Please choose a number within the range of ${min} to ${max}.\n`
        );
      }
      //Player's guess is higher than the computer number
      else if (playerGuess > compNumb) {
        playerGuess = await ask("Oh no! You guessed too high. Guess again\n");
      }
      //Player's guess is lower than the computer number
      else if (playerGuess < compNumb) {
        playerGuess = await ask(
          "I'm sorry! You guessed too low. Guess again\n"
        );
      }
      //Once player guesses the computer number
      else {
        console.log(
          `Fantastic! You guessed ${playerGuess} and that matches my number ${compNumb}!`
        );
        //Exit the program or it will break the console...
        process.exit();
      }
    }
  }
}
gamePlay();
