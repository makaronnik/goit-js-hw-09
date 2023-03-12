import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/03-promises.css';

const formEl = document.querySelector('form');

let promisesNumber = 0;
let promiseDelay = 0;
let promiseDelayStep = 0;

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  parseElementsValue(Array.from(event.target.elements));

  runPromises();
}

function parseElementsValue(elements) {
  elements.forEach(element => {
    switch (element.name) {
      case 'amount':
        promisesNumber = Number.parseInt(element.value);

        break;

      case 'delay':
        currentPromiseDelay = promiseDelay = Number.parseInt(element.value);

        break;

      case 'step':
        promiseDelayStep = Number.parseInt(element.value);

        break;
    }
  });
}

function runPromises() {
  for (let index = 0; index < promisesNumber; index++) {
    const position = index + 1;
    const currentPromiseDelay = promiseDelay;

    setTimeout(function () {
      createPromise(position, currentPromiseDelay)
        .then(({ position, delay }) => {
          message = `✅ Fulfilled promise ${position} in ${delay}ms`;

          Notify.success(message);
          console.log(message);
        })
        .catch(({ position, delay }) => {
          message = `❌ Rejected promise ${position} in ${delay}ms`;

          Notify.failure(message);
          console.log(message);
        });
    }, currentPromiseDelay);

    promiseDelay += promiseDelayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
