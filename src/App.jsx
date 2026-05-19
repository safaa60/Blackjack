import Hand from "./components/Hand"
import ResultBanner from "./components/ResultBanner"
import GameControls from "./components/GameControls"
import { useState } from "react"
import {
  createDeck,
  drawCard,
  calculateHandValue,
} from "./utils/deck"
import "./App.css"

function App() {
  // Main du joueur
  const [playerHand, setPlayerHand] = useState([])

  // Main du croupier
  const [dealerHand, setDealerHand] = useState([])


  const [gamePhase, setGamePhase] = useState("idle")

  const [result, setResult] = useState(null)
  const [deck, setDeck] = useState([])

  // Lance une nouvelle partie
  function startGame() {
   
    const newDeck = createDeck()

    const newPlayerHand = [
      drawCard(newDeck),
      drawCard(newDeck),
    ]

    const newDealerHand = [
      drawCard(newDeck),
      drawCard(newDeck),
    ]

    setDeck(newDeck)


    
    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)

   
    setGamePhase("playing")
    setResult(null)

    
    const playerValue =
      calculateHandValue(newPlayerHand)

    const dealerValue =
      calculateHandValue(newDealerHand)

    
    if (playerValue === 21 && dealerValue === 21) {
      setResult("push")
      setGamePhase("ended")
    }
    else if (playerValue === 21) {
      setResult("blackjack")
      setGamePhase("ended")
    }
    else if (dealerValue === 21) {
      setResult("lose")
      setGamePhase("ended")
    }
  }

  
  function hit() {
    const newDeck = [...deck]

    const newHand = [
      ...playerHand,
       drawCard(newDeck),
  ]

  setDeck(newDeck)


    setPlayerHand(newHand)

  
    const total = calculateHandValue(newHand)

    
    if (total > 21) {
      setResult("lose")
      setGamePhase("ended")
    }
  }

  
  function stand() {
  
    let newDealerHand = [...dealerHand]

    // Le croupier tire jusqu au moins 17
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(drawCard(deck))
    }

    
    setDealerHand(newDealerHand)

    // scores 
    const playerTotal = calculateHandValue(playerHand)
    const dealerTotal = calculateHandValue(newDealerHand)

    //  résultat de la partie
    if (dealerTotal > 21) {
      setResult("win")
    } else if (playerTotal > dealerTotal) {
      setResult("win")
    } else if (playerTotal < dealerTotal) {
      setResult("lose")
    } else {
      setResult("push")
    }

    
    setGamePhase("ended")
  }

  return (
    <div className="main-container">
      <h1>Blackjack</h1>

      
      <GameControls
        startGame={startGame}
        hit={hit}
        stand={stand}
        gamePhase={gamePhase}
      />

      {/* Affiche la main du joueur */}
      <Hand
        title="Joueur"
        hand={playerHand}
        hideFirstCard={false}
      />

      {/* Affiche la main du croupier */}
      <Hand
        title="Croupier"
        hand={dealerHand}
        hideFirstCard={gamePhase === "playing"}
      />

      {/* Affiche  résultat final */}
      <ResultBanner result={result} />
    </div>
  )
}

export default App