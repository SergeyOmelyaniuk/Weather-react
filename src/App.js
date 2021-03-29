import React, { Component } from 'react';
import './App.scss';

import ControlPanel from './components/ControlPanel';
import Map from './components/Map/Map';
import Location from './components/Location/Location';
import Time from './components/Time/Time';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';

import getRandomNumber from './helpers/getRandomNumber';
import saveStateToLocalStorage from './helpers/saveStateToLocalStorage';
import getStateFromLocalStorage from './helpers/getStateFromLocalStorage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      typeTemp: 'C',
      random: 0,
      location: {
        city: 'Moscow',
        country: '-'
      },
      currentWeather: {
        temperature: null,
        iconMain: 'random',
        weather: '-',
        feelsLike: '-',
        wind: '-',
        humidity: '-',
      },
      forecast: {
        tempFirst: null,
        tempSecond: null,
        tempThird: null,
        iconFirst: 'random',
        iconSecond: 'random',
        iconThird: 'random'
      },
      coordinates: {
        lat: 55.7522,
        lng: 37.6156,
        zoom: 8
      },
      error: false
    };
  }

  componentDidMount(){
    const stateFromStorage = getStateFromLocalStorage();

    if (stateFromStorage) {
      this.setState({ lang: stateFromStorage.lang, typeTemp: stateFromStorage.typeTemp });
    }

    this.getAPIWeather(stateFromStorage || this.state);
  }


  getAPIWeather(newState){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newState.location.city}&lang=${newState.lang}&units=metric&APPID=c1069da4db0653ed8ebfab62bf57ed6d`, {
      method: 'GET'
    })
      .then(data => data.json())
      .then(data => {
        this.changeState(data);
        saveStateToLocalStorage({ ...newState, ...data });
      })
      .catch(err => {
        this.showError();
        console.log('error', err);
      })
  }

  changeState(data){ 
    const { city: {name: city, country, coord}, list } = data;

    this.setState({
      random: getRandomNumber(),
      location: {
        city: city,
        country: country
      },
      currentWeather: {
        temperature: list[0].main.temp,
        iconMain: list[0].weather[0].main,
        weather: list[0].weather[0].description,
        feelsLike: list[0].main.feels_like,
        wind: list[0].wind.speed,
        humidity: list[0].main.humidity
      },
      forecast: {
        tempFirst: list[8].main.temp,
        tempSecond: list[16].main.temp,
        tempThird: list[24].main.temp,
        iconFirst: list[8].weather[0].main,
        iconSecond: list[16].weather[0].main,
        iconThird: list[24].weather[0].main
      },
      coordinates: {
        lat: coord.lat,
        lng: coord.lon
      },
      error: false
    })

  }

  changeCity = (result)=> {
    const state = {
      ...this.state,
      location: {...this.state.location, city: result }
    }

    this.getAPIWeather(state);
  }

  updateLang = (value)=> {
    const state = {
      ...this.state,
      lang: value,
      random: getRandomNumber()
    }
    this.setState(state);
    
    saveStateToLocalStorage(state);
    this.getAPIWeather(state);
  }

  updateTypeTemp = (value) => {
    if (this.state.typeTemp !== value) {
      const state = {
        ...this.state,
        typeTemp: value,
        random: getRandomNumber()
      }
      this.setState(state);

      saveStateToLocalStorage(state);
    }
  }

  updateBackground = ()=> {
    const state = {
      ...this.state,
      random: getRandomNumber()
    }
    this.setState(state);                      
  }

  showError(){
    this.setState({
      ...this.state,
      error: true
    });
  }

  hideError(){
    this.setState({
      ...this.state,
      error: false
    });
  }

  verify = (e) => {
    e.preventDefault();
    if (e.target.city.value.length < 2) {
      this.showError();
      console.log('Меньше 2 символов или не тот город');
    } else {
      this.hideError()
      this.changeCity(e.target.city.value);
    }
    e.target.city.value = '';
  }

  render() {
    return (
      <div className='wrapper'>
        <img className='background' src={require(`./assets/images/background-${this.state.random}.jpg`).default} alt=""/>
        <div className='overlay'></div>
        <div className='container'>
          <ControlPanel changeCity={this.changeCity} 
                        lang={this.state.lang} 
                        typeTemp={this.state.typeTemp}
                        updateLang={this.updateLang}
                        updateTypeTemp={this.updateTypeTemp}
                        updateBackground={this.updateBackground}
                        verify={this.verify}
                        error={this.state.error}/>
          <div className='main'>
            <div className="weather">
              <Location location={this.state.location}/>
              <Time lang={this.state.lang}/>
              <CurrentWeather currentWeather={this.state.currentWeather} typeTemp={this.state.typeTemp} lang={this.state.lang}/>
              <Forecast forecast={this.state.forecast} typeTemp={this.state.typeTemp} lang={this.state.lang}/>
            </div>
            <Map coordinates = {this.state.coordinates} lang={this.state.lang}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;