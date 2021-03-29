import React from 'react';
import './Location.scss';

function Location(props) {
    return (
        <p className="weather__location">{props.location.city}, {props.location.country}</p>
    );
}

export default Location;