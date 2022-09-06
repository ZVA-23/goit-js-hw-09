// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет-магазинах,
// сторінках реєстрації подій, під час технічного обслуговування тощо.

// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку,
//     по кліку на яку, таймер повинен запускатися.Додай мінімальне
//     оформлення елементів інтерфейсу.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

const dateChosen = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerClassDiv = document.querySelector('.timer');
const dayComponent = document.querySelector('[data-days]');
const hourComponent = document.querySelector('[data-hours]');
const minuteComponent = document.querySelector('[data-minutes]');
const secondeComponent = document.querySelector('[data-seconds]');

startBtn.classList.add('disabled');

let userDayTime = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      startBtn.disabled = false;
      startBtn.classList.remove('disabled');
      userDayTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
    startBtn.disabled = true;
  }
  timerStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDayTime - currentTime;
      const elements = convertMs(deltaTime);

      secondeComponent.textContent = elements.seconds;
      minuteComponent.textContent = elements.minutes;
      hourComponent.textContent = elements.hours;
      dayComponent.textContent = elements.days;
      if (deltaTime <= 0) {
        this.timerStop();
        timerClassDiv.innerHTML = 'Time is over!';
      }
    }, 1000);
  }
  timerStop() {
    clearInterval(this.timerId);
  }
}
const timer = new Timer();
flatpickr(dateChosen, options);
startBtn.addEventListener('click', () => timer.timerStart());
