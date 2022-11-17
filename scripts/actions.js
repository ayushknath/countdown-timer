import * as entities from "./entities.js";

let isTimerSet = false;

function showInputPanel() {
    entities.timerInputPanel.classList.add("show-input-panel");

    // ADD EVENT LISTENER TO HIDE INPUT PANEL AFTER SOMETIME
    setTimeout(() => { document.body.addEventListener("click", hideInputPanel); }, 10);
}

function hideInputPanel(e) {
    let targetElement = e.target;

    // PREVENTS INPUT PANEL FROM HIDING IF INNER ELEMENTS ARE CLICKED
    for (let i = 0; i < 4; i++) {
        if (targetElement === document.body) break;
        else if (targetElement.classList.contains("timer-input")) return;
        else if (targetElement.classList.contains("timer-set")) break;
        else if (!targetElement.parentElement.classList.contains("timer-input")) targetElement = targetElement.parentElement;
        else return;
    }

    entities.timerInputPanel.classList.remove("show-input-panel");
    document.body.removeEventListener("click", hideInputPanel);
}

function increment(e) {
    let targetElement = e.target;

    if (targetElement.parentElement.classList.contains("hours-input-grp"))
        parseInt(entities.hourInput.value) < 23 ? entities.hourInput.value = `${parseInt(entities.hourInput.value) + 1}` : entities.hourInput.value = '0';

    else if (targetElement.parentElement.classList.contains("minutes-input-grp"))
        parseInt(entities.minuteInput.value) < 59 ? entities.minuteInput.value = `${parseInt(entities.minuteInput.value) + 1}` : entities.minuteInput.value = '0';

    else
        parseInt(entities.secondInput.value) < 59 ? entities.secondInput.value = `${parseInt(entities.secondInput.value) + 1}` : entities.secondInput.value = '0';
}

function decrement(e) {
    let targetElement = e.target;

    if (targetElement.parentElement.classList.contains("hours-input-grp"))
        parseInt(entities.hourInput.value) > 0 ? entities.hourInput.value = `${parseInt(entities.hourInput.value) - 1}` : entities.hourInput.value = '23';

    else if (targetElement.parentElement.classList.contains("minutes-input-grp"))
        parseInt(entities.minuteInput.value) > 0 ? entities.minuteInput.value = `${parseInt(entities.minuteInput.value) - 1}` : entities.minuteInput.value = '59';

    else
        parseInt(entities.secondInput.value) > 0 ? entities.secondInput.value = `${parseInt(entities.secondInput.value) - 1}` : entities.secondInput.value = '59';
}

function updateDisplay(e) {
    entities.hourDisplay.innerHTML = entities.hourInput.value;
    entities.minuteDisplay.innerHTML = entities.minuteInput.value;
    entities.secondDisplay.innerHTML = entities.secondInput.value;

    if (parseInt(entities.hourInput.value) !== 0 || parseInt(entities.minuteInput.value) !== 0 || parseInt(entities.secondInput.value) !== 0) isTimerSet = true;
    else isTimerSet = false;

    hideInputPanel(e);
}

function finishCountdown(isComplete = false) {
    if (isComplete) entities.timesUpAudio.play();

    for (let i = 0; i < 999999; i++) {
        clearInterval(i);
    }

    entities.timerDisplay.addEventListener("click", showInputPanel);
    entities.pauseTimer.style.display = "none";
    entities.startTimer.style.display = "flex";

    entities.hourInput.value = '0';
    entities.minuteInput.value = '0';
    entities.secondInput.value = '0';

    isTimerSet = false;
}

function startCountdown() {
    if (!isTimerSet) return;

    entities.timerDisplay.removeEventListener("click", showInputPanel);
    entities.startTimer.style.display = "none";
    entities.pauseTimer.style.display = "flex";

    setInterval(() => {
        if (parseInt(entities.secondDisplay.innerHTML) > 0) {
            entities.secondDisplay.innerHTML = `${parseInt(entities.secondDisplay.innerHTML) - 1}`;
        } else if (parseInt(entities.minuteDisplay.innerHTML) > 0) {
            entities.minuteDisplay.innerHTML = `${parseInt(entities.minuteDisplay.innerHTML) - 1}`;
            entities.secondDisplay.innerHTML = "59";
        } else if (parseInt(entities.hourDisplay.innerHTML) > 0) {
            entities.hourDisplay.innerHTML = `${parseInt(entities.hourDisplay.innerHTML) - 1}`;
            entities.minuteDisplay.innerHTML = "59";
            entities.secondDisplay.innerHTML = "59";
        } else finishCountdown(true);
    }, 1000);
}

function pauseCountdown() {
    finishCountdown();
}

function stopCountdown() {
    entities.hourDisplay.innerHTML = '0';
    entities.minuteDisplay.innerHTML = '0';
    entities.secondDisplay.innerHTML = '0';
    finishCountdown();
}

export { showInputPanel, hideInputPanel, increment, decrement, updateDisplay, startCountdown, pauseCountdown, stopCountdown };