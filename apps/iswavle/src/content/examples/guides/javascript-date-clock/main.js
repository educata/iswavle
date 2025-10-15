const timeElement = document.querySelector('.clock__time');
const dateElement = document.querySelector('.clock__date');

const formatNumber = (number) => {
  return number.toString().padStart(2, '0');
};

const getDayName = (dayIndex) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[dayIndex];
};

function updateClock() {
  const now = new Date();

  const hours = formatNumber(now.getHours());
  const minutes = formatNumber(now.getMinutes());
  const seconds = formatNumber(now.getSeconds());

  const dayName = getDayName(now.getDay());
  const date = formatNumber(now.getDate());
  const month = formatNumber(now.getMonth() + 1);
  const year = now.getFullYear();

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  dateElement.textContent = `${dayName}, ${date}/${month}/${year}`;
}

updateClock();

setInterval(updateClock, 1000);
