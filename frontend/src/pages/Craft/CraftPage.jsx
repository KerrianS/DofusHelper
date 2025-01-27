import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import tutorialImage from '../../assets/img/tuto.png';
import '../../assets/css/CraftPage.css';

const steps = [
  'Allez sur DofusDB.fr',
  'Choisissez votre métier et créez votre liste',
  'Copiez le lien de partage',
  'Collez le lien ici'
];

const CraftPage = () => {
  const [link, setLink] = useState('');
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Section Tutoriel */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <HelpOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Comment ça marche ?</Typography>
          </Box>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {/* Image de tutoriel */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2,
            p: 2,
            bgcolor: 'rgba(0, 0, 0, 0.03)',
            borderRadius: 1
          }}>
            <img 
              src={tutorialImage} 
              alt="Tutoriel DofusDB" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Section Input */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={link}
            onChange={handleInputChange}
            placeholder="Collez le lien de partage DofusDB ici"
            sx={{ flex: 1 }}
          />
          <Button 
            variant="contained" 
            onClick={fetchData}
            sx={{ 
              bgcolor: '#1E1E1E',
              '&:hover': { bgcolor: '#333' }
            }}
          >
            Générer la liste
          </Button>
        </Box>
      </Paper>

      {/* Table des résultats */}
      {items.length > 0 && (
        <TableContainer component={Paper} className="craft-table" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Image</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Nom</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Quantité</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Monstres</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Succès</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight="bold">Quêtes</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <img src={item.img} alt={item.name} />
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {item.monsters.map((monster, idx) => (
                        <div key={idx} className="craft-tooltip">
                          <img src={monster.img} alt={monster.name} />
                          <span className="tooltiptext">{monster.name}</span>
                        </div>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {item.achievements.map((achievement, idx) => (
                        <div key={idx} className="craft-tooltip">
                          <img src={achievement.img} alt={achievement.name} />
                          <span className="tooltiptext">{achievement.name}</span>
                        </div>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {item.quests.map((quest, idx) => (
                      <div key={idx}>{quest.name}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CraftPage;