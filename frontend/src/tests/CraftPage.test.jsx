import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CraftPage from '../pages/Craft/CraftPage';

describe('CraftPage', () => {
  test('affiche le formulaire initial', () => {
    render(<CraftPage />);
    
    expect(screen.getByPlaceholderText(/Collez le lien de partage DofusDB ici/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Générer la liste/i })).toBeInTheDocument();
  });
});
