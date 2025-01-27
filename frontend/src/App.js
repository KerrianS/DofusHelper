import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, styled } from '@mui/material';

import Header from './components/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';

import HomePage from './pages/Home/HomePage';
import ArchiPage from "./pages/Archi/ArchiPage";
import CraftPage from './pages/Craft/CraftPage';

const AppWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MainContent = styled(Box)({
  flex: 1,
});

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archimonstres" element={<ArchiPage />} />  
            <Route path="/craft" element={<CraftPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App; 