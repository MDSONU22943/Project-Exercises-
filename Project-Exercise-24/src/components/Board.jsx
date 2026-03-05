import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { GameContext } from "../GameContext";

const values = ["🍎", "🍌", "🍇", "🍉"];

function shuffleCards() {

  const cards = [...values, ...values].map((value, index) => ({
    id: index,
    value,
    matched: false
  }));

  return cards.sort(() => Math.random() - 0.5);
}

function Board() {

  const { score, setScore } = useContext(GameContext);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  // componentDidMount equivalent
  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  function handleClick(card) {

    if (flipped.length === 2) return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      checkMatch(newFlipped);
    }
  }

  function checkMatch(cardsSelected) {

    const [first, second] = cardsSelected;

    if (first.value === second.value) {

      setScore(score + 1);

      setCards(cards.map(c =>
        c.value === first.value ? { ...c, matched: true } : c
      ));
    }

    setTimeout(() => {
      setFlipped([]);
    }, 800);
  }

  return (
    <div>

      <h2>Score: {score}</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 80px)",
        gap: "10px"
      }}>

        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            flipped={
              flipped.includes(card) || card.matched
            }
          />
        ))}

      </div>

    </div>
  );
}

export default Board;