
var buttonColours =["red", "blue","green", "yellow"]
var gamePattern = []
var userClickPattern = []
var gameStarted = false
var level = 0

 // to detect when a button is clicked
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id")
   userClickPattern.push(userChosenColour)
   playSound(userChosenColour)
   animatePress(userChosenColour)
   checkAnswer(userClickPattern.length - 1)
   
})


//to play the corresponding audio
function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3")
   audio.play()
}

//detect when a key has been pressed from the keyboard
$(document).keypress(function(event){
    if (gameStarted === false){
        nextSequence()
    }
    gameStarted = true
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    level++
    $("h1").text("Level " + level)

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 1000)
            userClickPattern = []
            
        }
    } else {
        var audio = new Audio("./sounds/wrong.mp3")
        audio.play()
        
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
    userClickPattern = []
}
