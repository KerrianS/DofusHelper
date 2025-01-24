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
      if (response.data) {
        // S'assurer que la quantité est un nombre
        const formattedMonstres = response.data.map(monstre => ({
          ...monstre,
          quantite: parseInt(monstre.quantite, 10) || 0
        }));
        setMonstres(formattedMonstres);
        setError(null);
      }
    } catch (err) {
      console.error("Erreur détaillée:", err);
      setError(err.response?.data?.error || "Erreur de connexion au serveur");
      setMonstres([]);
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
      // Vérifier si l'action est un décrément et si la quantité actuelle est déjà à 0
      const currentMonstre = monstres.find(m => m.id === id);
      if (action === "decrement" && parseInt(currentMonstre.quantite) <= 0) {
        return; // Ne rien faire si on essaie de décrémenter en dessous de 0
      }

      // Mise à jour optimiste immédiate
      setMonstres(prevMonstres => 
        prevMonstres.map(monstre => 
          monstre.id === id 
            ? { 
                ...monstre, 
                quantite: action === "increment" 
                  ? parseInt(monstre.quantite) + 1 
                  : parseInt(monstre.quantite) - 1 
              }
            : monstre
        )
      );

      // Appel API en arrière-plan
      await axios.post("http://localhost:5000/api/monstres/update", {
        id,
        action,
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la quantité", err);
      fetchMonstres();
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un monstre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

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
