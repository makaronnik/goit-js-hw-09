const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};

let inProgress = false;
let intervalId = null;

toggleButtons();

refs.startBtnEl.addEventListener('click', onStartBtnClick);
refs.stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (inProgress) {
    return;
  }

  inProgress = true;

  toggleButtons();
  changeBodyBgColor();

  intervalId = setInterval(changeBodyBgColor, 1000);
}

function onStopBtnClick() {
  inProgress = false;

  toggleButtons();

  clearInterval(intervalId);
}

function toggleButtons() {
  const buttons = Object.values(refs);

  if (!inProgress) {
    buttons.reverse();
  }

  buttons[0].setAttribute('disabled', '');
  buttons[1].removeAttribute('disabled');
}

function changeBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
