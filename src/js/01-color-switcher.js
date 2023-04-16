const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
// не активна кнопка  Start 
stopBtn.disabled = true;


startBtn.addEventListener('click', () => {

    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerId = setInterval( () => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
})
stopBtn.addEventListener('click', () => {

    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

