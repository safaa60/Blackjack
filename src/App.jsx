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

  // État de la partie : idle | playing | ended
  const [gamePhase, setGamePhase] = useState("idle")

  // Résultat final : win | lose | push | blackjack
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


    // Mise à jour des mains
    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)

    // Réinitialise l'état du jeu
    setGamePhase("playing")
    setResult(null)

    // Calcul des scores de départ
    const playerValue =
      calculateHandValue(newPlayerHand)

    const dealerValue =
      calculateHandValue(newDealerHand)

    // Vérifie les cas de Blackjack naturel
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

  // Action du bouton Hit
  function hit() {
    const newDeck = [...deck]

    const newHand = [
      ...playerHand,
       drawCard(newDeck),
  ]

  setDeck(newDeck)


    // Met à jour la main du joueur
    setPlayerHand(newHand)

    // Calcule le nouveau total
    const total = calculateHandValue(newHand)

    // Si le joueur dépasse 21 → défaite
    if (total > 21) {
      setResult("lose")
      setGamePhase("ended")
    }
  }

  // Action du bouton Stand
  function stand() {
    // Copie de la main du croupier
    let newDealerHand = [...dealerHand]

    // Le croupier tire jusqu'à atteindre au moins 17
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(drawCard(deck))
    }

    // Mise à jour de la main du croupier
    setDealerHand(newDealerHand)

    // Calcul des scores finaux
    const playerTotal = calculateHandValue(playerHand)
    const dealerTotal = calculateHandValue(newDealerHand)

    // Détermine le résultat de la partie
    if (dealerTotal > 21) {
      setResult("win")
    } else if (playerTotal > dealerTotal) {
      setResult("win")
    } else if (playerTotal < dealerTotal) {
      setResult("lose")
    } else {
      setResult("push")
    }

    // Fin de la partie
    setGamePhase("ended")
  }

  return (
    <div className="main-container">
      <h1>Blackjack</h1>

      {/* Boutons de contrôle du jeu */}
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

      {/* Affiche le résultat final */}
      <ResultBanner result={result} />
    </div>
  )
}

export default App