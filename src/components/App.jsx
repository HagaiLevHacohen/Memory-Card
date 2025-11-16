import { useState,  useEffect} from "react";
import "../styles/App.css";

import Menu from "./Menu.jsx";
import Game from "./Game.jsx";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [gameMode, setGameMode] = useState("easy"); // could be: "easy", "medium", or "hard"
  const [bestScores, setBestScores] = useState({easy: 0, medium: 0, hard: 0});
  const [pokemonList, setPokemonList] = useState([]); 

  useEffect(() => {
    async function getPokemonList() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();
      const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
      return Promise.all(promises); // array of full Pokémon objects
    }

    getPokemonList().then((list) => {console.log(list); setPokemonList(list)});
  }, [])

  const modeSizes = { easy: 8, medium: 12, hard: 16 };
  const filteredPokemonList = pokemonList.slice(0, modeSizes[gameMode]);
  const bestScore = bestScores[gameMode];
  const setBestScore = (score) => {
    setBestScores(prev => ({ ...prev, [gameMode]: score }));
  };

  return (
    <>
      {showMenu ? (
        <Menu 
          gameMode={gameMode}
          setGameMode={setGameMode}
          startGame={() => setShowMenu(false)}
          bestScores={bestScores}
        />
      ) : (
        <Game 
          backToMenu={() => setShowMenu(true)}
          bestScore={bestScore}
          setBestScore={setBestScore}
          pokemonList={filteredPokemonList}
          
        />
      )}
    </>
  )
}

export default App
