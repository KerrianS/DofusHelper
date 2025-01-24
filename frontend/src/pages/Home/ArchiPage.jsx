import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h1>Liste des Monstres</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher un monstre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Rechercher
        </button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {monstres.map((monstre) => (
          <li key={monstre.id} style={{ marginBottom: "20px" }}>
            <h2>{monstre.nom}</h2>
            <img 
              src={monstre.image_url} 
              alt={monstre.nom} 
              style={{ width: "150px", height: "150px", objectFit: "cover" }} 
            />
            <p>
              Quantité: {monstre.quantite}
              <button
                onClick={() => updateQuantity(monstre.id, "decrement")}
                style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
              >
                -
              </button>
              <button
                onClick={() => updateQuantity(monstre.id, "increment")}
                style={{ marginLeft: "5px", padding: "5px 10px", cursor: "pointer" }}
              >
                +
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchiPage;
