import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Header from './components/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';
import CraftList from './pages/Home/CraftList';
import { Box, styled } from '@mui/material';

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
            <Route path="/craft" element={<CraftList />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App; 