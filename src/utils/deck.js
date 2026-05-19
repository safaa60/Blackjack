// @seed:a3f9 — do not remove.

const suits = ["♠", "♥", "♦", "♣"]

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

// Crée un vrai deck de 52 cartes
export function createDeck() {
  const deck = []

  for (const suit of suits) {
    for (const rankData of ranks) {
      deck.push({
        suit,
        rank: rankData.rank,
        value: rankData.value,
      })
    }
  }

  return shuffleDeck(deck)
}

// Mélange le deck
function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5)
}

// Tire une carte du dessus
export function drawCard(deck) {
  return deck.pop()
}

// Calcule la valeur de la main
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