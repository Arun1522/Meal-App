import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Menu.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="loader-container">
          <Spinner animation="border" role="status" className="loader">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {categories.map((category, index) => (
            <Col
              key={category.idCategory}
              sm={12}
              md={6}
              lg={4}
              className="mb-3"
            >
              <Card className="menu-card">
                <Card.Img variant="top" src={category.strCategoryThumb} />
                <Card.Body>
                  <Card.Title>
                    {category.strCategory}
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/category/${category.strCategory}`}
                      className="category-number"
                    >
                      <span>Category {index + 1}</span>
                    </Button>
                  </Card.Title>
                  <Card.Text className="card-text">
                    {category.strCategoryDescription.length > 200 ? (
                      <>
                        {`${category.strCategoryDescription.substring(
                          0,
                          200
                        )}... `}
                        <Link to={`/category/${category.strCategory}`}>
                          Read More
                        </Link>
                      </>
                    ) : (
                      category.strCategoryDescription
                    )}
                  </Card.Text>
                  <Card.Link as={Link} to={`/category/${category.strCategory}`}>
                    View Details
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Menu;
