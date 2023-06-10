const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById('btnLeft');
const btnRightElement = document.getElementById('btnRight');

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');
const milDecElement = document.getElementById('milDec');
const milUniElement = document.getElementById('milUni');
const splitsElement = document.getElementById('splits');

function printTime() {
  printSeconds();
  printMinutes();
}

const printMinutes = () => {
  let minutes = chronometer.getMinutes();
  let twoDigitMin = chronometer.computeTwoDigitNumber(minutes);
  minDecElement.innerText = twoDigitMin[0];
  minUniElement.innerText = twoDigitMin[1];
}

const printSeconds = () => {
  let seconds = chronometer.getSeconds();
  let twoDigitSec = chronometer.computeTwoDigitNumber(seconds);
  secDecElement.innerText = twoDigitSec[0];
  secUniElement.innerText = twoDigitSec[1];
}

const printSplit = () => {
  let divSplit = document.createElement("li");
  divSplit.innerText = chronometer.split();
  splitsElement.appendChild(divSplit);
}

const clearSplits = () => {
  document.querySelectorAll("li").forEach(element => {
    element.remove()
  }); 
}

const setStopBtn = () => {
  btnLeftElement.removeAttribute('class', 'btn start');
  btnLeftElement.setAttribute('class', 'btn stop');
  btnLeftElement.innerText = 'STOP';
}

const setSplitBtn = () => {
  btnRightElement.removeAttribute('class', 'btn reset');
  btnRightElement.setAttribute('class', 'btn split');
  btnRightElement.innerText = 'SPLIT';
}

const setStartBtn = () => {
  btnLeftElement.removeAttribute('class', 'btn stop');
  btnLeftElement.setAttribute('class', 'btn start');
  btnLeftElement.innerText = 'START';
}

const setResetBtn = () => {
  btnRightElement.removeAttribute('class', 'btn split');
  btnRightElement.setAttribute('class', 'btn reset');
  btnRightElement.innerText = 'RESET';
}

// Start/Stop Button
btnLeftElement.addEventListener('click', () => {
  if (btnLeftElement.innerText === 'START') {
    setStopBtn();
    setSplitBtn();
    chronometer.start(() => {
    printTime();
    });
  } else {
    setStartBtn();
    setResetBtn();

    chronometer.stop();
  }
});

// Reset/Split Button
btnRightElement.addEventListener('click', () => {
  if (btnRightElement.innerText === 'RESET') {
    secDecElement.innerText = 0;
    secUniElement.innerText = 0;
    minDecElement.innerText = 0;
    minUniElement.innerText = 0;
    milDecElement.innerText = 0;
    milUniElement.innerText = 0;
    clearSplits();
    chronometer.reset();
  } else {
    printSplit();
    chronometer.split();
  }
});
