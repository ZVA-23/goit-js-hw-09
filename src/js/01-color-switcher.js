// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює
//  колір фону < body > на випадкове значення, використовуючи інлайн стиль.
//  Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
//  Зроби так, щоб доки зміна теми запущена, кнопка «Start» була
// неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

const chengeBodyBackgroundColor = () => {
  const body = document.querySelector('body');
  body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  timerId = setInterval(chengeBodyBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
