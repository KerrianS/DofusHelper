const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import des routes
const resourcesRouter = require('./routes/resourcesAPI');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API DofusHelper' });
});

// Utilisation des routes
app.use('/api/resources', resourcesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});