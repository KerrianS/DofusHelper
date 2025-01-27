const craftService = require('../services/craftService');

const getCraftList = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: "URL requise" });
    }

    const items = await craftService.parseDofusDBUrl(url);
    res.json(items);
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste de craft:", error);
    res.status(500).json({ 
      error: "Erreur lors de la récupération de la liste", 
      details: error.message 
    });
  }
};

module.exports = {
  getCraftList
};
