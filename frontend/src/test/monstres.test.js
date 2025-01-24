// test/monstres.test.js
const request = require('supertest');
const app = require('../App.js');


const { expect } = require('chai');

describe('GET /api/monstres', function() {
  it('devrait retourner une liste de monstres avec les bons champs', async function() {
    const res = await request(app)
      .get('/api/monstres')  // Si tu veux tester avec un paramètre de recherche, tu peux faire .get('/api/monstres?nom=arakne')
      .expect(200);  // Attente du code de réponse 200 (succès)

    // Vérifier que la réponse est un tableau
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);  // Vérifier qu'il y a des éléments dans la réponse

    // Vérifier les champs du premier monstre de la réponse
    const monstre = res.body[0];
    expect(monstre).to.have.property('id').that.is.a('string');
    expect(monstre).to.have.property('nom').that.is.a('string');
    expect(monstre).to.have.property('slug').that.is.a('string');
    expect(monstre).to.have.property('type').that.is.a('string');
    expect(monstre).to.have.property('image_url').that.is.a('string');
    expect(monstre).to.have.property('etape').that.is.a('string');
    expect(monstre).to.have.property('zone').that.is.a('string');
    expect(monstre).to.have.property('souszone').that.is.a('string');
    expect(monstre).to.have.property('quantite').that.is.a('string');
    expect(monstre).to.have.property('recherche').that.is.a('string');
    expect(monstre).to.have.property('propose').that.is.a('string');
  });

  it('devrait filtrer les monstres par nom si le paramètre "nom" est fourni', async function() {
    const nom = 'Arakne';
    const res = await request(app)
      .get(`/api/monstres?nom=${nom}`)
      .expect(200);

    // Vérifier que la réponse contient bien des monstres avec le nom spécifié
    expect(res.body).to.be.an('array');
    res.body.forEach(monstre => {
      expect(monstre.nom).to.include(nom); // Vérifier que le nom du monstre inclut la chaîne 'Arakne'
    });
  });
});
