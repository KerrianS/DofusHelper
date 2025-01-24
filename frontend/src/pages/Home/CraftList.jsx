import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/HomePage.css';

const CraftList = () => {
  const [link, setLink] = useState('');
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(link.split('?')[1]);
      const list = params.get('list');
      const rows = list.split(',').map(item => item.split(':'));

      setData(rows);

      const itemData = {};

      for (const row of rows) {
        const recipeResponse = await axios.get(`https://api.dofusdb.fr/recipes/${row[0]}?lang=fr`);
        const qty = parseInt(row[1], 10);

        for (let i = 0; i < recipeResponse.data.ingredientIds.length; i++) {
          const ingredientId = recipeResponse.data.ingredientIds[i];
          const quantity = recipeResponse.data.quantities[i] * qty;

          if (!itemData[ingredientId]) {
            const ingredientResponse = await axios.get(`https://api.dofusdb.fr/items/${ingredientId}?lang=fr`);
            const dropMonsterIds = ingredientResponse.data.dropMonsterIds || [];
            const achievementsThatReward = ingredientResponse.data.achievementsThatReward || [];
            const questsThatReward = ingredientResponse.data.questsThatReward || [];

            const monstersResponse = await axios.get(`https://api.dofusdb.fr/monsters?$limit=50&$skip=0&id[$in][]=${dropMonsterIds.join('&id[$in][]=')}&lang=fr`);
            const achievementsResponse = await axios.get(`https://api.dofusdb.fr/achievements?id[]=${achievementsThatReward.join('&id[]=')}&lang=fr`);
            const questsResponse = await axios.get(`https://api.dofusdb.fr/quests?id[]=${questsThatReward.join('&id[]=')}&lang=fr`);

            itemData[ingredientId] = {
              id: ingredientId,
              name: ingredientResponse.data.name.fr,
              img: ingredientResponse.data.img,
              quantity: 0,
              monsters: monstersResponse.data.data
                .filter(monster => !monster.isMiniBoss)
                .map(monster => ({
                  name: monster.name.fr,
                  img: monster.img,
                })),
              achievements: achievementsResponse.data.data.map(achievement => ({
                name: achievement.name.fr,
                img: achievement.img
              })),
              quests: questsResponse.data.data.map(quest => ({
                name: quest.name.fr
              }))
            };
          }

          itemData[ingredientId].quantity += quantity;
        }
      }

      const sortedItems = Object.values(itemData).sort((a, b) => b.quantity - a.quantity);
      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={link}
        onChange={handleInputChange}
        placeholder="Enter link"
      />
      <button onClick={fetchData}>Generate Table</button>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Monsters</th>
            <th>Achievements</th>
            <th>Quests</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><img src={item.img} alt={item.name} width="50" /></td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                {item.monsters.map((monster, idx) => (
                  <div key={idx} className="tooltip">
                    <img src={monster.img} alt={monster.name} width="30" />
                    <span className="tooltiptext">{monster.name}</span>
                  </div>
                ))}
              </td>
              <td>
                {item.achievements.map((achievement, idx) => (
                  <div key={idx} className="tooltip">
                    <img src={achievement.img} alt={achievement.name} width="30" />
                    <span className="tooltiptext">{achievement.name}</span>
                  </div>
                ))}
              </td>
              <td>
                {item.quests.map((quest, idx) => (
                  <div key={idx}>
                    {quest.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CraftList;