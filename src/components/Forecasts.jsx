import React from "react";
import { Row, Container } from "react-bootstrap";

import DailyForecast from "../components/DailyForecast";

function Forecasts(props) {
  const city = props.city;
  const forecastsData = city.forecastsData;
  return (
    <Container fluid>{creatForecastsComponentsList(forecastsData)}</Container>
  );
}

export default Forecasts;

function creatForecastsComponentsList(forecastsData) {
  var dailyForecastsComponents = [];
  for (var i = 0; i < forecastsData.DailyForecasts.length; i++) {
    dailyForecastsComponents.push(
      <Row key={"forecastsData_col_" + i}>
        <DailyForecast
          className="col-10"
          key={"forecastsData_" + i}
          forecastsData={forecastsData.DailyForecasts[i]}
        ></DailyForecast>
      </Row>
    );
  }
  return dailyForecastsComponents;
}
