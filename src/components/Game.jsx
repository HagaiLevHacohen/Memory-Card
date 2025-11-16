import { useState, useEffect } from "react";
import "../styles/Game.css";
import Card from "./Card";
import Modal from "./Modal";

function Game({backToMenu, bestScore, setBestScore, pokemonList}) {
  const [cards, setCards] = useState([]); // Initialized to an empty array in case fetch hasn't completed yet
  const [alreadySelectedIDs, setAlreadySelectedIDs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [animation, setAnimation] = useState("");
  const [verdictText, setVerdictText] = useState("");
  const winningScore = cards.length;
  const currentScore = alreadySelectedIDs.length;

  useEffect(() => {
    setCards(pokemonList);
  }, [pokemonList]);

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  function handleCardClick(id) {
    shuffle(cards);
    setCards([...cards]);
    const isCorrect = !alreadySelectedIDs.includes(id);

    // 1. Set the text FIRST
    setVerdictText(isCorrect ? "Correct!" : "Incorrect!");

    // 2. Clear animation so React KNOWS it's gone
    setAnimation("");

    // 3. Wait for next render (guarantees reflow)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 4. Now apply correct/incorrect class
        setAnimation(isCorrect ? "correct" : "incorrect");
      });
    });


    if(isCorrect){
      setAlreadySelectedIDs([...alreadySelectedIDs, id]);
      if(currentScore + 1 == winningScore) {
        setShowDialog(true);
        setBestScore(winningScore);
      }
    }
    else {
      setAlreadySelectedIDs([]);
      if(bestScore < currentScore) {
        setBestScore(currentScore);
      }
    }

  }

  return (
    <div className="game">
      <section className="header">
        <button className="back" onClick={backToMenu}>Back</button>
        <div className="scores">
          <div className="current-score">Current Score: {currentScore}</div>
          <div className="best-score">Best Score: {bestScore}</div>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{width:`calc(100% * (${currentScore} / ${winningScore}))`}}></div>
        </div>
      </section>
      <section className="game-content">
        <p className={animation}>{verdictText}</p>
        <div className="cards">
          {cards.map(card => <Card key={card.id} id={card.id} name={card.name} img={card.sprites.front_default} clickHandler={handleCardClick}></Card>)}
        </div>
      </section>
      {showDialog && <Modal onClose={backToMenu}></Modal>}
    </div>
  )
}

export default Game