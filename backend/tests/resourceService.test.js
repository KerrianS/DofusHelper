const resourceService = require('../services/resourceService');
const axios = require('axios');
jest.mock('axios');

describe('ResourceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('récupère la liste des ressources avec succès', async () => {
    const mockResources = {
      data: {
        data: [{
          id: 1,
          name: { fr: 'Ressource Test' },
          description: { fr: 'Description Test' },
          level: 50,
          type: { name: { fr: 'Material' } },
          img: 'test.jpg',
          recipeIds: [],
          dropMonsterIds: [],
          resourcesBySubarea: []
        }],
        total: 1
      }
    };
    
    axios.get.mockResolvedValue(mockResources);

    const result = await resourceService.getResources();
    
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.dofusdb.fr/items',
      expect.any(Object)
    );
    expect(result).toEqual({
      total: 1,
      data: [{
        id: 1,
        name: 'Ressource Test',
        description: 'Description Test',
        level: 50,
        type: 'Material',
        img: 'test.jpg',
        recipeIds: [],
        dropMonsterIds: [],
        resourcesBySubarea: []
      }]
    });
  });
});