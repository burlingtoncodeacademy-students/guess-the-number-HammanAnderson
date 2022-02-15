/*----------------------Readline Interface-------------------*/
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//-----------Boiler Plate--------------------------------------

//confused on async function. I know I need to call it within the function...
start()

//Want to play a game? I will guess your number!

console.log("Lets play a game where I the computer guess your number!");
//computer asks for max number and min number
let max = await ask("what is the highest number I can guess?");
parseInt(max);
let min = await ask("what it the lowest number I can guess?");
parseInt(min);
//awaits player answer for secret number --- stores as secretNum
let secretNumber = await ask("what is your secret number?\nI promise I won't look!");
parseInt(secretNumber);

//computer creates "random" number
//could also be Math.random() = (Math.floor()*max + min)+ min -- but method below should be faster to answer
let compGuess = Math.floor((min + max) / 2);
compGuess;

//does computer's guess equal secret number?
let yesNo = await ask("Is your number " + compGuess + "?" + y + " for yes and " + n + " no");
yesNo;
y = false
n = true
//how to get yesNo answer?? I know its a boolean value where no is true and yes is false

while (true) {
    
    //Computer's guess is equal to the Secret Number
          if (compGuess === secretNum) {
            console.log("Your number is " + compGuess + "!");
          }
    //Computer's guess is lower than the Secret Number
           else if (compGuess < secretNum) {
              min = compGuess + 1;
          } 
    //Computer's guess is higher than the Secret Number
          else {
              max = compGuess - 1;
          }
        console.log("error");
 
}


//definitely appreciate coomments because I do not understand this right now

