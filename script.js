
const btnFlorest = document.querySelector(".florest")
const btnRain = document.querySelector(".rain")
const btnCoffee = document.querySelector(".coffee")
const btnFire = document.querySelector(".fire")

const btnPlay = document.querySelector(".play")
const btnStop = document.querySelector(".stop")
const btnIncrement = document.querySelector(".increment")
const btnDecrement = document.querySelector(".decrement")

const soundFlorest = new Audio("./sounds/Floresta.wav")
const soundRain = new Audio("./sounds/Chuva.wav")
const soundCoffee = new Audio("./sounds/Cafeteria.wav")
const soundFire = new Audio("./sounds/Lareira.wav")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

let minutesDisplay = document.querySelector("#minutes")
let secondsDisplay = document.querySelector("#seconds")
let timerTimeOut
let minutes = minutesDisplay.textContent

let selected = document.querySelector(".select")

function stopSound(sound) {

    switch (sound) {
        case 'florest':
            soundFlorest.pause()
            break
        case 'rain':
            soundRain.pause()
            break
        case 'coffee':
            soundCoffee.pause()
            break
        case 'fire':
            soundFire.pause()
            break
    }

}

function playSound(sound) {

    switch (sound) {
        case 'florest':
            soundFlorest.play()
            break
        case 'rain':
            soundRain.play()
            break
        case 'coffee':
            soundCoffee.play()
            break
        case 'fire':
            soundFire.play()
            break
    }

}


function handleClick(button) {
    if (selected == null) {
        playSound(button.classList[1])
        button.classList.add("select")

    } else if (button.classList[1] != selected.classList[1]) {
        button.classList.add("select")
        playSound(button.classList[1])
        selected.classList.remove("select")
        stopSound(selected.classList[1])

    } else {
        stopSound(button.classList[1])
        button.classList.remove("select")

    }

    selected = document.querySelector(".select")

}

btnFlorest.addEventListener('click', () => {
    handleClick(btnFlorest)

})

btnRain.addEventListener('click', () => {
    handleClick(btnRain)

})

btnCoffee.addEventListener('click', () => {
    handleClick(btnCoffee)

})

btnFire.addEventListener('click', () => {
    handleClick(btnFire)

})



btnIncrement.addEventListener('click', () => {
    minutes = minutesDisplay.textContent
    if (minutes < 60)
        updateDisplay(++minutes, 0)

})

btnDecrement.addEventListener('click', () => {
    minutes = minutesDisplay.textContent
    if (minutes > 0)
        updateDisplay(--minutes, 0)
    
})

btnPlay.addEventListener('click', () => {
    countdown()
})

btnStop.addEventListener('click', () => {
    clearTimeout(timerTimeOut)
})

function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
    secondsDisplay.textContent = String(seconds).padStart(2, '0')

}

function reset() {
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)

}


function countdown() {
    timerTimeOut = setTimeout(() => {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)

        updateDisplay(minutes, 0)

        if (minutes <= 0 && seconds <= 0) {
            reset()
            updateDisplay()
            kitchenTimer.play()
            return
        }

        if (seconds <= 0) {
            seconds = 60
            --minutes
        }

        updateDisplay(minutes, String(seconds - 1))

        countdown()

    }, 1000)

}