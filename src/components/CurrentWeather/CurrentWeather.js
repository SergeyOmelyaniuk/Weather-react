import React from 'react';
import './CurrentWeather.scss';
import { translate } from '../../constants';
import getTemperature from '../../helpers/getTemperature';

function CurrentWeather(props) {
    const tempCel = props.currentWeather.temperature;
    const tempFar = tempCel*9/5+32;

    const feelsLike = Math.round(props.currentWeather.feelsLike);
    const wind = Math.round(props.currentWeather.wind);
    const humidity = Math.round(props.currentWeather.humidity);

    const weather = translate[props.lang].weather;
    const temperature = getTemperature(tempCel, props.typeTemp);

    return (
        <div className="temperature">
            <div className="temperature__value">{temperature}</div>
            <div className="temperature__block">
                <img src={require(`../../assets/images/icon/${props.currentWeather.iconMain}.png`).default} alt="" className="temperature__icon" />
                <ul className="temperature__property">
                    <li>{props.currentWeather.weather.toUpperCase()}</li>
                    <li>{`${translate[props.lang].weather.feelsLike} ${feelsLike}°`}</li>
                    <li>{`${weather.wind} ${wind} ${weather.speed}`}</li>
                    <li>{`${weather.humidity} ${humidity} %`}</li>
                </ul>
            </div>
        </div>
    );
}

export default CurrentWeather;