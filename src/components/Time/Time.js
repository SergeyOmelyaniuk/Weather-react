import React, {Component} from 'react';
import './Time.scss';
import {dateList} from '../../constants';

class Time extends Component {
    constructor(){
        super();
        this.state = { time: '' }
    }

    componentDidMount(){
        setInterval(this.setDate, 1000);
    }

    setDate = () => {
        const { lang } = this.props;

        const dayWeek = new Date().getDay();
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let sec = new Date().getSeconds();

        if (sec < 10) {
            sec = "0" + sec;
        }

        if (minute < 10) {
            minute = "0" + minute;
        }

        const time = `${dateList[lang].dayOfWeek[dayWeek]} ${day} ${dateList[lang].dateMonth[month]} ${hour}:${minute}:${sec}`;
        this.setState( { time });

    }

    render(){
        return (
            <p className="weather__date">{this.state.time}</p>
        )
    }
}

export default Time;