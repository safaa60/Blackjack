
function Card({ card, hidden }) {// Composant pour afficher une carte
  if (hidden) { // Si la carte est cachée, on affiche un point d'interrogation
    return <div>?</div>
  }

  return (
    <div>
      {card.rank} {card.suit}
    </div>
  )
}

export default Card