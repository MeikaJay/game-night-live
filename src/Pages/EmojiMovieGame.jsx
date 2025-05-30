import React, { useState } from "react";

const questions = [
  {
    emojis: "👶🏾🎓💼💰",
    choices: ["Blank Check", "Little Man", "Boss Baby", "Baby Geniuses"],
    correct: "Boss Baby",
    hint: "He may be little, but he means business."
  },
  {
    emojis: "🧟‍♂️🍫🏭",
    choices: ["The Nutty Professor", "Forrest Gump", "Willy Wonka & the Chocolate Factory", "Good Burger"],
    correct: "Willy Wonka & the Chocolate Factory",
    hint: "A golden ticket could change everything."
  },
  {
    emojis: "🎤🐶🚌🎧",
    choices: ["Sing", "Zootopia", "Space Jam", "Trolls"],
    correct: "Sing",
    hint: "Animals chase their dreams under the spotlight."
  },
  {
    emojis: "✈️🌴📱😱",
    choices: ["Girls Trip", "Vacation Friends", "Hangover 2", "Think Like a Man Too"],
    correct: "Vacation Friends",
    hint: "This trip turned up more than expected."
  },
  {
    emojis: "🍔👨‍🍳🍟🤣",
    choices: ["Good Burger", "Friday", "Fat Albert", "All About the Benjamins"],
    correct: "Good Burger",
    hint: "Fast food, funny vibes, and unforgettable service."
  }
];

export default function EmojiMovieGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    if (selected === questions[current].correct) {
      setScore(score + 1);
    }
    setAnswers([...answers, {
      question: questions[current].emojis,
      selected,
      correct: questions[current].correct
    }]);
    setSelected(null);
    setShowHint(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowHint(false);
    setShowResults(false);
    setAnswers([]);
  };

  if (showResults) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🌟 You scored {score} out of {questions.length}!</h2>
        <ul>
          {answers.map((ans, i) => (
            <li key={i}>
              <strong>{ans.question}</strong>: You chose <em>{ans.selected}</em>, Correct answer: <strong>{ans.correct}</strong>
            </li>
          ))}
        </ul>
        <button onClick={handleRestart}>Play Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Emoji Movie Guessing Game</h2>
      <div style={{ fontSize: "2rem", marginBottom: 10 }}>{questions[current].emojis}</div>
      {questions[current].choices.map((choice, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name="choice"
              value={choice}
              checked={selected === choice}
              onChange={() => setSelected(choice)}
            /> {choice}
          </label>
        </div>
      ))}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setShowHint(!showHint)}>Show Hint</button>
        {showHint && <p style={{ marginTop: 5 }}><em>{questions[current].hint}</em></p>}
      </div>
      <button
        style={{ marginTop: 15 }}
        onClick={handleNext}
        disabled={!selected}
      >
        {current + 1 < questions.length ? "Next" : "See Results"}
      </button>
    </div>
  );
}
