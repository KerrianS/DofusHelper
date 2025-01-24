import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Header from './components/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';
import { Box, styled } from '@mui/material';
import ArchiPage from "./pages/Home/ArchiPage";

const AppWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MainContent = styled(Box)({
  flex: 1,
});
import ArchiPage from "./pages/Home/ArchiPage";

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