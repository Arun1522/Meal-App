import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Spinner } from "react-bootstrap";
import axios from "axios";

const RandomMeal = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  const fetchRandomMeal = () => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        const fetchedMeal = response.data.meals[0];
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        fetchedMeal.addedToFavorites = favorites.some(
          (fav) => fav.idMeal === fetchedMeal.idMeal
        );
        setMeal(fetchedMeal);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const addToFavorites = (meal) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existingFavorites.some((fav) => fav.idMeal === meal.idMeal)) {
      existingFavorites.push(meal);
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
      setCurrentMeal(meal);
      setIsInFavorites(true);
      setShowModal(true);
      setMeal({ ...meal, addedToFavorites: true });
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
    setMeal({ ...meal, addedToFavorites: false });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="text-center">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        meal && (
          <Card className="mb-3" style={{ border: "none" }}>
            <Card.Img
              variant="top"
              src={meal.strMealThumb}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                margin: "auto",
              }}
            />
            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Button variant="primary" onClick={fetchRandomMeal}>
                Generate Another
              </Button>
              {meal.addedToFavorites ? (
                <Button
                  variant="danger"
                  onClick={() => removeFromFavorites(meal)}
                  className="ml-2"
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={() => addToFavorites(meal)}
                  className="ml-2"
                >
                  Add to Favorites
                </Button>
              )}
            </Card.Body>
          </Card>
        )
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Favorite Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMeal && (
            <p style={{ color: isInFavorites ? "green" : "red" }}>
              {`${currentMeal.strMeal} has been ${
                isInFavorites ? "added to" : "removed from"
              } your favorites.`}
            </p>
          )}
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RandomMeal;
