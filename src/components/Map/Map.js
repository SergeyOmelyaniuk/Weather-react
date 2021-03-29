import React, {Component} from 'react';
import './Map.scss';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import { translate } from '../../constants';
 
mapboxgl.accessToken = 'pk.eyJ1Ijoib21lbHlhbml1ayIsImEiOiJja2wwcmwwaHowN3p3Mm50N3QybjVtaWRuIn0.AVN6lIafsOvMEBxSgpv3iQ';

class Map extends Component {
    constructor(props){
        super(props);
        this.map = undefined;
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.props.coordinates.lng, this.props.coordinates.lat],
            zoom: this.props.coordinates.zoom
        });
    }

    componentDidUpdate(){
        this.map.jumpTo({center: [this.props.coordinates.lng, this.props.coordinates.lat]});
    }

    render(){
        const coordinate = translate[this.props.lang].coordinates;
        return (
            <div className="map">
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <div className="map__coordinates">
                    <p>{`${coordinate.lat} ${this.props.coordinates.lat}`}</p>
                    <p>{`${coordinate.lon} ${this.props.coordinates.lng}`}</p>
                </div>
            </div>
        );
    }
}

export default Map;