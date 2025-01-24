const axios = require('axios');
const config = require('../config/config');

const parseDofusDBUrl = async (url) => {
  try {
    // Extraire l'ID de la liste depuis l'URL
    const listId = url.match(/list=(\d+)/)?.[1];
    if (!listId) {
      throw new Error("URL invalide");
    }

    const response = await axios.get(`https://api.dofusdb.fr/jobs/lists/${listId}`);
    
    // Transformer les données reçues
    const items = response.data.items.map(item => ({
      id: item.id,
      name: item.name.fr,
      img: item.img,
      quantity: item.quantity,
      monsters: item.dropMonsters?.map(monster => ({
        id: monster.id,
        name: monster.name.fr,
        img: monster.img
      })) || [],
      achievements: item.achievements?.map(achievement => ({
        id: achievement.id,
        name: achievement.name.fr,
        img: achievement.img
      })) || [],
      quests: item.quests?.map(quest => ({
        id: quest.id,
        name: quest.name.fr
      })) || []
    }));

    return items;
  } catch (error) {
    console.error('Erreur lors de la récupération des données DofusDB:', error);
    throw error;
  }
};

module.exports = {
  parseDofusDBUrl
};
