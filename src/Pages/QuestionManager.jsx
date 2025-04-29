import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionManager() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [newGameInput, setNewGameInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("allGames")) || [];
    setGames(stored);
  }, []);

  const saveGames = (updatedGames) => {
    setGames(updatedGames);
    localStorage.setItem("allGames", JSON.stringify(updatedGames));
  };

  const addGame = () => {
    const name = newGameInput.trim();
    if (!name || games.some((g) => g.name === name)) return;

    const newGame = { name, questions: [] };
    const updatedGames = [...games, newGame];
    saveGames(updatedGames);

    // Add to originalGames (used by the wheel)
    const originalGames = JSON.parse(localStorage.getItem("originalGames")) || [];
    const updatedOriginalGames = [...originalGames, { name }];
    localStorage.setItem("originalGames", JSON.stringify(updatedOriginalGames));

    setNewGameInput("");
    setSelectedGame(name);
  };

  const deleteGame = (name) => {
    const updated = games.filter((g) => g.name !== name);
    saveGames(updated);
    if (selectedGame === name) setSelectedGame("");

    // Remove from originalGames too
    const originalGames = JSON.parse(localStorage.getItem("originalGames")) || [];
    const updatedOriginalGames = originalGames.filter((g) => g.name !== name);
    localStorage.setItem("originalGames", JSON.stringify(updatedOriginalGames));
  };

  const addQuestion = () => {
    if (!selectedGame || !questionInput.trim() || !answerInput.trim()) return;
    const updated = games.map((g) =>
      g.name === selectedGame
        ? {
            ...g,
            questions: [...(g.questions || []), {
              question: questionInput.trim(),
              answer: answerInput.trim(),
            }],
          }
        : g
    );
    saveGames(updated);
    setQuestionInput("");
    setAnswerInput("");
  };

  const deleteQuestion = (qIndex) => {
    const updated = games.map((g) =>
      g.name === selectedGame
        ? { ...g, questions: g.questions.filter((_, i) => i !== qIndex) }
        : g
    );
    saveGames(updated);
  };

  const editQuestion = (qIndex, field, value) => {
    const updated = games.map((g) =>
      g.name === selectedGame
        ? {
            ...g,
            questions: g.questions.map((q, i) =>
              i === qIndex ? { ...q, [field]: value } : q
            ),
          }
        : g
    );
    saveGames(updated);
  };

  const selected = games.find((g) => g.name === selectedGame);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Back Button */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/play")}
          style={{
            backgroundColor: "#444",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            fontSize: "1rem",
          }}
        >
          🏠 Back to Game
        </button>
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#0ff" }}>
        🎮 Question Manager
      </h1>

      {/* Add New Game */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          value={newGameInput}
          onChange={(e) => setNewGameInput(e.target.value)}
          placeholder="New Game Name"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "1rem",
            width: "250px",
          }}
        />
        <button
          onClick={addGame}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#0f0",
            color: "#000",
            borderRadius: "4px",
          }}
        >
          ➕ Add Game
        </button>
      </div>

      {/* Game Selector */}
      <div style={{ marginBottom: "2rem" }}>
        <label style={{ marginRight: "1rem" }}>Select Game:</label>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        >
          <option value="">-- Choose Game --</option>
          {games.map((game, i) => (
            <option key={i} value={game.name}>
              {`${i + 1}. ${game.name}`}
            </option>
          ))}
        </select>
        {selectedGame && (
          <button
            onClick={() => deleteGame(selectedGame)}
            style={{
              marginLeft: "1rem",
              backgroundColor: "red",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            🗑️ Delete Game
          </button>
        )}
      </div>

      {/* Add Question */}
      {selectedGame && (
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Enter question"
            style={{
              padding: "0.5rem",
              marginRight: "1rem",
              fontSize: "1rem",
              width: "40%",
            }}
          />
          <input
            type="text"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            placeholder="Enter answer"
            style={{
              padding: "0.5rem",
              marginRight: "1rem",
              fontSize: "1rem",
              width: "40%",
            }}
          />
          <button
            onClick={addQuestion}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "green",
              color: "white",
              borderRadius: "4px",
            }}
          >
            ➕ Add Question
          </button>
        </div>
      )}

      {/* Question List */}
      {selected && selected.questions?.length > 0 && (
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            {selected.questions.length} Questions in "{selected.name}"
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selected.questions.map((q, i) => (
              <li
                key={i}
                style={{
                  backgroundColor: "#111",
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                  #{i + 1}
                </strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => editQuestion(i, "question", e.target.value)}
                    style={{ fontSize: "1rem", padding: "0.5rem" }}
                  />
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => editQuestion(i, "answer", e.target.value)}
                    style={{ fontSize: "1rem", padding: "0.5rem" }}
                  />
                  <button
                    onClick={() => deleteQuestion(i)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      alignSelf: "flex-start",
                    }}
                  >
                    ❌ Delete Question
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}