import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function DailyForecast(props) {
    const forecastsData = props.forecastsData;
    const weatherIconNum = forecastsData.Day.Icon < 10 ? '0' + forecastsData.Day.Icon : forecastsData.Day.Icon;
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="forecastBox">
                        <div className="bold">{formatDate(forecastsData.Date)}</div>
                        <div className="weatherIconDiv"><img src={`https://developer.accuweather.com/sites/default/files/${weatherIconNum}-s.png`} alt="" /></div>
                        <div className="bold">{forecastsData.Day.IconPhrase}</div>
                        <div>Min Temperature: {forecastsData.Temperature.Minimum.Value} <span>{'\u00b0'}</span> {forecastsData.Temperature.Minimum.Unit}</div>
                        <div>Mxn Temperature: {forecastsData.Temperature.Maximum.Value} <span>{'\u00b0'}</span> {forecastsData.Temperature.Maximum.Unit}</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default DailyForecast;