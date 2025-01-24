const express = require('express');
const axios = require("axios");
const cors = require('cors');
require('dotenv').config();

const app = express();



app.use(cors());
app.use(express.json());

app.get("/api/monstres", async (req, res) => {
  try {
    const { nom } = req.query;

    let apiUrl = "https://api.metamob.fr/utilisateurs/Yoannrht/monstres";
    if (nom) {
      apiUrl += `?nom=${encodeURIComponent(nom)}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        "HTTP-X-APIKEY": process.env.API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/monstres/update", async (req, res) => {
  const { id, action } = req.body;

  if (!id || !action) {
    return res.status(400).json({ error: "ID et action sont requis" });
  }

  try {
    const apiUrl = "https://api.metamob.fr/utilisateurs/Yoannrht/monstres";

    const requestBody = [
      {
        id: id,
        etat: "recherche",
        quantite: action === "increment" ? "+1" : "-1",
      },
    ];

    const response = await axios.put(
      apiUrl,
      requestBody,
      {
        headers: {
          "HTTP-X-APIKEY": process.env.API_KEY,
          "HTTP-X-USERKEY": process.env.USER_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: "Quantité mise à jour avec succès", data: response.data });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
  }
});



app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API DofusHelper' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});