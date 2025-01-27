const monstreService = require('../services/archimonstreService');

const getMonstres = async (req, res) => {
  try {
    const { nom } = req.query;
    const monstres = await monstreService.getMonstres(nom);
    res.json(monstres);
  } catch (error) {
    console.error("Erreur API détaillée:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    res.status(500).json({ 
      error: "Erreur lors de la récupération des données", 
      details: error.message,
      apiResponse: error.response?.data
    });
  }
};

const updateMonstre = async (req, res) => {
  const { id, action } = req.body;

  if (!id || !action) {
    return res.status(400).json({ error: "ID et action sont requis" });
  }

  try {
    const result = await monstreService.updateMonstre(id, action);
    res.json(result);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).json({ 
      error: "Erreur lors de la mise à jour", 
      details: error.response?.data || error.message 
    });
  }
};

module.exports = {
  getMonstres,
  updateMonstre
};