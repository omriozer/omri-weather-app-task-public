import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faStarIcon, faStarHalfIcon, faSaveIcon } from '../assets/Icons';

function CurrentWeather(props) {

    const city = props.city;
    const currentConditions = city.currentConditions;
    const weatherIconNum = currentConditions.WeatherIcon < 10 ? '0' + currentConditions.WeatherIcon : currentConditions.WeatherIcon;
    const [favoriteToggleShow, setFavoriteToggleShow] = useState(false);

    return (
        <Container fluid>
            <Col>
                <Row>
                    <div className="currentcityWeatherNameDisplay">current weather in:
                        <br /> {props.city.LocalizedName}
                        <span className="pointer" onClick={() => handleFavoriteStatus(city)} onMouseEnter={() => setFavoriteToggleShow(true)} onMouseLeave={() => setFavoriteToggleShow(false)}><br /> {city.favorite ? favoriteToggleShow ? faStarHalfIcon : faStarIcon : faSaveIcon}</span>
                    </div>
                </Row>
                <Row>
                    <div className="CurrentWeatherBoxDiv weatherBox">
                        <div className="boldText tempDiv">{currentConditions.Temperature.Metric.Value}  <span>{'\u00b0'}</span> {currentConditions.Temperature.Metric.Unit}</div>
                        <div className="weatherIconDiv"><img src={`https://developer.accuweather.com/sites/default/files/${weatherIconNum}-s.png`} alt="" /></div>
                        <div className="boldText WeatherTextDiv">{currentConditions.WeatherText}</div>
                        <div><span className="boldText dataDisplayDiv">UV Index:</span> {currentConditions.UVIndex + ' ' + currentConditions.UVIndexText}</div>
                        <div><span className="boldText dataDisplayDiv">Wind:</span> {currentConditions.Wind.Speed.Metric.Value + ' ' + currentConditions.Wind.Speed.Metric.Unit}</div>
                        <div><span className="boldText dataDisplayDiv">Wind Gusts:</span> {currentConditions.WindGust.Speed.Metric.Value + ' ' + currentConditions.Wind.Speed.Metric.Unit}</div>
                        <div><span className="boldText dataDisplayDiv">Humidity:</span> {currentConditions.RelativeHumidity + '%'}</div>
                        <div><span className="boldText dataDisplayDiv">Dew Point:</span> {currentConditions.DewPoint.Metric.Value} <span>{'\u00b0'}</span> {currentConditions.DewPoint.Metric.Unit}</div>
                        <div><span className="boldText dataDisplayDiv">Cloud Cover:</span> {currentConditions.Ceiling.Metric.UnitType + '%'}</div>
                        <div><span className="boldText dataDisplayDiv">Cloud Visibility:</span> {currentConditions.Ceiling.Metric.Value + currentConditions.Ceiling.Metric.Unit}</div>
                        <div><span className="boldText dataDisplayDiv">Cloud Ceiling:</span> {currentConditions.Visibility.Metric.Value + ' ' + currentConditions.Visibility.Metric.Unit}</div>
                        <div><span className="boldText dataDisplayDiv">Indoor Humidity:</span> {currentConditions.IndoorRelativeHumidity + '%'}</div>
                    </div>
                </Row>
            </Col>
        </Container>
    );

}

export default CurrentWeather;

function handleFavoriteStatus(city) {
    city.favorite = !city.favorite;
    localStorage.setItem(city.LocalizedName, JSON.stringify(city));
    window.location.reload();
}