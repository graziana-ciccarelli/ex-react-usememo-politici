import React, { useState, useEffect, useMemo } from "react";

// Componente ottimizzato con React.memo
const PoliticianCard = React.memo(({ politician }) => {
  console.log(`Rendering card: ${politician.name}`);
  return (
    <div className="politician-card">
      <img src={politician.image} alt={politician.name} />
      <h2>{politician.name}</h2>
      <h4>Position: {politician.position}</h4>
      <p>{politician.biography}</p>
    </div>
  );
});

const PoliticiansList = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(response => response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error('Errore nel fetch:', error));
  }, []);

  // Filtro ottimizzato con useMemo, dipende da politici o searchTerm
  const filteredPoliticians = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return politicians.filter(p =>
      p.name.toLowerCase().includes(lowerSearch) ||
      p.biography.toLowerCase().includes(lowerSearch)
    );
  }, [politicians, searchTerm]);

  return (
    <div className="politicians-container">
      <h1>Lista politici</h1>
      <input
        type="text"
        placeholder="Cerca per nome o biografia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredPoliticians.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
};

export default PoliticiansList;
