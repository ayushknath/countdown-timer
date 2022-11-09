const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const timerInput = document.querySelector(".timer-input");
const hourInput = document.getElementById("hours-input");
const minuteInput = document.getElementById("minutes-input");
const secondInput = document.getElementById("seconds-input");
const timeUps = Array.from(document.querySelectorAll(".time-up"));
const timeDowns = Array.from(document.querySelectorAll(".time-down"));
const timerStarts = Array.from(document.querySelectorAll(".timer-start"));
const timerStop = document.querySelector(".timer-stop");
const timerPause = document.querySelector(".timer-pause");
const timerAudio = document.getElementById("timer-audio");

// DISPLAY THE INPUT PANEL WHEN THESE ELEMENTS ARE CLICKED
hours.addEventListener("click", () => {
    timerInput.classList.add("show-input-panel");
});
minutes.addEventListener("click", () => {
    timerInput.classList.add("show-input-panel");
});
seconds.addEventListener("click", () => {
    timerInput.classList.add("show-input-panel");
});

// INCREASE VALUE IN INPUT PANEL
timeUps.forEach(timeUp => {
    timeUp.addEventListener("click", () => {
        if (timeUp.parentElement.classList.contains("set-hours") && parseInt(hourInput.value) < 23) {
            hourInput.value = `${parseInt(hourInput.value) + 1}`;
        } else if (timeUp.parentElement.classList.contains("set-minutes") && parseInt(minuteInput.value) < 59) {
            minuteInput.value = `${parseInt(minuteInput.value) + 1}`;
        } else if (timeUp.parentElement.classList.contains("set-seconds") && parseInt(secondInput.value) < 59) {
            secondInput.value = `${parseInt(secondInput.value) + 1}`;
        }
    });
})

// DECREASE VALUE IN INPUT PANEL
timeDowns.forEach(timeDowns => {
    timeDowns.addEventListener("click", () => {
        if (timeDowns.parentElement.classList.contains("set-hours") && parseInt(hourInput.value) > 0) {
            hourInput.value = `${parseInt(hourInput.value) - 1}`;
        } else if (timeDowns.parentElement.classList.contains("set-minutes") && parseInt(minuteInput.value) > 0) {
            minuteInput.value = `${parseInt(minuteInput.value) - 1}`;
        } else if (timeDowns.parentElement.classList.contains("set-seconds") && parseInt(secondInput.value) > 0) {
            secondInput.value = `${parseInt(secondInput.value) - 1}`;
        }
    });
})

// UPDATE TIMER DISPLAY
function updateDisplay(entity, element) {
    if (String(entity).length === 1) {
        if (element.classList.contains("hours")) element.innerHTML = `0${entity}<span class="time-unit">H</span>`;
        else if (element.classList.contains("minutes")) element.innerHTML = `0${entity}<span class="time-unit">M</span>`;
        else element.innerHTML = `0${entity}<span class="time-unit">S</span>`;
    } else {
        if (element.classList.contains("hours")) element.innerHTML = `${entity}<span class="time-unit">H</span>`;
        else if (element.classList.contains("minutes")) element.innerHTML = `${entity}<span class="time-unit">M</span>`;
        else element.innerHTML = `${entity}<span class="time-unit">S</span>`;
    }
}

// CHECKS
function checks() {
    if (!isNaN(parseInt(hourInput.value)) && !isNaN(parseInt(minuteInput.value)) && !isNaN(parseInt(secondInput.value))) {
        if (parseInt(hourInput.value) > 23 || parseInt(hourInput.value) < 0) {
            alert("Hours should be within 0-23");
            return false;
        }
        else if (parseInt(minuteInput.value) > 59 || parseInt(minuteInput.value) < 0) {
            alert("Minutes should be within 0-59");
            return false;
        }
        else if (parseInt(secondInput.value) > 59 || parseInt(secondInput.value) < 0) {
            alert("Seconds should be within 0-59");
            return false;
        }
        else {
            updateDisplay(hourInput.value, hours);
            updateDisplay(minuteInput.value, minutes);
            updateDisplay(secondInput.value, seconds);
            return true;
        }
    }
    else {
        alert("Not a valid number!");
        return false;
    }
}

