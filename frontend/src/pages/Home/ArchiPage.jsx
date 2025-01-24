import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/css/ArchiPage.css';

const ArchiPage = () => {
  const [monstres, setMonstres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // Fonction pour récupérer les monstres depuis l'API
  const fetchMonstres = async () => {
    setLoading(true);
    try {
      const url = query ? `http://localhost:5000/api/monstres?nom=${query}` : "http://localhost:5000/api/monstres";
      const response = await axios.get(url);
      setMonstres(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonstres();
  }, [query]);

  // Gestion de la recherche
  const handleSearch = () => {
    setQuery(search);
  };

  // Fonction pour mettre à jour la quantité et relancer la requête API
  const updateQuantity = async (id, action) => {
    try {
      await axios.post("http://localhost:5000/api/monstres/update", {
        id,
        action,
      });

      // Rafraîchir la liste après la mise à jour
      fetchMonstres();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la quantité", err);
    }
  };

  return (
    <div>
      {/* Header avec barre de recherche fixe */}
      <header className="search-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un monstre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
      </header>

      {error && <p>Erreur: {error}</p>}

      <div className="monstres-grid">
        {monstres.map((monstre) => (
          <div key={monstre.id} className="monstre-card">
            <img src={monstre.image_url} alt={monstre.nom} />
            <h2>{monstre.nom}</h2>
            <div className="monstre-quantity">
              <button onClick={() => updateQuantity(monstre.id, "decrement")}>-</button>
              <span>{monstre.quantite}</span>
              <button onClick={() => updateQuantity(monstre.id, "increment")}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiPage;
