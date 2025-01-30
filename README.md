# DofusHelper

## What is it?
DofusHelper is a web application designed to enhance the Dofus gaming experience by providing tools for crafting management and Archmonster tracking.

## Features & Services

### Craft Management
- Import crafting lists from DofusDB
- Calculate required resources automatically
- View resource acquisition methods:
  - Monster drops
  - Achievement rewards
  - Quest rewards

### Archmonster Tracking
- Complete Archmonster list
- Progress tracking system
- Search and filter functionality
- Capture counter per Archmonster

## How to Build

1. Clone the repository:
```bash
git clone [repository-url]
cd dofushelper
```

2. Install dependencies:
```bash
npm run install-all
```

3. Configure environment:
Create a `.env` file in the `backend` directory:
```env
PORT=5000
API_KEY=your_metamob_api_key
USER_KEY=your_metamob_user_key
```

## How to Test

### Frontend Tests
```bash
# Run all frontend tests
npm test

# Get test coverage
cd frontend
npm run test:coverage
```

### Backend Tests
```bash
cd backend
npm test
```

## How to Run Locally

1. Start the application (frontend + backend):
```bash
npm run dev
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Technologies Utilisées

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios
- Jest pour les tests

### Backend
- Node.js
- Express.js
- Axios pour les appels API externes
- Jest pour les tests

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Structure du Projet

```
dofushelper/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       └── tests/
└── backend/
    ├── controllers/
    ├── routes/
    ├── services/
    └── config/
```

## API Endpoints

### Archimonstres
- `GET /api/monstres` - Liste des archimonstres
- `POST /api/monstres/update` - Mise à jour du compteur

### Craft
- `GET /api/craft/parse` - Parse une liste de craft DofusDB

### Resources
- `GET /api/resources` - Liste des ressources disponibles

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## License

ISC

## Contact

Créé et maintenu par [Votre Nom]

## CI/CD Status
![CI](https://github.com/[your-username]/dofushelper/workflows/CI/badge.svg)
![Release](https://github.com/[your-username]/dofushelper/workflows/Release/badge.svg)

## Release Process
1. Create and push your changes to a feature branch
2. Create a Pull Request to main
3. Once tests pass and PR is approved, merge to main
4. To create a release:
   - Go to GitHub Releases
   - Create a new release with semantic versioning (e.g. v1.0.0)
   - The CI will automatically build and push a tagged Docker image