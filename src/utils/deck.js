const suits = ["♠", "♥", "♦", "♣"]


//initialisation des valeurs des cartes
const ranks = [
  { rank: "A", value: 11 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "J", value: 10 },
  { rank: "Q", value: 10 },
  { rank: "K", value: 10 },
]

//fonction pour tirer une carte aléatoire
export function drawCard() {
  const randomSuit =
    suits[Math.floor(Math.random() * suits.length)]

  const randomRank =
    ranks[Math.floor(Math.random() * ranks.length)]

  return {
    suit: randomSuit,
    rank: randomRank.rank,
    value: randomRank.value,
  }
}


//fonction pour calculer la valeur d'une main
export function calculateHandValue(hand) {
  let total = 0
  let aces = 0

  for (const card of hand) {
    total += card.value

    if (card.rank === "A") {
      aces++
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }

  return total
}