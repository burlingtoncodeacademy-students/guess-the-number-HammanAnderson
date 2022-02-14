/*----------------------Readline Interface-------------------*/
const { config } = require('process');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//---------------------Boiler Plate---------------------------//
start();
//unsure of how input is being doubled in value....I put in 1 but it reads 11?

console.log("Let's play a game where you (human) try to guess my (computer) number!") 

async function play() {
    let min = await ask("What is the lowest number you want your guess to be?");
    parseInt(min); //how to make into number type?
    let max = await ask("What is the highest number you want your guess to be?");
    parseInt(max);//how to make into number type?
    let guess =await ask("What is your first guess?");
    parseInt(guess);//how to make into number type?
    console.log( min , max, guess);

let answer = Math.random((Math.floor*max)+ min);
console.log(answer);

function inversePlay(){
  
//User's guess is not a number
if (guess == null){
    "Please be sure your guess is a number value."
}

//users's guess is smaller than the minimum allowance
    if(guess < min){
        console.log("Your guess should be no less than " + min +"!");
    }
//user's guess is larger than the maximum allowance
else if (guess > max){
      console.log("Your guess should be no larger than " + max + "!");
  }
// user's guess is higher than the answer
else if (guess > answer) {
          console.log("Your number is too high.");
      }
//user's guess is lower than the answer
else if (guess < answer){
         console.log("Your answer is too low.");
      } 
//Computer's guess is higher than the Secret Number
    else {
         console.log("Great job! My number is " + answer + "!!!");
      }
}
inversePlay(guess);
}
play();

//definitely appreciate coomments because I do not understand this right now