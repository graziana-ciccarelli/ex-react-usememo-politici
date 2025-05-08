import { useState, useEffect } from "react";

const PoliticiansList = () => {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(response => response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error('Errore nel fetch:', error));
  }, []);

  return (
    <div>
      <h1>Lista politici</h1>
      <div>
        {politicians.map(politician => (
          <div key={politician.id}>
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <h4>{politician.position}</h4>
            <p>{politician.biography}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticiansList;
