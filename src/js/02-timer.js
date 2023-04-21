import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dataDay: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),

}

let choseDate = null;
let timerId = null;

disableBtnStart(true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choseDate = selectedDates[0]
    checkDate();
  },
};



flatpickr(refs.inputDate, options);

refs.btnStart.addEventListener('click', startTimer);

function disableBtnStart() {
refs.btnStart.disabled = false;
}

function checkDate() {
  if (choseDate > new Date) {
    refs.btnStart.disabled(true);
  } else {
    alert("Please choose a date in the future")
  }
}

function startTimer() {

  refs.btnStart.disabled(true);
  refs.inputDate.disabled = true;

  timerId = setInterval(() => {
    let timeDiff = choseDate - new Date;
    if (timeDiff <= 0) {
      clearInterval(timerId);
      refs.inputDate.disabled = false;
      return
    }
    const convertMsDate = convertMs(timeDiff);
    showTime(convertMsDate);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

function showTime({days, hours, minutes, seconds}) {
  refs.dataDay.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}