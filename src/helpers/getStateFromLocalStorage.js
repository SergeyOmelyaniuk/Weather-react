function getStateFromLocalStorage(){
  return JSON.parse(localStorage.getItem('state')) === null ? null : JSON.parse(localStorage.getItem('state'));
}

export default getStateFromLocalStorage;