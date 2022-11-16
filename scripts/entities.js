const timerInputPanel = document.querySelector(".timer-input");
const timerDisplay = document.querySelector(".timer-display");
const arrowUps = Array.from(document.querySelectorAll(".arrow-up"));
const arrowDowns = Array.from(document.querySelectorAll(".arrow-down"));
const hourInput = document.getElementById("hours-input");
const minuteInput = document.getElementById("minutes-input");
const secondInput = document.getElementById("seconds-input");
const setTimer = document.querySelector(".timer-set");
const hourDisplay = document.querySelector(".hours");
const minuteDisplay = document.querySelector(".minutes");
const secondDisplay = document.querySelector(".seconds");
const startTimer = document.querySelector(".timer-start");
const pauseTimer = document.querySelector(".timer-pause");
const stopTimer = document.querySelector(".timer-stop");
const timesUpAudio = document.getElementById("timer-audio");

export { timerInputPanel, timerDisplay, arrowUps, arrowDowns, hourInput, minuteInput, secondInput, setTimer, hourDisplay, minuteDisplay, secondDisplay, startTimer, pauseTimer, stopTimer, timesUpAudio };