// START TIMER
function startTimer() {
    let hr = parseInt(hours.innerHTML);
    let min = parseInt(minutes.innerHTML);
    let sec = parseInt(seconds.innerHTML);

    if (hr == 0 && min == 0 && sec == 0)
        return;

    timerStarts.forEach(timerStart => {
        timerStart.removeEventListener("click", startTimer);
    })
    timerStarts[1].classList.add("disabled");
    timerPause.classList.remove("disabled");
    hourInput.setAttribute("disabled", "true");
    minuteInput.setAttribute("disabled", "true");
    secondInput.setAttribute("disabled", "true");

    setInterval(() => {
        if (sec != 0) {
            sec--;
            updateDisplay(sec, seconds);
        } else {
            if (min != 0) {
                min--;
                sec = 59;
                updateDisplay(sec, seconds);
                updateDisplay(min, minutes);
            } else {
                if (hr != 0) {
                    hr--;
                    min = 59;
                    sec = 59;
                    updateDisplay(hr, hours);
                    updateDisplay(sec, seconds);
                    updateDisplay(min, minutes);
                } else {
                    timerAudio.play();

                    for (let i = 0; i < 999999; i++) {
                        clearInterval(i);
                    }

                    timerStarts.forEach(timerStart => {
                        timerStart.addEventListener("click", startTimer);
                    })
                    timerStarts[1].classList.remove("disabled");
                    hourInput.removeAttribute("disabled");
                    minuteInput.removeAttribute("disabled");
                    secondInput.removeAttribute("disabled");
                    hourInput.value = 0;
                    minuteInput.value = 0;
                    secondInput.value = 0;
                }
            }
        }
    }, 1000);
}

timerStarts.forEach(timerStart => {
    timerStart.addEventListener("click", () => {
        if (checks()) {
            startTimer();
            timerInput.classList.remove("show-input-panel");
        }

    });
})
document.addEventListener("keydown", e => {
    if (e.key === "Enter" && !timerStarts[1].classList.contains("disabled") && checks()) {
        startTimer();
        timerInput.classList.remove("show-input-panel");
    }
});

// PAUSE TIMER
function pauseTimer() {
    if (timerStarts[1].classList.contains("disabled")) {
        timerStarts[1].classList.remove("disabled");
        timerPause.classList.add("disabled");
        timerStarts.forEach(timerStart => {
            timerStart.removeEventListener("click", startTimer);
        })
        hourInput.removeAttribute("disabled");
        minuteInput.removeAttribute("disabled");
        secondInput.removeAttribute("disabled");

        for (let i = 0; i < 999999; i++) {
            clearInterval(i);
        }
    }
}

timerPause.addEventListener("click", pauseTimer);
document.addEventListener("keydown", e => {
    if (e.key === 'P' || e.key === 'p') {
        pauseTimer();
    }
});

// STOP TIMER
function stopTimer() {
    timerStarts.forEach(timerStart => {
        timerStart.removeEventListener("click", startTimer);
    })
    timerStarts[1].classList.remove("disabled");
    timerPause.classList.remove("disabled");
    hourInput.removeAttribute("disabled");
    minuteInput.removeAttribute("disabled");
    secondInput.removeAttribute("disabled");
    hourInput.value = 0;
    minuteInput.value = 0;
    secondInput.value = 0;
    hours.innerHTML = "00<span class=\"time-unit\">H</span>";
    minutes.innerHTML = "00<span class=\"time-unit\">M</span>";
    seconds.innerHTML = "00<span class=\"time-unit\">S</span>";

    for (let i = 0; i < 999999; i++) {
        clearInterval(i);
    }
}

timerStop.addEventListener("click", stopTimer);
document.addEventListener("keydown", e => {
    if (e.key === 'X' || e.key === 'x') {
        stopTimer();
    }
});