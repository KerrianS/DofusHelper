require('dotenv').config();

module.exports = {
  apiKey: process.env.API_KEY,
  userKey: process.env.USER_KEY,
  port: process.env.PORT || 5000,
  metamobBaseUrl: 'https://api.metamob.fr',
  dofusdbBaseUrl: 'https://api.dofusdb.fr'
};
