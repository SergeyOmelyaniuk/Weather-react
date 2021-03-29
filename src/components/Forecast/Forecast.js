import React from 'react';
import './Forecast.scss';
import { dateList } from '../../constants';
import getDayForNextDay from '../../helpers/getDayForNextDay';
import getTemperature from '../../helpers/getTemperature';

function Forecast(props) {
    const { forecast, typeTemp, lang } = props;

    const forecastFirstCurrent = getTemperature(forecast.tempFirst, typeTemp);
    const forecastSecondCurrent = getTemperature(forecast.tempSecond, typeTemp);
    const forecastThirdCurrent = getTemperature(forecast.tempThird, typeTemp);

    const dayWeekLang = dateList[lang].dayOfWeek;

    const today = new Date();
    const nextFirstDay = getDayForNextDay(today, 1);
    const nextSecondDay = getDayForNextDay(today, 2);
    const nextThirdDay = getDayForNextDay(today, 3);

    return (
        <div className="forecast-wrap">
            <div className="forecast">
                <p className="forecast__day">{dayWeekLang[nextFirstDay]}</p>
                <p className="forecast__temperature">{forecastFirstCurrent}</p>
                <img src={require(`../../assets/images/icon/${forecast.iconFirst}.png`).default} alt="" className="forecast__icon" />
            </div>
            <div className="forecast">
                <p className="forecast__day">{dayWeekLang[nextSecondDay]}</p>
                <p className="forecast__temperature">{forecastSecondCurrent}</p>
                <img src={require(`../../assets/images/icon/${forecast.iconSecond}.png`).default} alt="" className="forecast__icon" />
            </div>
            <div className="forecast">
                <p className="forecast__day">{dayWeekLang[nextThirdDay]}</p>
                <p className="forecast__temperature">{forecastThirdCurrent}</p>
                <img src={require(`../../assets/images/icon/${forecast.iconThird}.png`).default} alt="" className="forecast__icon" />
            </div>
        </div>
    );
}

export default Forecast;