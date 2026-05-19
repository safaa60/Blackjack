function ResultBanner({ result }) {
  return (
    <div  className="result">
      {result === "win" && <p>Victoire</p>}

      {result === "lose" && <p>Défaite</p>}

      {result === "push" && <p> Égalité</p>}

      {result === "blackjack" && (
        <p> Blackjack !</p>
      )}
    </div>
  )
}

export default ResultBanner