import "../styles/Menu.css";

function Menu({gameMode, setGameMode, startGame, bestScores}) {
  

  return (
    <div className="menu">
      <h1 className="game-title">Catch Them All!</h1>
      <p className="instructions">Click on each card in a set to complete a round. Each card must only be clicked <span style={{ color: "var(--color-primary)", textDecoration: "underline" }}>once</span>.</p>
      <div className="game-modes">
        <div className="mode-item">
            <button className={gameMode == "easy" ? "selected" : ""} type="button" onClick={()=> setGameMode('easy')}>Easy</button>
            <p>Best Score: {bestScores.easy}</p>
        </div>
        <div className="mode-item">
            <button className={gameMode == "medium" ? "selected" : ""} type="button" onClick={()=> setGameMode('medium')}>Medium</button>
            <p>Best Score: {bestScores.medium}</p>
        </div>
        <div className="mode-item">
            <button className={gameMode == "hard" ? "selected" : ""} type="button" onClick={()=> setGameMode('hard')}>Hard</button>
            <p>Best Score: {bestScores.hard}</p>
        </div>
      </div>
      <button className="start-btn" type="button" onClick={startGame}>Start</button>
    </div>
  )
}

export default Menu
