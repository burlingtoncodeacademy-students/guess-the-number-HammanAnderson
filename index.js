const { exit } = require("process");
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
async function gamePlay(){

  //Three options available. User guessing, computer guessing, or exiting.
  let gameMode = await ask('\nWould you like to play a game?\nIf you want me to guess your number, input forward.\nIf you want to guess my number, input reverse.\nOtherwise you can leave by inputting exit.\n\n');

  //user guessing game mode
  if (gameMode === "forward"){
    userGuess();
  } 
  //computer guessing game mode
  else if (gameMode === "reverse"){
    compGuess();
  }
  //user exiting game
  else if (gameMode === "exit"){
    console.log("Thanks for visitng.")
    process.exit()
  } 

  //player inputs some other value in the terminal
  else {
    console.log("Please input one of the options given. Otherwise we can't play")
    gamePlay()
  }
}


/*-------------------- Forward Game Play -----------------*/

//Async Funtion for user guessing game
async function userGuess() {
  
  //Computer greeting user
  console.log("\nFantastic, I can't wait to guess your number!\n")

  //Prompt user for maximum input value and assign to max variable
  let maxGuess = await ask("What is the highest number I can guess?  ");

  //Turn max response into integer (number type)
  let max = parseInt(maxGuess);
  //confirm value corresponds
  console.log(max);

  //Prompt user for minimum input value and assign to min variable
  let minGuess = await ask(
    "\nWhat is the lowest number I can guess? \nThis number must be 1 or higher.  "
  );

  //Turn min response into integer (number type)
  let min = parseInt(minGuess);
  //confirm value corresponds
  console.log(min);

  //Error handling for minimum value -- must be larger than or equal to 1
  if (min > 0) {
    //Prompt user for their Secret Number and assign to secretNumb variable
    let secretNumb = await ask(
      "What is your secret number?\nI promise not to cheat!  "
    );

    //Turn min response into integer (number type)
    secretNumb = parseInt(secretNumb);
    //Confirm secret number and show user through template literal
    console.log(`Your secret number is ${secretNumb}`);

    //Error handling for when secret number is not within the range specified by user
    if (secretNumb < min || secretNumb > max) {
      console.log(
        `Your secret number is not within the range you gave me! Start over.`
      );
      //restart game
      gamePlay();
    } else {
      //Turn response into integer(number type)
      secretNumb = parseInt(secretNumb);

      //computer will guess answer "smartly"
      let compNumb = min + Math.floor((max - min) / 2);
      console.log(compNumb);

      //ask user if guess is correct and verify computer guess using template literal
      let answer = await ask(`is your number ${compNumb}? Y or N `);
      //to upper case to ensure user input of N or n will work
      console.log(answer);
      answer = answer.toUpperCase();

      while (compNumb !== secretNumb && answer === "N") {
        //ask user if the Computer Guess is higher or lower than the Secret Number
        let hLanswer = await ask(
          "Is the secret number higher(H) or lower(L)?  "
        );
        //to upper case to ensure user input of H or h will work
        console.log(hLanswer);
        hLanswer = hLanswer.toUpperCase();

        if (hLanswer === "H") {
          let min = max - compNumb;
          // let newCompGuess = min + Math.floor((max - min) / 2);
          // console.log(newCompGuess);
        }
      }
    }
  } else {
    //Will return message and allow user to restart the game
    console.log("Sorry! You didn't play by the rules. Game over.");
    gamePlay();
  }
}

gamePlay();