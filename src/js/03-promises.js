// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
//  стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

import { Notify } from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  // let { delay, step, amount } = Number(event.currentTarget.value);

  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseValue = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promiseValue);
    }
    reject(promiseValue);
  });
}
