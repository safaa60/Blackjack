import { useState } from "react"
import { drawCard, calculateHandValue } from "./utils/deck"
import "./App.css"

function App() {
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])

  const [gamePhase, setGamePhase] = useState("idle")
  const [result, setResult] = useState(null)

  function startGame() {
    const newPlayerHand = [drawCard(), drawCard()]
    const newDealerHand = [drawCard(), drawCard()]

    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)

    setGamePhase("playing")
    setResult(null)
  }

  function hit() {
    const newHand = [...playerHand, drawCard()]

    setPlayerHand(newHand)

    const total = calculateHandValue(newHand)

    if (total > 21) {
      setResult("lose")
      setGamePhase("ended")
    }
  }

  return (
    <div>
      <h1>Blackjack</h1>

      <button onClick={startGame}>
        Nouvelle partie
      </button>

      <button onClick={hit}>
        Hit
      </button>

      <h2>Joueur</h2>

      {playerHand.map((card, index) => (
        <div key={index}>
          {card.rank} {card.suit}
        </div>
      ))}

      <p>
        Total : {calculateHandValue(playerHand)}
      </p>

      <h2>Croupier</h2>

      {dealerHand.map((card, index) => (
        <div key={index}>
          {card.rank} {card.suit}
        </div>
      ))}

      <p>{result}</p>
    </div>
  )
}

export default App