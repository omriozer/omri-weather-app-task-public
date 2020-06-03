import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AutoComplete from "../components/AutoComplete.jsx";
import Forecasts from "../components/Forecasts.jsx";
import "../pages/css/WeatherPage.css";
import {
  currentConditionsUrl,
  apiKey,
  readFromServer,
  forecastsUrl,
} from "../server/Helpers.js";
import CurrentWeather from "../components/CurrentWeather.jsx";

function WeatherPage() {
  const defaultCity = {
    LocalizedName: "Tel Aviv",
    Key: "215854",
  };
  const [cityData, setCityData] = useState({});

  const getCurrentConditions = useCallback((selectedCity) => {
    readFromServer(
      currentConditionsUrl +
        selectedCity.Key +
        "?apikey=" +
        apiKey +
        "&details=true",
      "GET"
    ).then((response) => {
      if (response) {
        selectedCity.currentConditions = response[0];
        getForecast(selectedCity);
      } else {
        selectedCity.currentConditions = false;
      }
    });
  }, []);

  const citySelected = useCallback(
    (selectedCity) => {
      let now = new Date().getTime();
      let citySelectedStorage = JSON.parse(
        localStorage.getItem(selectedCity.LocalizedName)
      );
      if (!citySelectedStorage) {
        citySelectedStorage = defaultCity;
        citySelectedStorage.lastUpdate = now;
        citySelectedStorage.favorite = false;
      }
      let citySelectedStorage_lastUpdate = now - citySelectedStorage.lastUpdate;

      if (
        citySelectedStorage.currentConditions &&
        citySelectedStorage.forecastsData &&
        citySelectedStorage_lastUpdate < 1000 * 60 * 2
      ) {
        setCityData(citySelectedStorage);
      } else {
        getCurrentConditions(selectedCity);
      }
    },
    [defaultCity, getCurrentConditions]
  );

  const pageRedirected = useCallback(() => {
    var redirectedCity = JSON.parse(localStorage.getItem("redirected"));
    if (redirectedCity) {
      citySelected(redirectedCity);
      localStorage.removeItem("redirected");
    } else {
      citySelected(defaultCity);
    }
  }, [citySelected, defaultCity]);

  useEffect(() => {
    if (WeatherPage.firstTime === undefined) {
      pageRedirected();
      WeatherPage.firstTime = true;
    }
  }, [pageRedirected]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <AutoComplete
              city={cityData}
              onCitySelected={(selectedCity) => citySelected(selectedCity)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {cityData.currentConditions ? (
              <CurrentWeather
                onCitySelected={(selectedCity) => citySelected(selectedCity)}
                city={cityData}
              ></CurrentWeather>
            ) : (
              ""
            )}
          </Col>
          <Col>
            {cityData.forecastsData ? (
              <Forecasts city={cityData}></Forecasts>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );

  function getForecast(selectedCity) {
    let now = new Date().getTime();
    readFromServer(
      forecastsUrl + selectedCity.Key + "?apikey=" + apiKey + "&details=true",
      "GET"
    ).then((response) => {
      selectedCity.forecastsData = response;
      selectedCity.lastUpdate = now;
      for (var key in selectedCity) {
        if (selectedCity.hasOwnProperty(key)) {
          //selectedCity[key];
        }
      }

      setCityData(selectedCity);
      localStorage.setItem(
        selectedCity.LocalizedName,
        JSON.stringify(selectedCity)
      );
    });
  }
}

export default WeatherPage;
