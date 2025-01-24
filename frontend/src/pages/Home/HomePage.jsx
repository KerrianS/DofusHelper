import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CardComponent from '../../components/Card/CardComponent';
import '../../assets/css/HomePage.css';
import marteau from '../../assets/img/craft.png';
import kama from '../../assets/img/kama.png';
import archimonstre from '../../assets/img/archimonstre.png';
import dofusLogo from '../../assets/img/dofusLogo.png';

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

const FeatureTitle = styled('h3')({
  fontSize: '1.5rem',
  marginBottom: '0.35em',
  fontWeight: 500,
});

const FeatureDescription = styled('p')({
  fontSize: '1rem',
  color: 'rgba(0, 0, 0, 0.6)',
});

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
    title: "Guide des Ressources",
    description: "Découvrez comment obtenir chaque ressource",
    icon: <img src={kama} alt="Kama" style={{ width: '40px', height: '40px' }} />,
    gameSlug: "resources"
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
      <Box className="hero-section">
        <Container maxWidth="lg">
          <LogoImage src={dofusLogo} alt="Dofus Logo" />
          <SubTitle>Votre assistant pour optimiser votre expérience sur Dofus</SubTitle>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CardComponent
                title={feature.title}
                img={feature.icon}
                gameSlug={feature.gameSlug}
                className="feature-card"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
