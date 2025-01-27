import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardComponent from '../../components/Card/CardComponent';
import '../../assets/css/HomePage.css';
import marteau from '../../assets/img/craft.png';
import archimonstre from '../../assets/img/archimonstre.png';
import dofusLogo from '../../assets/img/dofusLogo.png';
import animatedDofus from '../../assets/videos/animatedDofus.mp4';

const SubTitle = styled('h2')(({ theme }) => ({
  fontSize: '1.5rem',
  opacity: 0.9,
  maxWidth: '600px',
  margin: '0 auto',
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const LogoImage = styled('img')({
  width: '200px',
  height: 'auto',
  marginBottom: '20px',
});

const features = [
  {
    title: "Liste de Craft",
    description: "Importez votre liste de craft depuis DofusDB",
    icon: <img src={marteau} alt="Marteau" style={{ width: '40px', height: '40px' }} />,
    gameSlug: "craft"
  },
  {
    title: "Suivi d'Archimonstres",
    description: "Gardez une trace de votre progression",
    icon: <img src={archimonstre} alt="Archimonstre" style={{ width: '40px', height: '40px' }} />,
    gameSlug: "archimonstres"
  }
];

function HomePage() {
  return (
    <div className="home-page">
      <Box className="hero-section" sx={{ mb: 0 }}>
        <Container maxWidth="lg">
          <LogoImage src={dofusLogo} alt="Dofus Logo" />
          <SubTitle>Votre assistant pour optimiser votre expérience sur Dofus</SubTitle>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 0, pb: 8 }}>
        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          sx={{ maxWidth: '800px', margin: '0 auto', mb: 8 }}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <CardComponent
                title={feature.title}
                img={feature.icon}
                gameSlug={feature.gameSlug}
                className="feature-card"
              />
            </Grid>
          ))}
        </Grid>

        <Box className="video-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={animatedDofus} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
