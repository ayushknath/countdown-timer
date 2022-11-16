import * as entities from "./entities.js";
import * as actions from "./actions.js";

// SHOW INPUT PANEL
entities.timerDisplay.addEventListener("click", actions.showInputPanel);

// INCREMENT TIMER
entities.arrowUps.forEach(arrowUp => {
    arrowUp.addEventListener("click", actions.increment);
})

// DECREMENT TIMER
entities.arrowDowns.forEach(arrowDown => {
    arrowDown.addEventListener("click", actions.decrement);
})

// SET TIMER
entities.setTimer.addEventListener("click", actions.updateDisplay);

// START TIMER
entities.startTimer.addEventListener("click", actions.startCountdown);

// PAUSE TIMER
entities.pauseTimer.addEventListener("click", actions.pauseCountdown);

// STOP TIMER
entities.stopTimer.addEventListener("click", actions.stopCountdown);