import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import HomePage from '../pages/Home/HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  test('affiche le titre principal', () => {
    expect(screen.getByText(/Votre assistant pour optimiser votre expérience sur Dofus/i)).toBeInTheDocument();
  });

  test('affiche les cartes de fonctionnalités', () => {
    expect(screen.getByText('Liste de Craft')).toBeInTheDocument();
    expect(screen.getByText('Suivi d\'Archimonstres')).toBeInTheDocument();
  });

  test('contient les boutons de navigation corrects', () => {
    const craftButton = screen.getByRole('button', { name: /Liste de Craft/i });
    const archiButton = screen.getByRole('button', { name: /Suivi d'Archimonstres/i });
    
    expect(craftButton).toBeInTheDocument();
    expect(archiButton).toBeInTheDocument();
  });
});
