import React from "react";
import FavoritesComponent from "../components/FavoriteComponent";

import "../pages/css/FavoritePage.css";
import { Container, Row, Col } from "react-bootstrap";

function FavoritesPage() {
  return (
    <Container fluid>
      <Row>{getAllFavorites()}</Row>
    </Container>
  );
}

export default FavoritesPage;

function getAllFavorites() {
  let favoritesList = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;
  let num = 0;

  while (i--) {
    let storageItem = localStorage.getItem(keys[i]);
    if (IsJsonString(storageItem)) {
      let storageJson = JSON.parse(storageItem);

      if (storageJson.favorite) {
        num++;
        let favoriteCity = (
          <FavoritesComponent id={num} storedCity={storageJson} />
        );
        favoritesList.push(favoriteCity);
      }
    }
  }

  if (favoritesList.length > 0) {
    return favoritesList;
  } else {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div className="mt-5">You did not save any favorites... yet...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  function IsJsonString(str) {
    if (!str) return false;
    try {
      let json = JSON.parse(str);
      if (Object.keys(json).length === 0) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }
}
