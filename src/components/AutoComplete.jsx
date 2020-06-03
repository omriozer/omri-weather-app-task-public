import React, { useState } from "react";
import { faSaveIcon, faStarIcon } from "../assets/Icons";

import { autoCompleteUrl, apiKey, readFromServer } from "../server/Helpers.js";

import { Row, Container } from "react-bootstrap";

function AutoComplete(props) {
  let [value, setValue] = useState("");
  const [optionOpen, setOptionOpen] = useState(false);
  const [citys, setCitys] = useState([]);

  return (
    <Container fluid className="inputContainer">
      <Row>
        <input
          className="searchInput"
          placeholder={props.city.LocalizedName}
          value={value}
          autoComplete="off"
          type="text"
          id="fname"
          name="fname"
          onBlur={() =>
            setTimeout(() => {
              setOptionOpen(false);
            }, 300)
          }
          onChange={(event) => inputChanged(event.target.value)}
        />
      </Row>
      <Row>
        <div className={optionOpen ? "searchInput-container" : "close"}>
          <div>{makeCitysList()}</div>
        </div>
      </Row>
    </Container>
  );

  function inputChanged(input) {
    setValue(input);
    input.length > 0 ? setOptionOpen(true) : setOptionOpen(false);
    if (input.length > 2) {
      readFromServer(
        autoCompleteUrl + "?apikey=" + apiKey + "&q=" + input,
        "GET"
      ).then((response) => {
        if (response) {
          setCitys(response);
          makeCitysList();
        }
      });
    }
  }

  function makeCitysList() {
    let cityItemList = [];
    for (let index = 0; index < citys.length; index++) {
      let city = citys[index];
      let cityName = city.LocalizedName;
      let cityStorage = JSON.parse(localStorage.getItem(cityName))
        ? JSON.parse(localStorage.getItem(cityName))
        : city;
      let cityItem = (
        <div key={"ListCitysItem_" + index} className="ListCitysItem">
          <div
            onClick={() => handleFavoriteStatus(city)}
            key={`${cityName}_star`}
            className="favoriteIconDiv"
          >
            <span
              className="pointer"
              onClick={() => handleFavoriteStatus(city)}
            >
              <br /> {cityStorage.favorite ? faStarIcon : faSaveIcon}
            </span>
          </div>
          <div className="cityNameDiv">
            <input
              key={`${cityName}_opt`}
              type="button"
              value={city.LocalizedName}
              className="cityNameInput"
              onClick={() => handleCityChoose(city)}
            />
          </div>
        </div>
      );

      cityItemList.push(cityItem);
    }
    return cityItemList;
  }

  function handleFavoriteStatus(city) {
    city.favorite = !city.favorite;
    localStorage.setItem(city.LocalizedName, JSON.stringify(city));
    handleCityChoose(city);
  }

  function handleCityChoose(city) {
    setValue(city.LocalizedName);
    setOptionOpen(false);
    props.onCitySelected(city);
  }
}

export default AutoComplete;
