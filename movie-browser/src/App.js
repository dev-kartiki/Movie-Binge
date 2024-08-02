import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import Favorites from './components/Favorites';
import './App.css';
import RegularList from './components/reusableComponents/Lists/RegularList';

function App() {
  return (
    <div>
      Movie Browser
    </div>
  );
}

export default App;
