function getTemperature(temperature, temperatureType) {
  if (temperatureType === 'C') {
    return Math.round(temperature) + '°';
  }

  return Math.round(temperature * 9 / 5 + 32) + '°F';
}

export default getTemperature;