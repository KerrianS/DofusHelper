import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import '../../assets/css/HomePage.css';

const features = [
  {
    title: "Liste de Craft",
    description: "Importez votre liste de craft depuis DofusDB et obtenez la liste complète des ressources nécessaires",
    icon: <FormatListBulletedIcon sx={{ fontSize: 40 }} />
  },
  {
    title: "Guide des Ressources",
    description: "Découvrez comment obtenir chaque ressource avec des informations détaillées sur leur localisation",
    icon: <SearchIcon sx={{ fontSize: 40 }} />
  },
  {
    title: "Suivi d'Archimonstres",
    description: "Gardez une trace de votre progression dans la capture des archimonstres",
    icon: <CatchingPokemonIcon sx={{ fontSize: 40 }} />
  }
];

function HomePage() {
  return (
    <div className="home-page">
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="main-title">
            DofusHelper
          </Typography>
          <Typography variant="h5" className="subtitle">
            Votre assistant pour optimiser votre expérience sur Dofus
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="feature-card">
                <CardContent>
                  <Box className="icon-container">
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
