const states = {
    view: {
        squares: document.querySelectorAll('.game-panel_row--square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('.game-menu_time--value'),
        score: document.querySelector('.game-menu_score--value'),
        lives: document.querySelector('.game-menu_lives--value'), 
        resultWrapper: document.querySelector('.game-result'),
        resultText: document.querySelector('.game-result_text'),
        restartButton: document.querySelector('.game-result_button')
    }, 
    values: {
        hitPosition: 0,
        result: 0,
        lives: 3,
        currentTime: 10
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playSound() {
    let audio = new Audio('./src/sounds/hit.m4a')
    audio.volume = 0.2
    audio.play()
}
function countDown() {
    states.values.currentTime--
    if(states.values.currentTime <= 0) {
        states.view.timeLeft.textContent = `00:00`
        clearInterval(states.actions.timerId)
        states.view.resultWrapper.style.display = 'flex'
        states.view.resultText.textContent = `Times Over. Your result was: ${states.values.result}`
        restartGame()
    } else if (states.values.currentTime < 10){
        const seconds = states.values.currentTime % 60;
        states.view.timeLeft.textContent = `00:0${seconds}`
    } else {
        const minutes = Math.floor(states.values.currentTime/60);
        const seconds = states.values.currentTime % 60;
        states.view.timeLeft.textContent = `0${minutes}:${seconds}`
    }
}
function randomSquare(){
    states.view.squares.forEach((square) => {
        if (square.classList.contains('enemy')) {
            square.classList.remove('enemy')
        }
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = states.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    states.values.hitPosition = randomSquare.id

}
function addListenerHitBox() {
    states.view.squares.forEach((square) => {        
        square.addEventListener('click', () => {
            if (square.id === states.values.hitPosition) {
                playSound()
                states.values.result++
                states.view.score.textContent = states.values.result
                states.values.hitPosition = null
            } else {
                console.log('errou o clique', states.values.lives)
                states.values.lives--
                states.view.lives.textContent = states.values.lives
                if (states.values.lives === 0) {
                    clearInterval(states.actions.timerId)
                    clearInterval(states.actions.countDownTimerId)
                    states.view.resultWrapper.style.display = 'flex'
                    states.view.resultText.textContent = `Game Over. Your result was: ${states.values.result}`
                    restartGame()
                    return
                }
            }
        })
    })
}
function start() {
    addListenerHitBox()
}
function restartGame() {
    const restartButton = states.view.restartButton

    restartButton.addEventListener('click', () => window.location.reload())
}

start()