import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CraftList from './pages/Home/CraftList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/craft" element={<CraftList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 