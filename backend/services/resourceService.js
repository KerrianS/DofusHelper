const axios = require('axios');
require('dotenv').config();

const getResources = async () => {
  try {
    const response = await axios.get('https://api.dofusdb.fr/items', {
      params: {
        // Types de ressources :
        // 33: Bois
        // 38: Minerai
        // 39: Plante
        // 41: Poisson
        // 46: Ressource d'alchimiste
        // 47: Ressource de bijoutier
        // 48: Ressource de bricoleur
        // 50: Ressource de cordonnier
        // 51: Ressource de façonneur
        // 52: Ressource de forgeur de bouclier
        // 53: Ressource de sculpteur
        // 54: Ressource de tailleur
        typeId: [33, 38, 39, 41, 46, 47, 48, 50, 51, 52, 53, 54]
      }
    });
    
    const resources = response.data.data.map(item => ({
      id: item.id,
      name: item.name.fr,
      description: item.description.fr,
      level: item.level,
      type: item.type?.name?.fr || 'Inconnu',
      img: item.img,
      recipeIds: item.recipeIds,
      dropMonsterIds: item.dropMonsterIds,
      resourcesBySubarea: item.resourcesBySubarea
    }));

    return {
      total: response.data.total,
      data: resources
    };
  } catch (error) {
    console.error('Error fetching resources from DofusDB:', error);
    throw error;
  }
};

module.exports = {
  getResources
};
