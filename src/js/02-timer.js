import 'flatpickr/dist/flatpickr.min.css';
import '../css/02-timer.css';
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  pulseEl: document.querySelector('#pulse'),
  inputPickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysSpanEl: document.querySelector('[data-days]'),
  hoursSpanEl: document.querySelector('[data-hours]'),
  minutesSpanEl: document.querySelector('[data-minutes]'),
  secondsSpanEl: document.querySelector('[data-seconds]'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseFlatpickr,
};

let selectedTimestamp = null;
let intervalId = null;

disableElement(refs.startBtnEl, true);
updateCounterValues(convertMs(0));

flatpickr('#datetime-picker', flatpickrOptions);

refs.startBtnEl.addEventListener('click', onStartBtnClick);

function onCloseFlatpickr(selectedTimestamps) {
  selectedTimestamp = new Date(selectedTimestamps[0]).getTime();

  if (Date.now() > selectedTimestamp) {
    Notify.failure('Please choose a date in the future');
    disableElement(refs.startBtnEl, true);
  } else {
    disableElement(refs.startBtnEl, false);
  }
}

function onStartBtnClick() {
  processCountdown();
  toggleCountdownAnimation();

  intervalId = setInterval(processCountdown, 1000);

  disableElement(refs.startBtnEl, true);
  disableElement(refs.inputPickerEl, true);
}

function disableElement(element, disable) {
  if (disable) {
    element.setAttribute('disabled', '');
  } else {
    element.removeAttribute('disabled');
  }
}

function toggleCountdownAnimation() {
  refs.pulseEl.classList.toggle('pulse');
}

function processCountdown() {
  const deltaMs = selectedTimestamp - Date.now();

  updateCounterValues(convertMs(deltaMs));

  if (deltaMs < 999) {
    resetCountdown();
  }
}

function resetCountdown() {
  clearInterval(intervalId);
  updateCounterValues(convertMs(0));
  toggleCountdownAnimation();
  disableElement(refs.inputPickerEl, false);
}

function updateCounterValues({ days, hours, minutes, seconds }) {
  refs.daysSpanEl.textContent = addLeadingZero(days);
  refs.hoursSpanEl.textContent = addLeadingZero(hours);
  refs.minutesSpanEl.textContent = addLeadingZero(minutes);
  refs.secondsSpanEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
