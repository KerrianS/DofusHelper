import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Ajoutez d'autres routes ici selon vos besoins */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 