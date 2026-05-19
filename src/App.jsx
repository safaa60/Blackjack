import Hand from "./components/Hand"
import ResultBanner from "./components/ResultBanner"
import GameControls from "./components/GameControls"
import { useState } from "react"
import { drawCard, calculateHandValue } from "./utils/deck"
import "./App.css"

function App() {
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])

  const [gamePhase, setGamePhase] = useState("idle")
  const [result, setResult] = useState(null)
  // Fonction pour le bouton Nouvelle partie
  function startGame() {
    const newPlayerHand = [drawCard(), drawCard()]
    const newDealerHand = [drawCard(), drawCard()]

    setPlayerHand(newPlayerHand)// Met à jour la main du joueur
    setDealerHand(newDealerHand)// Met à jour la main du croupier

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
  // Fonction pour le bouton Hit
  function hit() {
    const newHand = [...playerHand, drawCard()]

    setPlayerHand(newHand)

    const total = calculateHandValue(newHand)// Calcule la valeur totale de la main du joueur

    if (total > 21) {
      setResult("lose")
      setGamePhase("ended")
    }
  }
  // Fonction pour le bouton Stand
  function stand() {
    let newDealerHand = [...dealerHand]

    while (calculateHandValue(newDealerHand) < 17) { // Le croupier tire  tant que main  inférieure à 17
      newDealerHand.push(drawCard())
    }

    setDealerHand(newDealerHand)

    const playerTotal = calculateHandValue(playerHand)
    const dealerTotal = calculateHandValue(newDealerHand)
   
    //  le résultat de la partie
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
    <div>
      <h1>Blackjack</h1>

     
     
     <GameControls // Affiche les contrôles du jeu
        startGame={startGame}
        hit={hit}
        stand={stand}
        gamePhase={gamePhase}
      />
     
     
     
     
      // Affiche la main du joueur
      <Hand
        title="Joueur"
        hand={playerHand}
        hideFirstCard={false}
      />
      // Affiche la main du croupier, en cachant la première carte si la partie est en cours
      <Hand
        title="Croupier"
        hand={dealerHand}
        hideFirstCard={gamePhase === "playing"}
      />

      <ResultBanner result={result} />
    </div>
  )
}

export default App