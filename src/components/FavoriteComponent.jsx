import React from "react";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import "../pages/FavoritesPage";
const faEraserIcon = <FontAwesomeIcon className="ml-2" icon={faEraser} />;

function FavoritesComponent(props) {
  const city = props.storedCity;
  const currentConditions = city.currentConditions;
  const weatherIconNum =
    currentConditions.WeatherIcon < 10
      ? "0" + currentConditions.WeatherIcon
      : city.WeatherIcon;
  return (
    <Container>
      <Row className="col-12 mt-5 displayFavoriteCity">
        <div
          className="col-2 eraserIcon mr-4"
          onClick={() => removeFavorite(city)}
        >
          {faEraserIcon}
        </div>
        <div
          onClick={() => redirectToCityWeather(city)}
          className="favoriteItem"
        >
          {props.id}. {city.LocalizedName}
        </div>
        <div className="col-2">
          <img
            src={`https://developer.accuweather.com/sites/default/files/${weatherIconNum}-s.png`}
            alt="weatherIcon"
          />
        </div>
        <div className="col-4 bold">{currentConditions.WeatherText}</div>
        <Row className="col-12">
          <div className="col-4">
            {" "}
            Temperature:{" "}
            <sapn className="bold">
              {currentConditions.Temperature.Metric.Value}
            </sapn>{" "}
            <span>{"\u00b0"}</span> {currentConditions.Temperature.Metric.Unit}
          </div>
          <div className="col-4">
            Cloud Cover:{" "}
            <sapn className="bold">
              {currentConditions.Ceiling.Metric.UnitType + "%"}
            </sapn>
          </div>
          <div className="col-4">
            Indoor Humidity:{" "}
            <sapn className="bold">
              {currentConditions.IndoorRelativeHumidity + "%"}
            </sapn>
          </div>
        </Row>
      </Row>
    </Container>
  );
}

function removeFavorite(city) {
  let cityStorage = JSON.parse(localStorage.getItem(city.LocalizedName));
  cityStorage.favorite = false;
  localStorage.setItem(cityStorage.LocalizedName, JSON.stringify(cityStorage));
  window.location.reload(false);
}

export default FavoritesComponent;

function redirectToCityWeather(city) {
  localStorage.setItem("redirected", JSON.stringify(city));
  window.location.href = "weather";
}
