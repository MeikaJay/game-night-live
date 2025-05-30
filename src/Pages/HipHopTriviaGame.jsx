import React, { useState } from "react";

const questions = [
  {
    question: "Who said: 'If I ruled the world, imagine that'?",
    choices: ["Jay-Z", "Nas", "DMX", "Rakim"],
    correct: "Nas"
  },
  {
    question: "Which rapper has an alter ego named Slim Shady?",
    choices: ["Logic", "Mac Miller", "Eminem", "G-Eazy"],
    correct: "Eminem"
  },
  {
    question: "Which artist released the song 'Alright' that became a protest anthem?",
    choices: ["Kendrick Lamar", "J. Cole", "Childish Gambino", "Lupe Fiasco"],
    correct: "Kendrick Lamar"
  },
  {
    question: "What hip hop group was known for wearing Adidas tracksuits?",
    choices: ["Run-D.M.C.", "Wu-Tang Clan", "Migos", "De La Soul"],
    correct: "Run-D.M.C."
  },
  {
    question: "Who said: 'Cash rules everything around me'?",
    choices: ["Wu-Tang Clan", "Outkast", "50 Cent", "Busta Rhymes"],
    correct: "Wu-Tang Clan"
  }
];

export default function HipHopTriviaGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    if (selected === questions[current].correct) {
      setScore(score + 1);
    }
    setAnswers([...answers, {
      question: questions[current].question,
      selected,
      correct: questions[current].correct
    }]);
    setSelected(null);
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
      <h2>Hip Hop Trivia</h2>
      <p style={{ fontWeight: "bold" }}>{questions[current].question}</p>
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
