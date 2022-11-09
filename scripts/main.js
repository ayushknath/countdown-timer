const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const timerInput = document.querySelector(".timer-input");
const hourInput = document.getElementById("hours-input");
const minuteInput = document.getElementById("minutes-input");
const secondInput = document.getElementById("seconds-input");
const timeUps = Array.from(document.querySelectorAll(".time-up"));
const timeDowns = Array.from(document.querySelectorAll(".time-down"));
const timerStart = document.querySelector(".timer-start");
const timerStop = document.querySelector(".timer-stop");
const timerPause = document.querySelector(".timer-pause");
const timerAudio = document.getElementById("timer-audio");

function checkInputLength() {
    if (hourInput.value.length === 1) {
        hourInput.value = `0${hourInput.value}`;
    }

    if (minuteInput.value.length === 1) {
        minuteInput.value = `0${minuteInput.value}`;
    }

    if (secondInput.value.length === 1) {
        secondInput.value = `0${secondInput.value}`;
    }
}

// CHECK FOR INPUT LENGTH EVERY 0.1ms
setInterval(checkInputLength, 100);

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
        checkInputLength();
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
        checkInputLength();
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

// SET TIMER
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        updateDisplay(hourInput.value, hours);
        updateDisplay(minuteInput.value, minutes);
        updateDisplay(secondInput.value, seconds);
        timerInput.classList.remove("show-input-panel");
    }
});

// START TIMER
function startTimer() {
    let hr = parseInt(hours.innerHTML);
    let min = parseInt(minutes.innerHTML);
    let sec = parseInt(seconds.innerHTML);

    if (hr == 0 && min == 0 && sec == 0)
        return;

    timerStart.removeEventListener("click", startTimer);
    timerStart.classList.add("disabled");
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

                    timerStart.addEventListener("click", startTimer);
                    timerStart.classList.remove("disabled");
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

timerStart.addEventListener("click", startTimer);
document.addEventListener("keydown", e => {
    if (e.key === ' ')
        startTimer();
});

// PAUSE TIMER
function pauseTimer() {
    if (timerStart.classList.contains("disabled")) {
        timerStart.classList.remove("disabled");
        timerPause.classList.add("disabled");
        timerStart.addEventListener("click", startTimer);
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
    timerStart.addEventListener("click", startTimer);
    timerStart.classList.remove("disabled");
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