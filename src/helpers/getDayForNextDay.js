function getDayForNextDay(today, value) {
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + value);

  return tomorrow.getDay();
}

export default getDayForNextDay;