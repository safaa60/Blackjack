function GameControls({ 
  startGame,
  hit,
  stand,
  gamePhase,
}) {
  return (
    <div>
      <button onClick={startGame}>
        Nouvelle partie
      </button>

      <button
        onClick={hit}
        disabled={gamePhase === "ended"} // Le bouton Hit est désactivé si la partie est terminée
      >
        Hit
      </button>

      <button
        onClick={stand}
        disabled={gamePhase === "ended"}
      >
        Stand
      </button>
    </div>
  )
}

export default GameControls