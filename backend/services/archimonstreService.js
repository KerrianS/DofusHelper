const axios = require('axios');
const config = require('../config/config');

const getMonstres = async (nom) => {
  let apiUrl = "https://api.metamob.fr/utilisateurs/Yoannrht/monstres";
  if (nom) {
    apiUrl += `?nom=%${encodeURIComponent(nom)}%`;
  }

  const response = await axios.get(apiUrl, {
    headers: {
      "HTTP-X-APIKEY": process.env.API_KEY,
      "HTTP-X-USERKEY": process.env.USER_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    timeout: 100000,
    httpsAgent: new (require('https').Agent)({  
      rejectUnauthorized: false 
    })
  });

  if (!response.data) {
    throw new Error("Aucune donnée reçue de l'API");
  }

  return response.data;
};

const updateMonstre = async (id, action) => {
  const requestBody = [{
    id: parseInt(id),
    etat: "recherche",
    quantite: action === "increment" ? "+1" : "-1",
  }];

  const response = await axios.put(
    "https://api.metamob.fr/utilisateurs/Yoannrht/monstres",
    requestBody,
    {
      headers: {
        "HTTP-X-APIKEY": process.env.API_KEY,
        "HTTP-X-USERKEY": process.env.USER_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return { message: "Quantité mise à jour avec succès", data: response.data };
};

module.exports = {
  getMonstres,
  updateMonstre
};