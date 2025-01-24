const express = require('express');
const cors = require('cors');
const monstreRoutes = require('./routes/archimonstreRoutes');
const craftRoutes = require('./routes/craftRoutes');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/monstres', monstreRoutes);
app.use('/api/craft', craftRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API DofusHelper' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});