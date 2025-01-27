import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ArchiPage from '../pages/Archi/ArchiPage';

jest.mock('axios');

describe('ArchiPage', () => {
  const mockMonstres = [
    {
      id: 1,
      nom: 'Archimonstre Test',
      image_url: 'test.jpg',
      quantite: 0
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockMonstres });
    axios.post.mockResolvedValue({ data: { success: true } });
  });

  test('affiche la barre de recherche', async () => {
    render(<ArchiPage />);
    expect(screen.getByPlaceholderText(/Rechercher un monstre/i)).toBeInTheDocument();
  });

  test('effectue une recherche', async () => {
    render(<ArchiPage />);
    const searchInput = screen.getByPlaceholderText(/Rechercher un monstre/i);
    
    await act(async () => {
      await userEvent.type(searchInput, 'Test');
      fireEvent.click(screen.getByRole('button', { name: /rechercher/i }));
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('nom=Test')
    );
  });

  test('affiche les monstres après le chargement', async () => {
    render(<ArchiPage />);
    const monstreElement = await screen.findByText('Archimonstre Test');
    expect(monstreElement).toBeInTheDocument();
  });

  test('gère l\'incrémentation de la quantité', async () => {
    render(<ArchiPage />);
    await screen.findByText('Archimonstre Test');
    
    const incrementButton = screen.getByText('+');
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/monstres/update',
      expect.objectContaining({
        id: 1,
        action: 'increment'
      })
    );
  });

  test('gère les erreurs de chargement', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur de chargement'));
    
    render(<ArchiPage />);
    
    const errorMessage = await screen.findByText(/erreur de connexion au serveur/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
