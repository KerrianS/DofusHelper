import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ArchiPage from "./pages/Home/ArchiPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/archi" element={<ArchiPage />} />
          <Route path="/" element={<HomePage />} />
          {/* Ajoutez d'autres routes ici selon vos besoins */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 