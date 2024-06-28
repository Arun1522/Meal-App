import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Category from './components/Category';
import Favorites from './components/Favorites';
import RandomMeal from './components/RandomMeal';
import AboutMe from './components/AboutMe';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/random-meal" element={<RandomMeal />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </Router>
  );
};

export default App;
