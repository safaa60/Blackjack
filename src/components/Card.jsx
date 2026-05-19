// Composant qui affiche une carte
function Card({ card, hidden }) {

  // Si la carte doit être cachée
  if (hidden) {
    return <div>?</div>
  }

  // Affichage normal de la carte
  return (
    <div className="card">
      {card.rank} {card.suit}
    </div>
  )
}

export default Card