var prompt = require('prompt');
prompt.start();

var computedAnswer = Math.floor( Math.random() * 6);
var attempts = 3;
var hints = ['hero','won','poo','free','more','hive']

console.log('Please enter a number from 0 to 5');
function gamePlay () {
    prompt.get(['yourNumber'], function (err, answer){
        attempts--;
           if (err){
                console.log('uh oh... Something went wrong!');
            } else if (computedAnswer === Number(answer.yourNumber)){
                console.log('You win! My number was also ' + computedAnswer + '!');
            } else if (attempts > 0) {
                console.log('Try again! You have ' + attempts + ' attempts remaining!');
                if (attempts === 1) {
                    console.log('Hint!!! I\'m thinking of something that rhymes with: ' + '\"' + hints[computedAnswer]+ '\"');
                }
                gamePlay();
            } else {
                console.log('I was thinking about the number ' + computedAnswer+'!');
            }
        
});
}

gamePlay();