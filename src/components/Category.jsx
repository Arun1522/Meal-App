import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import axios from "axios";

const Category = () => {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => {
        const fetchedMeals = response.data.meals || [];
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Mark meals that are already in favorites
        fetchedMeals.forEach((meal) => {
          meal.addedToFavorites = favorites.some(
            (fav) => fav.idMeal === meal.idMeal
          );
        });

        setMeals(fetchedMeals);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const addToFavorites = (meal) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existingFavorites.some((fav) => fav.idMeal === meal.idMeal)) {
      existingFavorites.push(meal);
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
      setCurrentMeal(meal);
      setIsInFavorites(true);
      setShowModal(true);

      // Update state locally to reflect the change
      setMeals((prevMeals) => {
        return prevMeals.map((prevMeal) => {
          if (prevMeal.idMeal === meal.idMeal) {
            return { ...prevMeal, addedToFavorites: true };
          }
          return prevMeal;
        });
      });
    }
  };

  const removeFromFavorites = (meal) => {
    let existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    existingFavorites = existingFavorites.filter(
      (fav) => fav.idMeal !== meal.idMeal
    );
    localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    setCurrentMeal(meal);
    setIsInFavorites(false);
    setShowModal(true);

    // Update state locally to reflect the change
    setMeals((prevMeals) => {
      return prevMeals.map((prevMeal) => {
        if (prevMeal.idMeal === meal.idMeal) {
          return { ...prevMeal, addedToFavorites: false };
        }
        return prevMeal;
      });
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const gotoFavorites = () => {
    navigate("/favorites"); 
  };

  return (
    <Container>
      <Row>
        {meals.map((meal) => (
          <Col key={meal.idMeal} sm={12} md={6} lg={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src={meal.strMealThumb} />
              <Card.Body>
                <Card.Title>{meal.strMeal}</Card.Title>
                {meal.addedToFavorites ? (
                  <Button
                    variant="danger"
                    onClick={() => removeFromFavorites(meal)}
                  >
                    Remove from Favorites
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => addToFavorites(meal)}
                  >
                    Add to Favorites
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal*/}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Favorite Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMeal && (
            <p style={{ color: isInFavorites ? "green" : "red" }}>{`${
              currentMeal.strMeal
            } has been ${
              isInFavorites ? "added to" : "removed from"
            } your favorites.`}</p>
          )}
          <Button variant="info" onClick={gotoFavorites}>
            Go To Favorites
          </Button>
          <Button
            variant="danger"
            onClick={closeModal}
            style={{ float: "right" }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Category;
