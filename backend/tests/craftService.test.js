const craftService = require('../services/craftService');
const axios = require('axios');
jest.mock('axios');

describe('CraftService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseDofusDBUrl', () => {
    const mockDofusDBResponse = {
      data: {
        items: [
          {
            id: 1,
            name: { fr: 'Item Test' },
            img: 'test.jpg',
            quantity: 2,
            dropMonsters: [
              {
                id: 101,
                name: { fr: 'Monster Test' },
                img: 'monster.jpg'
              }
            ],
            achievements: [
              {
                id: 201,
                name: { fr: 'Achievement Test' },
                img: 'achievement.jpg'
              }
            ],
            quests: [
              {
                id: 301,
                name: { fr: 'Quest Test' }
              }
            ]
          }
        ]
      }
    };

    test('parse correctement une URL DofusDB valide', async () => {
      const validUrl = 'https://dofusdb.fr/fr/tools/craftlist?list=123';
      axios.get.mockResolvedValue(mockDofusDBResponse);

      const result = await craftService.parseDofusDBUrl(validUrl);

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.dofusdb.fr/jobs/lists/123'
      );
      expect(result).toEqual([
        {
          id: 1,
          name: 'Item Test',
          img: 'test.jpg',
          quantity: 2,
          monsters: [
            {
              id: 101,
              name: 'Monster Test',
              img: 'monster.jpg'
            }
          ],
          achievements: [
            {
              id: 201,
              name: 'Achievement Test',
              img: 'achievement.jpg'
            }
          ],
          quests: [
            {
              id: 301,
              name: 'Quest Test'
            }
          ]
        }
      ]);
    });

    test('rejette une URL invalide', async () => {
      const invalidUrl = 'https://dofusdb.fr/invalid';
      
      await expect(craftService.parseDofusDBUrl(invalidUrl))
        .rejects
        .toThrow('URL invalide');
    });

    test('gère les erreurs de l\'API DofusDB', async () => {
      const validUrl = 'https://dofusdb.fr/fr/tools/craftlist?list=123';
      const errorMessage = 'API Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(craftService.parseDofusDBUrl(validUrl))
        .rejects
        .toThrow(errorMessage);
    });

    test('gère une réponse sans items', async () => {
      const validUrl = 'https://dofusdb.fr/fr/tools/craftlist?list=123';
      axios.get.mockResolvedValue({ data: { items: [] } });

      const result = await craftService.parseDofusDBUrl(validUrl);
      expect(result).toEqual([]);
    });
  });
});
