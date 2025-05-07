import { useState, useEffect } from "react";

const verses = [
  {
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal ___",
    answer: "life",
    options: ["peace", "joy", "hope", "life"],
    reference: "John 3:16"
  },
  {
    verse: "The Lord is my shepherd, I shall not be in ___",
    answer: "want",
    options: ["fear", "trouble", "need", "want"],
    reference: "Psalm 23:1"
  },
  {
    verse: "I can do all this through him who gives me ___",
    answer: "strength",
    options: ["hope", "strength", "love", "faith"],
    reference: "Philippians 4:13"
  },
  {
    verse: "In the beginning God created the heavens and the ___",
    answer: "earth",
    options: ["sky", "earth", "light", "sea"],
    reference: "Genesis 1:1"
  }
];

export default function GuessBibleVerse() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setSelected(null);
    setFeedback("");
  }, [current]);

  const handleGuess = (option) => {
    setSelected(option);
    const isCorrect = option === verses[current].answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! Correct answer: ${verses[current].answer}`);
    }
  };

  const nextQuestion = () => {
    if (current < verses.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`Game over! Your score: ${score}/${verses.length}`);
      setCurrent(0);
      setScore(0);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>Guess the missing word</h2>
      <p>{verses[current].verse}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: 10 }}>
        {verses[current].options.map((option, idx) => (
          <button key={idx} onClick={() => handleGuess(option)} disabled={selected !== null}>
            {option}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
      {selected && <button onClick={nextQuestion}>Next</button>}
      <p>Score: {score}</p>
    </div>
  );
}
