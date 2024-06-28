import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Home Page</h1>
      <div className="mt-5">
        <Link to="/menu" className="btn btn-primary mx-4 px-4">Menu</Link>
        <Link to="/favorites" className="btn btn-primary px-3">Favorites</Link>
      </div>
      <div className="mt-5">
        <Link to="/random-meal" className="btn btn-primary px-3 ml-3">Random Meal</Link>
      </div>
    </div>
  );
};

export default Home;
