// Composant qui affiche une carte
function Card({ card, hidden }) {

  //  carte cachée
  if (hidden) {
    return <div>?</div>
  }

  
  return (
    <div className="card">
      {card.rank} {card.suit}
    </div>
  )
}

export default Card