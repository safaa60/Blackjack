import Card from "./Card"
import { calculateHandValue } from "../utils/deck"
function Hand({
  title,
  hand,
  hideFirstCard,
}) {
  return (
    <div>
      <h2>{title}</h2>

      {/* Affichage des cartes */}
      {hand.map((card, index) => (
        <Card
          key={index}
          card={card}
          hidden={hideFirstCard && index === 0}
        />
      ))}

      {!hideFirstCard && hand.length > 0 && (
        <p>
          Total : {calculateHandValue(hand)}
        </p>
      )}
    
    
    
    </div>
  )
}
export default Hand