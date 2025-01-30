import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import DogSearch from '../components/DogSearch/DogSearch';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dogs" element={<DogSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;