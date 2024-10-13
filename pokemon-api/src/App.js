import React, { useEffect, useState } from "react";
import "./App.css"; // Import CSS file

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
      });
  };

  useEffect(() => {
    getRandomPokemon(); // Load a random Pokémon when the page loads
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Pokémon List</h1>
      <button className="btn" onClick={getRandomPokemon}>
        Get Random Pokémon
      </button>

      {selectedPokemon && (
        <div className="pokemon-card">
          <h2 className="pokemon-name">{selectedPokemon.name.toUpperCase()}</h2>
          <div className="pokemon-image">
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          </div>
          <p className="pokemon-type">
            <strong>Types: </strong>
            {selectedPokemon.types
              .map((typeInfo) => typeInfo.type.name)
              .join(", ")}
          </p>
          <p className="pokemon-stats-title"><strong>Base Stats:</strong></p>
          <div className="pokemon-stats">
            {selectedPokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-bar">
                <span className="stat-name">{stat.stat.name}: </span>
                <div className="stat-value">
                  <div
                    className="stat-fill"
                    style={{ width: `${stat.base_stat}%` }}
                  >
                    {stat.base_stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
