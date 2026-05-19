import Card from "./Card"
import { calculateHandValue } from "../utils/deck"

function Hand({// Composant pour afficher une main de cartes
  title,
  hand,
  hideFirstCard,
}) {
  return (
    <div>
      <h2>{title}</h2>

      {hand.map((card, index) => ( // On affiche chaque carte de la main
        <Card
          key={index}
          card={card}
          hidden={hideFirstCard && index === 0}
        />
      ))}

      {!hideFirstCard && (
        <p>
          Total : {calculateHandValue(hand)} // Affiche la valeur totale de la main
        </p>
      )}
    </div>
  )
}

export default Hand