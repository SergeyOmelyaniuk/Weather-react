import getRandomNumber from './getRandomNumber';

function saveStateToLocalStorage(newState){
  const state = {
    ...newState,
    random: getRandomNumber()
  }

  localStorage.setItem('state', JSON.stringify(state));
}

export default saveStateToLocalStorage;