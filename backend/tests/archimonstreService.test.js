const archimonstreService = require('../services/archimonstreService');
const axios = require('axios');
jest.mock('axios');

describe('ArchimonstreService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.API_KEY = 'test-api-key';
    process.env.USER_KEY = 'test-user-key';
  });

  describe('getMonstres', () => {
    const mockMonstres = [
      {
        id: 1,
        nom: 'Archimonstre Test',
        image_url: 'test.jpg',
        quantite: 0
      }
    ];

    test('récupère tous les monstres sans paramètre de recherche', async () => {
      axios.get.mockResolvedValue({ data: mockMonstres });

      const result = await archimonstreService.getMonstres();
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.metamob.fr/utilisateurs/Yoannrht/monstres',
        expect.objectContaining({
          headers: {
            'HTTP-X-APIKEY': 'test-api-key',
            'HTTP-X-USERKEY': 'test-user-key',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockMonstres);
    });

    test('récupère les monstres avec un paramètre de recherche', async () => {
      axios.get.mockResolvedValue({ data: mockMonstres });
      
      await archimonstreService.getMonstres('Test');
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.metamob.fr/utilisateurs/Yoannrht/monstres?nom=%Test%',
        expect.any(Object)
      );
    });

    test('gère les erreurs de l\'API', async () => {
      const errorMessage = 'Erreur API';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(archimonstreService.getMonstres())
        .rejects
        .toThrow(errorMessage);
    });

    test('gère une réponse sans données', async () => {
      axios.get.mockResolvedValue({ });

      await expect(archimonstreService.getMonstres())
        .rejects
        .toThrow("Aucune donnée reçue de l'API");
    });
  });

  describe('updateMonstre', () => {
    test('met à jour la quantité avec succès (incrément)', async () => {
      const mockResponse = { data: { success: true } };
      axios.put.mockResolvedValue(mockResponse);

      const result = await archimonstreService.updateMonstre(1, 'increment');

      expect(axios.put).toHaveBeenCalledWith(
        'https://api.metamob.fr/utilisateurs/Yoannrht/monstres',
        [{
          id: 1,
          etat: 'recherche',
          quantite: '+1'
        }],
        expect.objectContaining({
          headers: {
            'HTTP-X-APIKEY': 'test-api-key',
            'HTTP-X-USERKEY': 'test-user-key',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result.message).toBe('Quantité mise à jour avec succès');
    });

    test('met à jour la quantité avec succès (décrément)', async () => {
      const mockResponse = { data: { success: true } };
      axios.put.mockResolvedValue(mockResponse);

      await archimonstreService.updateMonstre(1, 'decrement');

      expect(axios.put).toHaveBeenCalledWith(
        'https://api.metamob.fr/utilisateurs/Yoannrht/monstres',
        [{
          id: 1,
          etat: 'recherche',
          quantite: '-1'
        }],
        expect.any(Object)
      );
    });

    test('gère les erreurs lors de la mise à jour', async () => {
      const errorMessage = 'Erreur de mise à jour';
      axios.put.mockRejectedValue(new Error(errorMessage));

      await expect(archimonstreService.updateMonstre(1, 'increment'))
        .rejects
        .toThrow(errorMessage);
    });
  });
});
