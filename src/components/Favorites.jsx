import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const Favorites = () => {
  const favoriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
  const [showModal, setShowModal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  const removeFromFavorites = (mealId) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = existingFavorites.filter(
      (meal) => meal.idMeal !== mealId
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Find the removed meal to display in the modal
    const removedMeal = existingFavorites.find(
      (meal) => meal.idMeal === mealId
    );
    setCurrentMeal(removedMeal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      {favoriteMeals.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>You have not favorited any items yet.</h3>
        </div>
      ) : (
        <Row>
          {favoriteMeals.map((meal) => (
            <Col key={meal.idMeal} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={meal.strMealThumb} />
                <Card.Body>
                  <Card.Title>{meal.strMeal}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => removeFromFavorites(meal.idMeal)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for Confirmation */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Favorite Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMeal && (
            <p style={{ color: "red" }}>
              {`${currentMeal.strMeal} has been removed from your favorites.`}
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

export default Favorites;
