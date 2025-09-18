import readline from "readline-sync";
//NUMBER GUESSING GAME
//define diffculty levels, saved in enums so we can only restrict possible values, like strings easy med hard
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "Easy";
    Difficulty["Medium"] = "Medium";
    Difficulty["Hard"] = "Hard";
})(Difficulty || (Difficulty = {}));
//set of rules for each diff level
//generics  --> to give a custom type to a variable
const difficultyConfig = {
    [Difficulty.Easy]: { min: 1, max: 10, attempts: 7 },
    //object
    [Difficulty.Medium]: { min: 1, max: 50, attempts: 5 },
    [Difficulty.Hard]: { min: 1, max: 100, attempts: 7 },
};
//func to generate a random number
function getrandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //math.floor rounds down, math.random gives num between 0 and 1
    //*  (max - min + 1)) +min; //scales it to our range
    // by this formula, result is always between min and max (inclusive).
}
//play onee round of  the game
function playRound(round, difficulty) {
    const { min, max, attempts } = difficultyConfig[difficulty];
    let randomNum = getrandNum(min, max);
    let remainAttempts = attempts;
    console.log(`\nRound ${round} - Difficulty: ${difficulty}`);
    console.log(`i have chosen a number between ${min} and ${max}. You have ${attempts} attempts to guess it.`);
    while (remainAttempts > 0) {
        const guess = parseInt(readline.question("enter your guess: (attempts left :)" + attempts + ": ")); //parseint converts string to int
        if (guess == randomNum) {
            console.log("congrats! you guessed the number!");
            return {
                round,
                difficulty,
                success: true,
                attemptsUsed: attempts - remainAttempts + 1,
                score: 10,
            };
        }
        else if (guess > randomNum) {
            console.log("too high! try again.");
        }
        else {
            console.log("too low! try again.");
            remainAttempts--;
        }
    }
    console.log(`sorry, you've used all your attempts. The correct number was ${randomNum}.`);
    return {
        round,
        difficulty,
        success: false,
        attemptsUsed: attempts,
        score: 0,
    };
}
// ask  player to choose difficulty lvl
function chooseDifficulty() {
    const choices = Object.values(Difficulty);
    const index = readline.keyInSelect(choices, "Choose a difficulty level:", { cancel: false });
    return choices[index];
}
//main game loop
function main() {
    console.log("welcome to the multi round number guessing game");
    let round = 1;
    const results = [];
    let playAgain = true;
    while (playAgain) {
        const difficulty = chooseDifficulty();
        const result = playRound(round, difficulty);
        results.push(result);
        const totalScore = results.reduce((sum, r) => sum + r.score, 0); //r is index number of each object in array
        console.log(`your total score: ${totalScore}`);
        playAgain = readline.keyInYN("do you want to play another round? "); //y or n
        round++;
    }
    console.log("\nGame Over! Here are your results:");
    results.forEach(r => {
        console.log(`Round ${r.round} - Difficulty: ${r.difficulty} - ${r.success ? "Success" : "Failed"} - Attempts Used: ${r.attemptsUsed} - Score: ${r.score}`);
    });
    const finalScore = results.reduce((sum, r) => sum + r.score, 0);
    console.log(`Your final score after ${results.length} rounds is: ${finalScore}`);
    console.log("Thanks for playing! Goodbye!");
}
main();
//# sourceMappingURL=project2.js.map